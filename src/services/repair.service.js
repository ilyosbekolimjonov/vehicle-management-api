import knex from "../db/knex.js"

export const RepairService = {
    async create(data) {
        const { vehicleId, description, cost, date, status } = data

        const vehicle = await knex("vehicles").where({ id: vehicleId }).first()
        if (!vehicle) throw new Error("Vehicle topilmadi")

        const activeRepair = await knex("repairs")
            .where({ vehicleId })
            .andWhere((qb) => {
                qb.where("status", "pending")
                    .orWhere("status", "in_progress")
            })
            .first()

        if (activeRepair) {
            throw new Error("Bu transport hozirda ta'mir jarayonida")
        }

        const [repair] = await knex("repairs")
            .insert({
                vehicleId,
                description,
                cost,
                date,
                status
            })
            .returning("*")

        return repair
    },

    async getAll() {
        return await knex("repairs").select("*")
    },

    async getById(id) {
        const repair = await knex("repairs").where({ id }).first()
        if (!repair) throw new Error("Repair topilmadi")
        return repair
    },

    async update(id, data) {
        const repair = await knex("repairs").where({ id }).first()
        if (!repair) throw new Error("Repair topilmadi")

        if (data.status) {
            const allowed = {
                pending: ["in_progress"],
                in_progress: ["completed"],
                completed: []
            }

            if (!allowed[repair.status].includes(data.status)) {
                throw new Error(
                    400,
                    `Statusni '${repair.status}' dan '${data.status}' ga o‘zgartirib bo‘lmaydi`
                )
            }
        }

        const [updated] = await knex("repairs")
            .where({ id })
            .update(data)
            .returning("*")

        return updated
    },
   
    async delete(id) {
        const repair = await knex("repairs").where({ id }).first()
        if (!repair) throw new Error("Repair topilmadi")

        await knex("repairs").where({ id }).del()

        return { message: "Repair o'chirildi" }
    }
}
