import { Router } from "express";
import orderController from "../controllers/order.controller.js";
import { createOrderSchema, updateOrderSchema } from "../validations/order.validation.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, validate(createOrderSchema), orderController.create);
router.get("/", authMiddleware, orderController.getAll);
router.get("/:id", authMiddleware, orderController.getById);
router.put("/:id", authMiddleware, validate(updateOrderSchema), orderController.update);
router.delete("/:id", authMiddleware, orderController.delete);

export { router as orderRouter };
