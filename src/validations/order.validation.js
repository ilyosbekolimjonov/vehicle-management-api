import { z } from "zod";

const OrderStatusEnum = z.enum(["pending", "approved", "rejected", "completed"]);

export const createOrderSchema = z.object({
    vehicleId: z.string().uuid(),
    userId: z.string().uuid(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    totalAmount: z.number().positive(),
    currency: z.enum(["USD", "EUR", "UZS"]).default("USD"),
    status: OrderStatusEnum.default("pending"),
}).refine(
    (data) => data.startDate < data.endDate,
    {
        message: "endDate startDate dan keyin bo'lishi shart",
        path: ["endDate"],
    }
);

export const updateOrderSchema = z.object({
    startDate: z.   coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    totalAmount: z.number().positive().optional(),
    currency: z.enum(["USD", "EUR", "UZS"]).optional(),
    status: OrderStatusEnum.optional(),
}).refine(
    (data) =>
        (data.startDate && data.endDate ? data.startDate < data.endDate : true),
    {
        message: "endDate startDate dan keyin bo'lishi shart",
        path: ["endDate"],
    }
);
