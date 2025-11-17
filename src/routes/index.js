import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { vehicleRouter } from "./vehicle.routes.js";
import { repairRouter } from "./repair.routes.js";
import { orderRouter } from "./orders.routes.js";
import { reportRouter } from "./report.routes.js";

const router = Router()

router.use("/auth", authRouter)
router.use("/vehicles", vehicleRouter)
router.use("/repairs", repairRouter)
router.use("/orders", orderRouter)
router.use("/reports", reportRouter)

export default router