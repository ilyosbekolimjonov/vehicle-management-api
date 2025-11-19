import { z } from "zod";

export const updateUserSchema = z.object({
    email: z.string().email().optional(),
    username: z.string().min(2).optional(),
    status: z.enum(["active", "inactive"]).optional(),
    role: z.enum(["admin", "customer", "manager"]).optional(),
}).refine(
    (data) => Object.keys(data).length > 0,
    { message: "Kamida bitta maydon o'zgartirilishi kerak" }
);
