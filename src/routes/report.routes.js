import { Router } from "express";
import {
    addReport,
    getAllReports,
    getSingleReport,
    editReport,
    removeReport,
} from "../controllers/report.controller.js";

const router = Router();

router.post("/", addReport);
router.get("/", getAllReports);
router.get("/:id", getSingleReport);
router.put("/:id", editReport);
router.delete("/:id", removeReport);

export { router as reportRouter };
