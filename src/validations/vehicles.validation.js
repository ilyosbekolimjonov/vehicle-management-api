import { z } from "zod";

export const createVehicleSchema = z.object({
    registrationNumber: z
        .string()
        .min(3, "registrationNumber kamida 3 belgidan iborat bo'lishi kerak"),
    type: z.enum(["car", "truck", "motorcycle", "bus"]),
    make: z.string().min(1),
    model: z.string().min(1),
    year: z
        .number()
        .int()
        .min(1950)
        .max(new Date().getFullYear()),
    status: z.enum(["available", "in_service", "out_of_service"]).optional(),
});

export const updateVehicleSchema = createVehicleSchema.partial();
