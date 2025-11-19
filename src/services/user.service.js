import db from "../db/knex.js";

export const UserService = {
    async getUsers() {
        const users = await db("users").select("*")

        return users.map(user => {
            const { password, refresh_token, ...safeUser } = user
            return safeUser
        })
    },

    getUserById(id) {
        return db("users").where({ id }).first();
    },

    updateUser(id, data) {
        return db("users")
            .where({ id })
            .update(data)
            .returning("*");
    },

    async deleteUser(id) {
        return await db("users")
            .where({ id })
            .del();
    },
}