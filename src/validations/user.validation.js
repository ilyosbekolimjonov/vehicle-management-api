import { z } from "zod";

export const updateUserSchema = z.object({
    full_name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    phone_number: z.string().optional(),
    roles: z.enum(["ADMIN", "CUSTOMER", "MANAGER"]).optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    { message: "Kamida bitta maydon o'zgartirilishi kerak" }
);
