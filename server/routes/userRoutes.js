import { Router } from "express";
import { deleteUser, loginUser, logoutUser, registerUser, test, updateUser, userProfile } from "../controllers/userController.js";
import { getBookings, getHostBookings, updateBookingStatus } from "../controllers/bookingsController.js";


const router = Router()

router.get("/test", test)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/profile", userProfile)
router.put("/update-user", updateUser)
router.delete("/delete-user", deleteUser)
router.get("/bookings", getBookings);
router.get("/host-bookings", getHostBookings); 
router.put("/update-booking-status", updateBookingStatus); 

export default router