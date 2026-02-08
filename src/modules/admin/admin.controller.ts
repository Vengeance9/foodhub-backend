import { Request, Response } from "express";
import { adminServices } from "./admin.services";
import { UserRole } from "../../middleware.ts/auth";

const getAllUsers = async (req:Request, res:Response) => {
    try {
        const result = await adminServices.getAllUsers()
        res.status(200).json({ message: "Users fetched successfully", data: result });
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateUserRole = async (req:Request, res:Response) => {
    try {
        const userId = req.params.id;
        const { role } = req.body;
        const validRoles = Object.values(UserRole);

        
        if (!validRoles.includes(role)) {
           return res.status(400).json({
             message: `Invalid role. Valid roles are: ${validRoles.join(", ")}`,
           });
        }
        const Role:UserRole = role as UserRole;
        const result = await adminServices.updateUserRole(userId as string, role);
        res.status(200).json({ message: "User role updated successfully", data: result });
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
}



export const adminController = {getAllUsers, updateUserRole}