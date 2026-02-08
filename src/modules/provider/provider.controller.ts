
import { Request, Response } from "express";
import { providerServices } from "./provider.services";
import { prisma } from "../../lib/prisma";


const register = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if(!userId){
        return res.status(400).json({message:'User id is required'})
    }
    try{
        const result = await providerServices.register(userId,req.body);
        return res.status(201).json({data:result,message:'Provider registered successfully'})

    }catch(e){
        res.status(500).json({message: "Internal server error"})
    }
}

const createMeal = async (req: Request, res: Response) => {
   
    try{
        const providerId = req.user?.id;
        const provider = await prisma.provider.findUnique({
          where: { userId:providerId }, 
        });

        if (!provider) {
          throw new Error("You are not registered as a provider");
        }
        console.log(providerId)
        const isAvailable = req.body.isAvailable? req.body.isAvailable === 'true'? true: false : true;
        const result = await providerServices.createMeal(
            req.body,
            providerId as string,
            isAvailable
        );
        return res.status(201).json({data:result,message:'Meal created successfully'})
    }catch(e:any){
        console.log(e)
        res.status(500).json({message:e.message})
    }
} 


const updateMeal = async (req: Request, res: Response) => {
    try{
        const providerId = req.user?.id;
        const mealId = req.params.id;
        console.log(providerId,mealId)
        const isAvailable = req.body.isAvailable? req.body.isAvailable === 'true'? true: false : true;
        const result = await providerServices.updateMeal(
          req.body,
          mealId as string,
          providerId as string,
          isAvailable
        );
        return res.status(200).json({data:result,message:'Meal updated successfully'})
       

    }catch(e:any){
        res.status(500).json({message: e.message})
    }
}

const deleteMeal = async (req: Request, res: Response) => {
    const providerId = req.user?.id;
    const mealId = req.params.id;

    console.log(providerId,mealId)
    try{
        await providerServices.deleteMeal(mealId as string,providerId as string)
        return res.status(200).json({message:'Meal deleted successfully'})
    }catch(e:any){
        res.status(500).json({message: e.message})
    }
}

const getAllProviders = async (req: Request, res: Response) => {
    try{
        const result = await providerServices.getAllProviders();
        return res.status(200).json({data:result,message:'Providers fetched successfully'})
    }catch(e){
        res.status(500).json({message: "Internal server error"})
    }
}

const getProviderMeals = async (req: Request, res: Response) => {
    const providerId = req.params.id;
    try{
        const result = await providerServices.getProviderMeals(providerId as string);
        return res.status(200).json({data:result,message:'Meals fetched successfully'})
    }catch(e:any){
        res.status(500).json({message:e.message})
    }
}

export const providerController = {getProviderMeals,createMeal,updateMeal,register,deleteMeal,getAllProviders}