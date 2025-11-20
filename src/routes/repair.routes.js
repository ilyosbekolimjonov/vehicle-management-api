import { Router } from "express"
import { RepairController } from "../controllers/repair.controller.js"
import { authGuard, roleGuard } from "../middlewares/guard.middleware.js"

const router = Router()

router.post("/", authGuard, roleGuard(["admin", "fleet_manager"]), RepairController.addRepair)
router.get("/", authGuard, roleGuard(["admin", "fleet_manager"]), RepairController.getAllRepairs)
router.get("/:id", authGuard, roleGuard(["admin", "fleet_manager"]), RepairController.getSingleRepair)
router.put("/:id", authGuard, roleGuard(["admin", "fleet_manager"]), RepairController.editRepair)
router.delete("/:id", authGuard, roleGuard(["admin", "fleet_manager"]), RepairController.removeRepair)

export { router as repairRouter }