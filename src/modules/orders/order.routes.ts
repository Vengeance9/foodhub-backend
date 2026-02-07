import express, { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware.ts/auth";

const router = express.Router();

router.post("/orders/:providerId", 
    auth(UserRole.CUSTOMER),
    orderController.createOrders
);
router.get('/orders',
    auth(UserRole.CUSTOMER),
    orderController.getOrders
)
router.get(
  "/orders/:orderId",
  auth(UserRole.CUSTOMER),
  orderController.getOrderDetails
);

