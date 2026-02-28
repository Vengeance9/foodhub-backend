import express from 'express';
import { authController } from './auth.controller.js';

const router = express.Router()

router.post('/login',authController.login)
router.post('/signup',authController.signUp)
router.get('/me',authController.getMe)

export const authRoutes = router;