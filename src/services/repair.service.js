import knex from "../db/knex.js";

export const RepairService = {
    
    // CREATE REPAIR
    
    async create(data) {
        const { vehicleId, description, cost, date, status } = data;

        // 1. Transport mavjudmi?
        const vehicle = await knex("vehicles").where({ id: vehicleId }).first();
        if (!vehicle) throw new Error(404, "Vehicle topilmadi");

        // 2. Agar boshqa ta'mir jarayoni mavjud bo‘lsa bloklaymiz
        const activeRepair = await knex("repairs")
            .where({ vehicleId })
            .andWhere((qb) => {
                qb.where("status", "pending")
                    .orWhere("status", "in_progress");
            })
            .first();

        if (activeRepair) {
            throw new Error(400, "Bu transport hozirda ta'mir jarayonida");
        }

        // 3. Create repair
        const [repair] = await knex("repairs")
            .insert({
                vehicleId,
                description,
                cost,
                date,
                status
            })
            .returning("*");

        return repair;
    },

    
    // GET ALL
    
    async getAll() {
        return await knex("repairs").select("*");
    },

    
    // GET BY ID
    
    async getById(id) {
        const repair = await knex("repairs").where({ id }).first();
        if (!repair) throw new Error(404, "Repair topilmadi");
        return repair;
    },

    
    // UPDATE
    
    async update(id, data) {
        const repair = await knex("repairs").where({ id }).first();
        if (!repair) throw new Error(404, "Repair topilmadi");

        // AGAR STATUS UPDATE QILINSA — QOIDALAR
        if (data.status) {
            // pending → in_progress → completed tartibida bo‘ladi
            const allowed = {
                pending: ["in_progress"],
                in_progress: ["completed"],
                completed: []
            };

            if (!allowed[repair.status].includes(data.status)) {
                throw new Error(
                    400,
                    `Statusni '${repair.status}' dan '${data.status}' ga o‘zgartirib bo‘lmaydi`
                );
            }
        }

        const [updated] = await knex("repairs")
            .where({ id })
            .update(data)
            .returning("*");

        return updated;
    },
   
    // DELETE
    async delete(id) {
        const repair = await knex("repairs").where({ id }).first();
        if (!repair) throw new Error(404, "Repair topilmadi");

        await knex("repairs").where({ id }).del();

        return { message: "Repair o‘chirildi" };
    }
};
