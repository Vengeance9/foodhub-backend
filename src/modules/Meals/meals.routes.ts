import express, { Router } from "express";
import { mealsController } from "./meals.controller";

const router = express.Router();

router.get('/',
    mealsController.getAllMeals
)

router.get('/:id',
    mealsController.getMealById)

router.get('/providers',
    mealsController.getProviders
)

router.get('/providers/:id',
    mealsController.getProviderById
)

export const mealsRoutes = router;