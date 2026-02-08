import { prisma } from "../../lib/prisma"

const review = async(userId:string, providerMealId:string, rating:number, comment: string)=>{
    const existingReview = await prisma.review.findFirst({
        where:{
            userId,
            providerMealId
        }
    })
    if(existingReview){
        throw new Error("You have already reviewed this meal.")
    }
    const result = await prisma.review.create({
        data:{
            userId,
            providerMealId,
            rating,
            comment
        }
    })
    return result
}

const updateReview = async(userId:string, providerMealId:string, rating:number, comment: string)=>{
    const existingReview = await prisma.review.findFirst({
        where:{
            userId,
            providerMealId
        }
    })
    if(!existingReview){
        throw new Error("You have not reviewed this meal yet.")
    }
    const result = await prisma.review.update({
        where:{
            id: existingReview.id
        },
        data:{
            rating,
            comment
        }
    })
    return result
}

const deleteReview = async(userId:string, providerMealId:string)=>{
    const existingReview = await prisma.review.findFirst({
        where:{
            userId,
            providerMealId
        }
    })
    if(!existingReview){
        throw new Error("You have not reviewed this meal yet.")
    }
    const result = await prisma.review.delete({
        where:{
            id: existingReview.id
        }
    })
    return result
}

const getMyReview = async(userId:string, providerMealId:string)=>{
    const existingReview = await prisma.review.findFirst({
        where:{
            userId,
            providerMealId
        },
        select:{
            rating: true,
            comment: true,
            createdAt: true,
            updatedAt: true
        }
    })
    if(!existingReview){
        throw new Error("You have not reviewed this meal yet.")
    }
    return existingReview
}
export const reviewServices = {review, updateReview,deleteReview, getMyReview}