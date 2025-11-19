import { Router } from "express";
import { VehiclesController } from "../controllers/vehicles.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = Router();

router.post("/", authMiddleware, checkRole(["admin"]), VehiclesController.create);
router.get("/", authMiddleware, VehiclesController.getAll);
router.get("/:id", authMiddleware, VehiclesController.getById);
router.put("/:id", authMiddleware, checkRole(["admin"]), VehiclesController.update);
router.delete("/:id", authMiddleware, checkRole(["admin"]), VehiclesController.remove);

export { router as vehicleRouter };
