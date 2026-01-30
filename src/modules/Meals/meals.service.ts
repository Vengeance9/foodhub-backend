import { prisma } from "../../lib/prisma"


const getAllMeals = async()=>{
    const result = await prisma.meal.findMany(

    )
}


export const mealService = {getAllMeals}