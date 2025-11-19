import { z } from "zod"

export const registerUserSchema = z.object({
    email: z.string().trim().email("Email noto'g'ri formatda").min(5, "Email juda qisqa"),
    username: z.string().trim().min(3, "Username kamida 3 ta belgidan iborat bo'lishi kerak").max(30, "Username juda uzun"),
    password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
    role: z
        .enum(["user", "admin", "fleet_manager"], {
            invalid_type_error: "Role noto'g'ri",
        })
        .optional(),
    status: z
        .enum(["active", "inactive"], {
            invalid_type_error: "Status noto'g'ri",
        })
        .optional(),
})

export const verifyOtpSchema = z.object({
    email: z.string()
        .email("Email noto'g'ri formatda"),
    code: z.string()
        .regex(/^[0-9]{6}$/, "OTP faqat raqam bo'lishi kerak")
})

export const resendOtpSchema = z.object({
    email: z.string()
        .email("Email noto'g'ri formatda")
})
