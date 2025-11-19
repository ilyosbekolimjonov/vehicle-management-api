import orderService from "../services/order.service.js";

export default {
    async create(req, res, next) {
        try {
            const data = req.body;
            const result = await orderService.create(data);

            res.status(201).json({
                success: true,
                message: "Order muvaffaqiyatli yaratildi",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },
    
    async getAll(req, res, next) {
        try {
            const orders = await orderService.getAll();
            res.status(200).json({
                success: true,
                data: orders,
            });
        } catch (error) {
            next(error);
        }
    },

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const order = await orderService.getById(id);

            res.status(200).json({
                success: true,
                data: order,
            });
        } catch (error) {
            next(error);
        }
    },
    
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            const currentUser = req.user; // JWT middleware dagi user

            const updated = await orderService.update(id, data, currentUser);

            res.status(200).json({
                success: true,
                message: "Order yangilandi",
                data: updated,
            });
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const currentUser = req.user;

            const result = await orderService.delete(id, currentUser);

            res.status(200).json({
                success: true,
                ...result,
            });
        } catch (error) {
            next(error);
        }
    },
};
