import { Router } from "express";
import { VehiclesController } from "../controllers/vehicles.controller.js";
import { validate } from "../middlewares/validate.js"; 
import { createVehicleSchema, updateVehicleSchema } from "../validations/vehicles.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = Router();

router.post("/", authMiddleware, checkRole(["admin"]), validate(createVehicleSchema), VehiclesController.create);
router.get("/", authMiddleware, VehiclesController.getAll);
router.get("/:id", authMiddleware, VehiclesController.getById);
router.put("/:id", authMiddleware, checkRole(["admin"]), validate(updateVehicleSchema), VehiclesController.update);
router.delete("/:id", authMiddleware, checkRole(["admin"]), VehiclesController.remove);

export { router as vehicleRouter };
