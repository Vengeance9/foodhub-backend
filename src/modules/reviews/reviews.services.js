import { prisma } from "../../lib/prisma";
const reviewProvider = async (userId, providerId, rating, comment) => {
    const isOrdered = await prisma.order.findFirst({
        where: {
            customerId: userId,
            providerId
        }
    });
    if (!isOrdered)
        throw new Error("You can only review providers you have ordered from.");
    const existingReview = await prisma.review.findFirst({
        where: {
            userId,
            providerId
        },
        select: {
            id: true
        }
    });
    const result = await prisma.review.upsert({
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
    const reviews = await prisma.review.findFirst({
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
    const reviews = await prisma.review.findMany({
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
export const reviewServices = { reviewProvider, getMyReviews,
    getAllReviews
};
