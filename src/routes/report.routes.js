import { Router } from "express";
import { ReportController } from "../controllers/report.controller.js";
import { authGuard } from "../middlewares/guard.middleware.js";

const router = Router();

router.post("/", authGuard, ReportController.addReport);
router.get("/", authGuard, ReportController.getAllReports);
router.get("/:id", authGuard, ReportController.getSingleReport);
router.put("/:id", authGuard, ReportController.editReport);
router.delete("/:id", authGuard, ReportController.removeReport);

export { router as reportRouter };