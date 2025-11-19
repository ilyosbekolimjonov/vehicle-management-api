import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = Router();

router.get("/", authMiddleware, checkRole(["admin"]), UserController.getAllUsers);
router.get("/:id", authMiddleware, checkRole(["admin"]), UserController.getSingleUser);
router.put("/:id", authMiddleware, checkRole(["admin"]), UserController.editUser);
router.delete("/:id", authMiddleware, checkRole(["admin"]), UserController.removeUser);

export { router as userRouter};
