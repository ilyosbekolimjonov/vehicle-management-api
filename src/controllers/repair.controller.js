import { RepairService }  from "../services/repair.service.js";

import {
    createRepairSchema,
    updateRepairSchema
} from "../validations/repair.validation.js";

export const RepairController = {
    async addRepair(req, res, next){
        try {
            const validated = createRepairSchema.parse(req.body);
            const [repair] = await RepairService.create(validated);
    
            res.status(201).json({
                success: true,
                data: repair,
            });
        } catch (error) {
            next(error);
        }
    },
    
    async getAllRepairs(req, res, next){
        try {
            const repairs = await RepairService.getAll();
            res.json({
                success: true,
                data: repairs,
            });
        } catch (error) {
            next(error);
        }
    },
    
    async getSingleRepair(req, res, next){
        try {
            const { id } = req.params;
            const repair = await RepairService.getById(id);
    
            if (!repair) {
                return res.status(404).json({
                    success: false,
                    message: "Repair topilmadi",
                });
            }
    
            res.json({
                success: true,
                data: repair,
            });
    
        } catch (error) {
            next(error);
        }
    },
    
    async editRepair(req, res, next){
        try {
            const validated = updateRepairSchema.parse(req.body);
            const { id } = req.params;
    
            const [updated] = await RepairService.update(id, validated);
    
            if (!updated) {
                return res.status(404).json({
                    success: false,
                    message: "Repair topilmadi",
                });
            }
    
            res.json({
                success: true,
                data: updated,
            });
    
        } catch (error) {
            next(error);
        }
    },
    
    async removeRepair(req, res, next){
        try {
            const { id } = req.params;
    
            const deleted = await RepairService.delete(id);
    
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: "Repair topilmadi",
                });
            }
    
            res.json({
                success: true,
                message: "Repair muvaffaqiyatli o'chirildi",
            });
    
        } catch (error) {
            next(error);
        }
    },
}
