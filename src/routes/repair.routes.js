import { Router } from "express";
import { RepairController } from "../controllers/repair.controller.js";

const router = Router();

router.post("/", RepairController.addRepair);
router.get("/", RepairController.getAllRepairs);
router.get("/:id", RepairController.getSingleRepair);
router.put("/:id", RepairController.editRepair);
router.delete("/:id", RepairController.removeRepair);

export { router as repairRouter };