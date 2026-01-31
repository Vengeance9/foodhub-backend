import { getOrder } from "../../../node_modules/effect/src/Array";
import { prisma } from "../../lib/prisma";
import { create } from "domain";

const createOrders = async (
  orderData: any,
  userId: string,
  providerId: string
) => {
  const totalAmount: Number = orderData.cartItems.reduce(
    (acc: any, item: any) => acc + item.price * item.quantity,
    0
  );
  const result = await prisma.order.create({
    data: {
      ...orderData,
      customerId: userId,
      providerId: providerId,
      totalAmount: totalAmount,
      items: {
        create: orderData.cartItems.map((item: any) => ({
          ProvidermealId: item.providerMealId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });
  return result;
};

const getOrders = async (userId: string) => {
  const result = await prisma.order.findMany({
    where: {
      customerId: userId,
    },
    include: {
      items: {
        include: {
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
      provider: {
        select: {
          restaurantName: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const aggregate = await prisma.order.aggregate({
    where: {
      customerId: userId,
    },
    _sum: {
      totalAmount: true,
    },
  });

  return {
    result,
    totalAmount: aggregate._sum.totalAmount,
  };
};

const getOrderDetails = async (orderId: string, userId: string) => {
  const result = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId: userId,
    },

    select: {
      status: true,
      totalAmount: true,
      deliveryAddress: true,
      createdAt: true,
      paymentMethod: true,
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
      provider: {
        select: {
          restaurantName: true,
        },
      },
    },
  });

  return result;
};

export const orderServices = { createOrders, getOrders, getOrderDetails };
