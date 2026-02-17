import auth, { UserRole } from "../../middleware/auth";
import express from "express";
import { reviewController } from "./reviews.controller";
const router = express.Router();
router.post("/provider/:providerId", auth(UserRole.CUSTOMER), reviewController.reviewProvider);
router.get("/my_reviews/:providerId", auth(UserRole.CUSTOMER), reviewController.getMyReviews);
router.get("/all_reviews/:providerId", reviewController.getAllReviews);
export const reviewRoutes = router;
