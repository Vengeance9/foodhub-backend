import { Request, Response } from "express";
import { mealService } from "./meals.service";
import { pagination } from "../../helpers/pagination";

const getAllMeals = async(req:Request,res:Response)=>{
    const search = req.query
    const searchString = typeof search ==='string'?search:undefined
    const name = req.query.name as string
    const description = req.query.description as string
    const isAvailable = req.query.isAvailable?(req.query.isAvailable==='true'?true:false):undefined
    const category = req.query.category as string
    const reviews = req.query.reviews as string
    const ratings = Number(req.query.ratings)
    const {page,skip,limit,sortBy,sortOrder} = pagination(req.query)


    const result = await mealService.getAllMeals({search:searchString,name,description,isAvailable,category,reviews,ratings,page,skip,limit,sortBy,sortOrder})
    
}

export const mealsController = {getAllMeals}