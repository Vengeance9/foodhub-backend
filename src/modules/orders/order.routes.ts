import express, { Router } from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/orders/:providerId", 
    orderController.createOrders
);
router.get('/orders',
    orderController.getOrders
)
router.get('/orders/:orderId',
    orderController.getOrderDetails
)

