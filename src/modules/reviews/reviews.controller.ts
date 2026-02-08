import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { reviewServices } from "./reviews.services";
import { get } from "http";

const review = async (req: Request, res: Response) => {
    try{
    const userId = req.user?.id
    const providerMealId = req.params.providerMealId
    const {rating, comment } = req.body;

    console.log("userId:", userId);
    console.log("providerMealId:", providerMealId);
    const result = await reviewServices.review(userId!, providerMealId as string, rating, comment)
    return res.status(201).json(result)

    }catch(e:any){
        return res.status(500).json({message: e.message})
    }
    
}

const updateReview = async (req: Request, res: Response) => {
    try{
    const userId = req.user?.id
    const providerMealId = req.params.providerMealId
    const {rating, comment } = req.body;

    const result = await reviewServices.updateReview(userId!, providerMealId as string, rating, comment)
    return res.status(200).json(result)

    }catch(e:any){
        return res.status(500).json({message: e.message})
    }
}

const deleteReview = async (req: Request, res: Response) => {
    try{
    const userId = req.user?.id
    const providerMealId = req.params.providerMealId

    const result = await reviewServices.deleteReview(userId!, providerMealId as string)
    return res.status(200).json(result)

    }catch(e:any){
        return res.status(500).json({message: e.message})
    }
}


const getMyReview = async (req: Request, res: Response) => {
    try{
    const userId = req.user?.id
    const providerMealId = req.params.providerMealId
    const result = await reviewServices.getMyReview(userId!, providerMealId as string)
    return res.status(200).json(result)

    

    }catch(e:any){
        return res.status(500).json({message: e.message})
    }
}
export const reviewController = { review, updateReview, deleteReview ,getMyReview}