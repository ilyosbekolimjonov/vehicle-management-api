import { Router } from "express";
import {
    addRepair,
    getAllRepairs,
    getSingleRepair,
    editRepair,
    removeRepair
} from "../controllers/repair.controller.js";

const router = Router();

router.post("/", addRepair);
router.get("/", getAllRepairs);
router.get("/:id", getSingleRepair);
router.put("/:id", editRepair);
router.delete("/:id", removeRepair);

export { router as repairRouter };