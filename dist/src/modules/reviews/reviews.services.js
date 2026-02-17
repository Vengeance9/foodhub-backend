"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewServices = void 0;
const prisma_1 = require("../../lib/prisma");
const reviewProvider = async (userId, providerId, rating, comment) => {
    const isOrdered = await prisma_1.prisma.order.findFirst({
        where: {
            customerId: userId,
            providerId
        }
    });
    if (!isOrdered)
        throw new Error("You can only review providers you have ordered from.");
    const existingReview = await prisma_1.prisma.review.findFirst({
        where: {
            userId,
            providerId
        },
        select: {
            id: true
        }
    });
    const result = await prisma_1.prisma.review.upsert({
        where: {
            userId_providerId: {
                userId,
                providerId
            }
        },
        update: {
            rating,
            comment
        },
        create: {
            userId,
            providerId,
            rating,
            comment
        }
    });
    if (existingReview)
        return { message: "Review updated successfully", review: result };
    return { message: "Review submitted successfully", review: result };
};
const getMyReviews = async (userId, providerId) => {
    const reviews = await prisma_1.prisma.review.findFirst({
        where: {
            userId,
            providerId
        },
        select: {
            id: true,
            rating: true,
            comment: true,
            provider: {
                select: {
                    restaurantName: true
                }
            }
        }
    });
    return reviews;
};
const getAllReviews = async (providerId) => {
    const reviews = await prisma_1.prisma.review.findMany({
        where: {
            providerId
        },
        select: {
            id: true,
            rating: true,
            comment: true,
            user: {
                select: {
                    name: true
                }
            }
        }
    });
    return reviews;
};
exports.reviewServices = { reviewProvider, getMyReviews,
    getAllReviews
};
