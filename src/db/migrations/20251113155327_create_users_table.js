export async function up(knex) {
    await knex.schema.createTable("users", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string("email").unique().notNullable();
        table.string("username").unique().notNullable();
        table.string("password").notNullable();
        table.enum("role", ["user", "admin", "fleet_manager"]).notNullable().defaultTo("user");
        table.enum("status", ["active", "inactive"]).notNullable().defaultTo("active");
        table.timestamps(true, true);

    });
}

export async function down(knex) {
    await knex.schema.dropTableIfExists("users");
}