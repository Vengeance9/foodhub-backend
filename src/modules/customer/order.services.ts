import { prisma } from "../../lib/prisma"


const createOrders = async(orderData:any)=>{
    const result = await prisma.order.create({
        data:orderData

    })
}

export const orderServices = {createOrders}