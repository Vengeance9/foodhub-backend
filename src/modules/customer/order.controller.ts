import { Request, Response } from "express"
import { orderServices } from "./order.services"

type cartItem = {
    providerMealId: string,
    quantity: number,
    price: number
}

type orderItems={
    customerid:string,
    providerId:string,
    deliveryAddress:string,
    cartItems:cartItem[]
}

const createOrders =async (req:Request,res:Response)=>{
    try{
        
        const result = await orderServices.createOrders(req.body)

    }catch(error){
        res.status(500).json({message:'Internal server error'})
    }
    
}


export const orderController = {}