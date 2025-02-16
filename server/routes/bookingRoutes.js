import { Router } from "express";
import { BookPlace } from '../controllers/bookingsController.js';

const router = Router();

router.post('/bookings', BookPlace);

export default router;