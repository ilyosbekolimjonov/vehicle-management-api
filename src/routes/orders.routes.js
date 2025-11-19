import { Router } from "express";
import orderController from "../controllers/order.controller.js";
import { authGuard } from "../middlewares/guard.middleware.js";

const router = Router();

router.post("/", authGuard, orderController.create);
router.get("/", authGuard, orderController.getAll);
router.get("/:id", authGuard, orderController.getById);
router.put("/:id", authGuard, orderController.update);
router.delete("/:id", authGuard, orderController.delete);

export { router as orderRouter };
