import express from "express";
import { sessionController } from "./auth.services";

const router = express.Router();

router.get("/me", sessionController.getServerSession);
export const authRoutes = router;