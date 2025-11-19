import { Router } from "express";
import { RepairController } from "../controllers/repair.controller.js";
import { authGuard } from "../middlewares/guard.middleware.js";

const router = Router();

router.post("/", authGuard, RepairController.addRepair);
router.get("/", authGuard, RepairController.getAllRepairs);
router.get("/:id", authGuard, RepairController.getSingleRepair);
router.put("/:id", authGuard, RepairController.editRepair);
router.delete("/:id", authGuard, RepairController.removeRepair);

export { router as repairRouter };