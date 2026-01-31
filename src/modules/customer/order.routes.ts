import express, { Router } from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/orders", 
    orderController.createOrders
);
router.get('/orders',
    orderController.getCart
)
router.get('/orders/:id',
    orderController.getCart
)

