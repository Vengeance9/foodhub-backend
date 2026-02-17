"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerServices = void 0;
const enums_1 = require("./../../../generated/prisma/enums");
//import { OrderStatus } from "@prisma/enums";
const prisma_1 = require("../../lib/prisma");
const auth_1 = require("../../middleware/auth");
const register = async (userId, providerData) => {
    const existingProvider = await prisma_1.prisma.provider.findFirst({
        where: { userId },
    });
    if (!existingProvider) {
        const user = await prisma_1.prisma.user.update({
            where: { id: userId },
            data: {
                role: auth_1.UserRole.PROVIDER,
            },
        });
    }
    const provider = await prisma_1.prisma.provider.create({
        data: {
            restaurantName: providerData.restaurantName,
            description: providerData.description,
            isOpen: providerData.isOpen,
            address: providerData.address,
            phone: providerData.phone,
            website: providerData.website,
            cuisineType: providerData.cuisineType,
            image: providerData.image,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
    return provider;
};
const getMyProviders = async (userId, search) => {
    const totalRevenue = await prisma_1.prisma.order.aggregate({
        where: {
            provider: {
                userId,
                restaurantName: search
                    ? {
                        contains: search,
                        mode: "insensitive",
                    }
                    : undefined,
            },
            status: enums_1.OrderStatus.DELIVERED,
        },
        _sum: {
            totalAmount: true,
        },
    });
    const providers = await prisma_1.prisma.provider.findMany({
        where: {
            userId,
            restaurantName: search
                ? {
                    contains: search,
                    mode: "insensitive",
                }
                : undefined,
        },
        select: {
            id: true,
            restaurantName: true,
            address: true,
            isOpen: true,
            image: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const result = {
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        providers,
    };
    return result;
};
const createMeal = async (mealData, imageUrl, providerId, isAvailable) => {
    const category = mealData.category.toLowerCase();
    // const provider  = await  prisma.provider.findFirst({
    //   where:{userId:providerId},
    //   select:{id:true}
    // })
    // if (!provider) {
    //   throw new Error("You are not registered as a provider");
    // }
    return prisma_1.prisma.$transaction(async (tx) => {
        const meal = await tx.meal.create({
            data: {
                name: mealData.name,
                description: mealData.description,
                category: {
                    connectOrCreate: {
                        where: { name: category },
                        create: { name: category },
                    },
                },
            },
            include: {
                provider: true,
                category: true,
            },
        });
        const providerMeal = await tx.providerMeal.create({
            data: {
                mealId: meal.id,
                providerId: providerId,
                isAvailable: isAvailable,
                price: Number(mealData.price),
                image: imageUrl,
            },
        });
        return { meal, providerMeal };
    });
};
const updateMeal = async (mealData, mealId) => {
    const existingRecord = await prisma_1.prisma.providerMeal.findUnique({
        where: {
            id: mealId,
        },
    });
    if (!existingRecord) {
        throw new Error(`This Meal is not found for this provider`);
    }
    const result = await prisma_1.prisma.providerMeal.update({
        where: { id: mealId },
        data: {
            ...(mealData.isAvailable !== undefined && {
                isAvailable: mealData.isAvailable,
            }),
            ...(mealData.price !== undefined && {
                price: mealData.price,
            }),
            ...(mealData.image !== undefined && {
                image: mealData.image,
            }),
            meal: {
                update: {
                    ...(mealData.name && { name: mealData.name }),
                    ...(mealData.description && { description: mealData.description }),
                    ...(mealData.category && {
                        category: {
                            connectOrCreate: {
                                where: { name: mealData.category.toLowerCase() },
                                create: { name: mealData.category.toLowerCase() },
                            },
                        },
                    }),
                },
            },
        },
    });
    return result;
};
const deleteMeal = async (mealId, providerId) => {
    const providerMeal = await prisma_1.prisma.providerMeal.findFirst({
        where: { id: mealId },
    });
    if (!providerMeal) {
        throw new Error("Meal not found");
    }
    const provider = await prisma_1.prisma.provider.findFirst({
        where: {
            id: providerMeal?.providerId,
            userId: providerId,
        },
    });
    if (!provider) {
        throw new Error("You are not authorized to delete this meal");
    }
    console.log(provider?.id);
    console.log(mealId);
    return prisma_1.prisma.$transaction(async (tx) => {
        const meal = await tx.providerMeal.findUnique({
            where: {
                id: mealId,
            },
        });
        if (!meal) {
            throw new Error("Meal not found or you are not the provider");
        }
        await tx.providerMeal.delete({
            where: {
                id: mealId,
            },
        });
    });
};
const getAllProviders = async () => {
    return await prisma_1.prisma.provider.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
            meals: {
                where: {
                    isAvailable: true,
                },
                include: {
                    meal: true,
                },
            },
        },
    });
};
const getProviderMeals = async (providerId) => {
    return await prisma_1.prisma.provider.findUnique({
        where: {
            id: providerId,
        },
        select: {
            meals: {
                select: {
                    id: true,
                    image: true,
                    meal: {
                        select: {
                            name: true,
                            description: true,
                            category: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    price: true,
                    isAvailable: true,
                },
            },
        },
    });
};
const updateOrderStatus = async (orderId, status, userId) => {
    const order = await prisma_1.prisma.order.findUnique({
        where: { id: orderId },
        include: {
            provider: true,
        },
    });
    if (!order) {
        throw new Error("Order not found");
    }
    if (order.provider.userId !== userId) {
        throw new Error("You are not the provider for this order");
    }
    const updatedOrder = await prisma_1.prisma.order.update({
        where: { id: orderId },
        data: {
            status: status,
        },
    });
    return updatedOrder;
};
const getProviderOrders = async (providerId) => {
    const orders = await prisma_1.prisma.order.findMany({
        where: {
            providerId,
        },
        select: {
            id: true,
            status: true,
            totalAmount: true,
            deliveryAddress: true,
            contact: true,
            items: {
                select: {
                    Providermeal: {
                        select: {
                            meal: {
                                select: {
                                    name: true,
                                    description: true,
                                },
                            },
                        },
                    },
                },
            },
            customer: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    });
    return orders;
};
const updateProvider = async (providerId, providerData) => {
    const updatedProvider = await prisma_1.prisma.provider.update({
        where: { id: providerId },
        data: providerData,
    });
    return updatedProvider;
};
exports.providerServices = {
    updateProvider,
    getProviderOrders,
    getMyProviders,
    updateOrderStatus,
    getProviderMeals,
    createMeal,
    updateMeal,
    register,
    deleteMeal,
    getAllProviders,
};
