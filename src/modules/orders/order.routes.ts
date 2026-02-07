import express, { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware.ts/auth";

const router = express.Router();

router.post('/add_to_cart/:providerId',
    auth(UserRole.CUSTOMER),
    orderController.addToCart
)

router.get('/cart',
    auth(UserRole.CUSTOMER),
    orderController.getCart
)

router.post("/orders/checkout", 
    auth(UserRole.CUSTOMER),
    orderController.checkOutOrder
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

