import knex from "../db/knex.js";

export default {
    
    // CREATE ORDER
    
    async create(data) {
        const { vehicleId, userId, startDate, endDate, totalAmount, currency } = data;

        // 1. Vehicle mavjudligini tekshirish
        const vehicle = await knex("vehicles").where({ id: vehicleId }).first();
        if (!vehicle) {
            throw new Error(404, "Vehicle topilmadi");
        }

        // 2. Agar transport xizmatdan tashqarida bo‘lsa
        if (vehicle.status === "out_of_service") {
            throw new Error(400, "Bu transport hozirda xizmatdan tashqarida");
        }

        // 3. User mavjudligini tekshirish
        const user = await knex("users").where({ id: userId }).first();
        if (!user) {
            throw new Error(404, "User topilmadi");
        }

        // 4. Overlap check (shu vaqt ichida boshqa buyurtma bo‘lmasligi)
        const overlapping = await knex("orders")
            .where({ vehicleId })
            .andWhere(function () {
                this.whereBetween("startDate", [startDate, endDate])
                    .orWhereBetween("endDate", [startDate, endDate])
                    .orWhereRaw("? BETWEEN startDate AND endDate", [startDate])
                    .orWhereRaw("? BETWEEN startDate AND endDate", [endDate]);
            })
            .first();

        if (overlapping) {
            throw new Error(400, "Bu vaqt oralig'ida transport band");
        }

        // 5. Create order
        const [order] = await knex("orders")
            .insert({
                vehicleId,
                userId,
                startDate,
                endDate,
                totalAmount,
                currency,
                status: "pending",
            })
            .returning("*");

        return order;
    },

    
    // GET ALL
    
    async getAll() {
        return knex("orders").select("*");
    },

    
    // GET BY ID
    
    async getById(id) {
        const order = await knex("orders").where({ id }).first();
        if (!order) throw new Error(404, "Order topilmadi");
        return order;
    },

    
    // UPDATE ORDER 
    
    async update(id, data, currentUser) {
        const order = await knex("orders").where({ id }).first();
        if (!order) throw new Error(404, "Order topilmadi");

        // Faqat egasi update qilishi mumkin
        if (order.userId !== currentUser.id && currentUser.role !== "admin") {
            throw new Error(403, "Siz bu buyurtmani o‘zgartira olmaysiz");
        }

        // Agar date o‘zgartirilsa yana overlap check qilamiz
        if (data.startDate || data.endDate) {
            const start = data.startDate || order.startDate;
            const end = data.endDate || order.endDate;

            const overlapping = await knex("orders")
                .where({ vehicleId: order.vehicleId })
                .andWhereNot({ id })
                .andWhere(function () {
                    this.whereBetween("startDate", [start, end])
                        .orWhereBetween("endDate", [start, end])
                        .orWhereRaw("? BETWEEN startDate AND endDate", [start])
                        .orWhereRaw("? BETWEEN startDate AND endDate", [end]);
                })
                .first();

            if (overlapping) {
                throw new Error(400, "Bu vaqt oralig'ida transport band");
            }
        }

        const [updated] = await knex("orders")
            .where({ id })
            .update(data)
            .returning("*");

        return updated;
    },

    
    // DELETE ORDER
    
    async delete(id, currentUser) {
        const order = await knex("orders").where({ id }).first();
        if (!order) throw new Error(404, "Order topilmadi");

        if (order.userId !== currentUser.id && currentUser.role !== "admin") {
            throw new Error(403, "Siz bu buyurtmani o‘chira olmaysiz");
        }

        await knex("orders").where({ id }).del();
        return { message: "Order o‘chirildi" };
    }
};
