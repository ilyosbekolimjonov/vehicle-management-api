import { z } from "zod";

export const verifyOtpSchema = z.object({
    email: z.string()
        .email("Email noto'g'ri formatda"),

    code: z.string()
        .regex(/^[0-9]{6}$/, "OTP faqat raqam bo'lishi kerak")
});

export const resendOtpSchema = z.object({
    email: z.string()
        .email("Email noto'g'ri formatda")
});
