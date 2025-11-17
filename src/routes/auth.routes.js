import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { AuthController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyOtpSchema, resendOtpSchema } from "../validations/auth.validation.js";

const router = Router();

// Public routes
router.post("/register", AuthController.register);
router.post("/verify-otp", validate(verifyOtpSchema), AuthController.verifyOtp);
router.post("/resend-otp", validate(resendOtpSchema), AuthController.resendOtp);
router.post("/login", AuthController.login);

// Private routes
router.get("/me", authMiddleware, AuthController.myProfile);
router.post("/logout", authMiddleware, AuthController.logout);
router.post("/refresh-token", AuthController.refreshToken);

export { router as authRouter };