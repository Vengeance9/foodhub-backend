import express from 'express';
import { sessionController } from './auth.services.js';

const router = express.Router()

router.get('/me',sessionController.getServerSession)

export const authRoutes = router;