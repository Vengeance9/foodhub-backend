import auth, { UserRole } from "../../middleware.ts/auth";
import express, { Router } from "express";
import { reviewController } from "./reviews.controller";

const router = express.Router();

router.post('/:providerMealId', auth(UserRole.CUSTOMER), reviewController.review)

router.put('/:providerMealId', auth(UserRole.CUSTOMER), reviewController.updateReview)

router.delete('/:providerMealId', auth(UserRole.CUSTOMER), reviewController.deleteReview)

router.get('/:providerMealId', auth(UserRole.CUSTOMER), reviewController.getMyReview)
export const reviewRoutes = router;