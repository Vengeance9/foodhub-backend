
import auth, { UserRole } from "../../middleware.ts/auth";
import express, { Router } from "express";

import { providerController } from "./provider.controller";


const router = express.Router();

router.post('/register',
    auth(UserRole.CUSTOMER),
    providerController.register)

router.get('/AllProviders',
    providerController.getAllProviders
)

router.get('/:id',
    providerController.getProviderMeals

)

router.post('/meals',
    auth(UserRole.PROVIDER),
    providerController.createMeal
)

router.put('/meals/:id',
    auth(UserRole.PROVIDER),
    providerController.updateMeal
)
router.delete(
  "/meals/:id",
  auth(UserRole.PROVIDER),
  providerController.deleteMeal
);

router.put('/updateOrderStatus/:id',
    auth(UserRole.PROVIDER),
    providerController.updateOrderStatus
)

export const providerRoutes: Router = router;