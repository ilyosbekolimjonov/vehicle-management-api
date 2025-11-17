import { z } from "zod";

export const createReportSchema = z.object({
    vehicleId: z.string().uuid("vehicleId noto'g'ri UUID formatida"),
    title: z.string().min(3, "title kamida 3 ta belgidan iborat bo'lishi kerak"),
    description: z.string().min(10, "description kamida 10 ta belgidan iborat bo'lishi kerak"),
});

export const updateReportSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
});
