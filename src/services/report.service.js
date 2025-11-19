import knex from "../db/knex.js"

export const ReportService = {
    async create(data) {
        const { vehicleId, title, description } = data

        const vehicle = await knex("vehicles").where({ id: vehicleId }).first()
        if (!vehicle) throw new Error("Vehicle topilmadi")

        const report = await knex("reports")
            .insert({
                vehicleId,
                title,
                description
            })
            .returning("*")

        return report
    },

    async getAll() {
        return await knex("reports")
            .select("*")
            .orderBy("created_at", "desc")
    },

    async getById(id) {
        const report = await knex("reports").where({ id }).first()
        if (!report) throw new Error(404, "Report topilmadi")
        return report
    },

    async update(id, data) {
        const report = await knex("reports").where({ id }).first()
        if (!report) throw new Error(404, "Report topilmadi")

        if (data.vehicleId) {
            const vehicle = await knex("vehicles")
                .where({ id: data.vehicleId })
                .first()
            if (!vehicle) throw new Error(404, "Vehicle topilmadi")
        }

        const [updated] = await knex("reports")
            .where({ id })
            .update(data)
            .returning("*")

        return updated
    },

    async delete(id) {
        const report = await knex("reports").where({ id }).first()
        if (!report) throw new Error(404, "Report topilmadi")

        await knex("reports").where({ id }).del()

        return { message: "Report o‘chirildi" }
    }
}
