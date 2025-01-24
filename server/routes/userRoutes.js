import { Router } from "express";
import { loginUser, logoutUser, registerUser, test, userProfile } from "../controllers/userController.js";


const router = Router()

router.route("/test").get(test)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/profile").get(userProfile)

export default router