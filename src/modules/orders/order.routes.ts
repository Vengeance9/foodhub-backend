import express, { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware.ts/auth";
import e from "express";

const router = express.Router();

router.post('/add_to_cart/:providerMealId',
    auth(UserRole.CUSTOMER),
    orderController.addToCart
)

router.get('/cart',
    auth(UserRole.CUSTOMER),
    orderController.getCart
)

router.post("/checkout", 
    auth(UserRole.CUSTOMER),
    orderController.checkOutOrder
);
router.get('/getOrders',
    auth(UserRole.CUSTOMER),
    orderController.getOrders
)
router.get(
  "/orders/:orderId",
  auth(UserRole.CUSTOMER),
  orderController.getOrderDetails
);

export const orderRoutes = router;