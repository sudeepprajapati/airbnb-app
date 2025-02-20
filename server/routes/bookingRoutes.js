import { Router } from "express";
import { BookPlace, getBookings } from '../controllers/bookingsController.js';

const router = Router();

router.post('/bookings', BookPlace);
router.get('/bookings', getBookings);

export default router;