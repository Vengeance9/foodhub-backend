

import express, { Router } from "express";

import { providerController } from "./provider.controller";


const router = express.Router();

router.post('/meals',
    providerController.createMeal
)

router.put('/meals/:id',
    providerController.updateMeal
)

export default router;