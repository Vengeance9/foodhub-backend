
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middleware.ts/auth";

const getAllUsers = async()=>{
    const users = await prisma.user.findMany({
        select:{
            id:true,
            name:true,
            email:true,
            role:true
        }
})
return users
}

const updateUserRole = async(userId:string, role:UserRole) => {
    
    const updatedUser = await prisma.user.update({
        where:{id:userId},
        data:{
            role: role
        }
    })
    return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
    }
}

export const adminServices = {getAllUsers, updateUserRole}