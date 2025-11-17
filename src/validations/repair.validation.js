import { z } from "zod";

const RepairStatusEnum = z.enum(["pending", "in_progress", "completed"]);

export const createRepairSchema = z.object({
    vehicleId: z.string().uuid(),
    description: z.string().min(3, "Description kamida 3 ta belgi bo'lishi shart"),
    cost: z.number().positive("Cost musbat son bo'lishi kerak"),
    date: z.coerce.date(),
    status: RepairStatusEnum.default("pending")
});

export const updateRepairSchema = z.object({
    description: z.string().min(3).optional(),
    cost: z.number().positive().optional(),
    date: z.coerce.date().optional(),
    status: RepairStatusEnum.optional()
});
