import { prisma } from "../../lib/prisma"
import { UserRole } from "../../middleware.ts/auth";

const register = async (
  userId: string,
  providerData: {
    restaurantName: string;
    description: string;
    isOpen: boolean;
    address: string;
    phone:string;
    website: string;
    cuisineType:string[]
  }
) => {

  const user = await prisma.user.update({
    where:{id:userId},
    data:{
      role: UserRole.PROVIDER
    }
  })
  const provider = await prisma.provider.create({
    data: {
      restaurantName: providerData.restaurantName,
      description: providerData.description,
      isOpen: providerData.isOpen,
      address: providerData.address,
      phone: providerData.phone,
      website: providerData.website,
      cuisineType: providerData.cuisineType,
      user:{
        connect:{
          id: userId,
      }
      }},
    })
  return provider;
};

const createMeal = async(mealData: { name: string; description: string; price: number,category:string },
  providerId: string,
  isAvailable:boolean) => {
  const category = mealData.category.toLowerCase();

  const provider  = await  prisma.provider.findUnique({
    where:{userId:providerId},
    select:{id:true}
  })
    
  return prisma.$transaction(async (tx) =>
    {
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
          providerId: provider!.id,
          isAvailable: isAvailable,
          price: mealData.price,
        },
      });
      return {meal, providerMeal};
    })
}

const updateMeal = async (
  mealData: { name?: string; description?: string; price?: number },
  mealId: string,
  providerId: string,
  isAvailable: boolean
) => {
  const provider = await prisma.provider.findUnique({
    where: { userId: providerId },
    select: { id: true },
  })

  const existingRecord = await prisma.providerMeal.findUnique({
    where: {
      providerId_mealId: {
        providerId: provider!.id,
        mealId,
      },
    },
  });

  if (!existingRecord) {
    throw new Error(
      `No providerMeal found for providerId: ${provider!.id} and mealId: ${mealId}`
    );
  }
  const result = await prisma.providerMeal.update({
    where: {
      providerId_mealId: {
        providerId: provider!.id,
        mealId: mealId,
      },
    },
    data: {
      isAvailable: isAvailable,
      price: mealData.price,
      meal: {
        update: {
          name: mealData.name,
          description: mealData.description,
        },
      },
    },
    include: {
      meal: true, 
    },
  });

  return result;
};

const deleteMeal = async (mealId: string, providerId: string) => {
  const provider = await prisma.provider.findUnique({
    where: { userId: providerId },
    select: { id: true },
  });
 return prisma.$transaction(async (tx)=>{
    const meal = await tx.providerMeal.findUnique({
      where: {
        providerId_mealId: {
          providerId: provider!.id,
          mealId: mealId,
        },
      },
    });
    if(!meal){
      throw new Error("Meal not found or you are not the provider")
    }
    await tx.providerMeal.delete({
      where: {
        providerId_mealId: {
          providerId: provider!.id,
          mealId: mealId,
        },
      },
    });
 })
}

const getAllProviders = async()=>{
  return await prisma.provider.findMany({
    include:{
      user:{
        select:{
          name:true,
          email:true
        }
      },
      meals:{
        where:{
          isAvailable:true
        },
        include:{
          meal:true
        }
      }
    }
  })
}

const getProviderMeals = async(providerId:string)=>{
  return await prisma.provider.findUnique({
    where:{
      id:providerId
    },
    select:{
      meals:{
        select:{
          meal:{
            select:{
              name:true,
              description:true,
              category:{
                select:{
                  name:true
              }
            }
          }
        },
          price:true,
          isAvailable:true
        }
      },
    }
  })
  
}



export const providerServices = {getProviderMeals,createMeal,updateMeal,register,deleteMeal,getAllProviders}

