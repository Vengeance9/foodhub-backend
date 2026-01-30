import express, { Router } from "express";
import { mealsController } from "./meals.controller";

const router = express.Router();

router.get('/',
    mealsController.getAllMeals
)

