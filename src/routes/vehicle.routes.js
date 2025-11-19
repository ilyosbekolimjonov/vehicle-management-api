import { Router } from "express";
import { VehiclesController } from "../controllers/vehicles.controller.js";
import { authGuard, roleGuard } from "../middlewares/guard.middleware.js";

const router = Router();

router.post("/", authGuard, roleGuard(["admin"]), VehiclesController.create);
router.get("/", authGuard, VehiclesController.getAll);
router.get("/:id", authGuard, VehiclesController.getById);
router.put("/:id", authGuard, roleGuard(["admin"]), VehiclesController.update);
router.delete("/:id", authGuard, roleGuard(["admin"]), VehiclesController.remove);

export { router as vehicleRouter };
