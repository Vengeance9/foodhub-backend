
import { Request, Response } from "express";
import { providerServices } from "./provider.services";

const createMeal = async (req: Request, res: Response) => {
   
    try{
        const providerId = req.user?.id;
        const isAvailable = req.body.isAvailable? req.body.isAvailable === 'true'? true: false : true;
        const result = await providerServices.createMeal(
            req.body,
            providerId as string,
            isAvailable
        );
       

    }catch(e){
        res.status(500).json({message: "Internal server error"})
    }
} 


const updateMeal = async (req: Request, res: Response) => {
    try{
        const providerId = req.user?.id;
        const mealId = req.params.id;
        const isAvailable = req.body.isAvailable? req.body.isAvailable === 'true'? true: false : true;
        const result = await providerServices.updateMeal(
          req.body,
          mealId as string,
          providerId as string,
          isAvailable
        );
       

    }catch(e){
        res.status(500).json({message: "Internal server error"})
    }
}

export const providerController = {createMeal,updateMeal}