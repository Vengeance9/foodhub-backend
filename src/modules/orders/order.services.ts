
import { prisma } from "../../lib/prisma";


const addToCart = async(
  quantity: number,
  userId: string,
  providerMealId: string
)=>{
  const providerMeal = await prisma.providerMeal.findUnique({
    where:{
      id: providerMealId
    }
  })
  if(!providerMeal  || !providerMeal.isAvailable){
    throw new Error("Meal not found")
  }

  const existingCart= await prisma.cart.findUnique({
    where:{
      userId
    }
  })

  if (existingCart && existingCart.providerId !== providerMeal.providerId) {
    throw new Error(
      "You can only add items from one restaurant at a time. Clear your cart first?"
    );
  }

  const cart = await prisma.cart.upsert({
    where:{userId},
    update:{},
    create:{
      userId,
      providerId: providerMeal.providerId,
    }
  })

  return await prisma.cartItem.upsert({
    where:{
      cartId_providerMealId:{
        cartId: cart.id,
        providerMealId: providerMealId
      }
    },
    update:{
      quantity:{increment: quantity}
    },
    create:{
      cartId: cart.id,
      providerMealId: providerMealId,
      quantity: quantity,
      
    }
  })
}

const getCart = async(userId:string)=>{
  const cart = await prisma.cart.findUnique({
    where:{
      userId
    },
    include:{
      items:{
        include:{
          providerMeal:{
            include:{
              meal:{
                select:{
                  name: true,
                  description: true,
                }
              }
            }
          }
        }
      }
    }
  })
  return cart
}


const checkOutOrder = async (
  orderData: {
    deliveryAddress: string;
    paymentMethod: string;
    contact: string;
  },
  userId: string,
  providerId: string
) => {
  const cart = await prisma.cart.findUnique({
    where:{
      userId
    },
    include:{
      items:{
        include:{
          providerMeal:true
        }
      }
    }
  })

  if(!cart || cart.items.length ===0){
    throw new Error("Cart is empty")
  }
  let totalAmount = 0;

  const orderItems = cart.items.map((item)=>{
    totalAmount += item.quantity * item.providerMeal.price

    return{
      Providermeal: {
        connect: { id: item.providerMealId }
      },
      quantity: item.quantity,
      price: item.providerMeal.price,
    }
  })

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data:{
        customerId:userId,
        providerId:cart.providerId,
        totalAmount,
        deliveryAddress: orderData.deliveryAddress,
        paymentMethod: orderData.paymentMethod,
        contact: orderData.contact,
        items:{
          create: orderItems
        }
      }
    })
    await tx.cartItem.deleteMany({
      where:{
        cartId: cart.id
      }
    })
    return newOrder
  })
  return order
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

export const orderServices = { checkOutOrder, getOrders, getOrderDetails, addToCart,getCart };
