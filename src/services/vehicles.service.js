import knex from "../db/knex.js";

export const VehiclesService = {
    // CREATE
    async create(data) {
        const [vehicle] = await knex("vehicles")
            .insert(data)
            .returning("*");
        return vehicle;
    },

    // GET ALL
    async getAll() {
        return await knex("vehicles").select("*").orderBy("created_at", "desc");
    },

    // GET BY ID
    async getById(id) {
        return await knex("vehicles").where({ id }).first();
    },

    // UPDATE
    async update(id, data) {
        const [updated] = await knex("vehicles")
            .where({ id })
            .update({ ...data, updated_at: knex.fn.now() })
            .returning("*");

        return updated;
    },

    // DELETE
    async delete(id) {
        const deleted = await knex("vehicles")
            .where({ id })
            .del()
            .returning("*");

        return deleted[0] || null;
    },
};
