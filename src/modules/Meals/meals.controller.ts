import { Request, Response } from "express";
import { mealService } from "./meals.service";

const getAllMeals = async(req:Request,res:Response)=>{
    const result = await mealService.getAllMeals()
}

export const mealsController = {getAllMeals}