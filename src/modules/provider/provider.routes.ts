import auth, { UserRole } from "../../middleware/auth.js";
import express, { Router } from "express";

import { providerController } from "./provider.controller.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

router.post(
  "/register",
  auth(UserRole.CUSTOMER,UserRole.PROVIDER),
  upload.single("image"),
  providerController.register
);

router.put(
  "/update_provider/:id",
  auth(UserRole.PROVIDER),
  upload.single("image"),
  providerController.updateProvider
);

router.get(
  "/my_providers",
  auth(UserRole.PROVIDER),
  providerController.getMyProviders
);

router.get("/AllProviders", providerController.getAllProviders);

router.get(
  "/providerMeals/:id",
  auth(UserRole.PROVIDER),
  providerController.getProviderMeals
);

router.post(
  "/meals/:id",
  auth(UserRole.PROVIDER),
  upload.single("image"),
  providerController.createMeal
);

router.put(
  "/meals/:id",
  auth(UserRole.PROVIDER),
  upload.single("image"),
  providerController.updateMeal
);
router.delete(
  "/meals/:id",
  auth(UserRole.PROVIDER),
  providerController.deleteMeal
);

router.put(
  "/updateOrderStatus/:id",
  auth(UserRole.PROVIDER),
  providerController.updateOrderStatus
);

router.get(
  "/provider_orders/:providerId",
  auth(UserRole.PROVIDER),
  providerController.getProviderOrders
);

export const providerRoutes: Router = router;
