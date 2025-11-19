import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.post("/register", AuthController.register);
router.post("/verify-otp", AuthController.verifyOtp);
router.post("/resend-otp", AuthController.resendOtp);
router.post("/login", AuthController.login);

// Private routes
router.get("/me", authMiddleware, AuthController.myProfile);
router.post("/logout", authMiddleware, AuthController.logout);
router.post("/refresh-token", AuthController.refreshToken);

export { router as authRouter };