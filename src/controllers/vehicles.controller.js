import { VehiclesService } from "../services/vehicles.service.js";

export const VehiclesController = {
    // CREATE VEHICLE
    async create(req, res, next) {
        try {
            const data = req.body;

            const vehicle = await VehiclesService.create(data);

            return res.status(201).json({
                success: true,
                message: "Vehicle created successfully",
                data: vehicle,
            });
        } catch (error) {
            next(error);
        }
    },

    // GET ALL
    async getAll(req, res, next) {
        try {
            const vehicles = await VehiclesService.getAll();

            return res.status(200).json({
                success: true,
                data: vehicles,
            });
        } catch (error) {
            next(error);
        }
    },

    // GET BY ID
    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const vehicle = await VehiclesService.getById(id);

            if (!vehicle) {
                return res.status(404).json({
                    success: false,
                    message: "Vehicle not found",
                });
            }

            return res.status(200).json({
                success: true,
                data: vehicle,
            });
        } catch (error) {
            next(error);
        }
    },

    // UPDATE
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;

            const updated = await VehiclesService.update(id, data);

            if (!updated) {
                return res.status(404).json({
                    success: false,
                    message: "Vehicle not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: updated,
            });
        } catch (error) {
            next(error);
        }
    },

    // DELETE
    async remove(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await VehiclesService.delete(id);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: "Vehicle not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully",
                data: deleted,
            });
        } catch (error) {
            next(error);
        }
    },
};