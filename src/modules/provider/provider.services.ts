import { prisma } from "../../lib/prisma"

const createMeal = async(mealData: any, providerId: string,isAvailable:boolean) => {
    const meal = await prisma.meal.create({
        data:{
            ...mealData,
            providerId: providerId,
            include:{
                provider:{
                    isAvailable: isAvailable
                }
            }
        }
    })
}

const updateMeal = async (
  mealData: { name?: string; description?: string; price?: number },
  mealId: string,
  providerId: string,
  isAvailable: boolean
) => {
  const result = await prisma.providerMeal.update({
    where: {
      providerId_mealId: {
        providerId: providerId,
        mealId: mealId,
      },
    },
    data: {
      isAvailable: isAvailable,
      price: mealData.price,
      meal: {
        update: {
         ...mealData
        },
      },
    },
    include: {
      meal: true, 
    },
  });

  return result;
};

export const providerServices = {createMeal,updateMeal}