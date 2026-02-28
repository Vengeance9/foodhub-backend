import express from "express";
import { orderController } from "./order.controller.js";
import auth, { UserRole } from "../../middleware/auth.js";

const router = express.Router();

router.post(
  "/add_to_cart/:providerMealId",
  auth(UserRole.CUSTOMER),
  orderController.addToCart
);

router.get("/cart", auth(UserRole.CUSTOMER), orderController.getCart);
router.delete(
  "/clear_cart",
  auth(UserRole.CUSTOMER),
  orderController.clearCart
);
router.post(
  "/checkout",
  auth(UserRole.CUSTOMER),
  orderController.checkOutOrder
);
router.get("/getOrders", auth(UserRole.CUSTOMER), orderController.getOrders);
router.get(
  "/orders/:orderId",
  auth(UserRole.CUSTOMER),
  orderController.getOrderDetails
);

router.get('/getMyOrder', auth(UserRole.CUSTOMER), orderController.getMyOrder);



export const orderRoutes = router;
