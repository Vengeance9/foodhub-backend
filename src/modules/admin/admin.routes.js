import express from "express";
import { adminController } from "./admin.controller";
import auth, { UserRole } from "../../middleware/auth";
const router = express.Router();
router.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers);
router.patch("/users/:id", auth(UserRole.ADMIN), adminController.updateUserRole);
router.get("/orders", auth(UserRole.ADMIN), adminController.getOrders);
router.put("/users/:id", auth(UserRole.ADMIN), adminController.updateUserStatus);
export const adminRoutes = router;
