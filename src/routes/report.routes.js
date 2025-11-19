import { Router } from "express";
import { ReportController } from "../controllers/report.controller.js";

const router = Router();

router.post("/", ReportController.addReport);
router.get("/", ReportController.getAllReports);
router.get("/:id", ReportController.getSingleReport);
router.put("/:id", ReportController.editReport);
router.delete("/:id", ReportController.removeReport);

export { router as reportRouter };