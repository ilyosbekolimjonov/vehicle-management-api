export async function up(knex) {
    await knex.schema.createTable("vehicles", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()")); // UUID
        table.string("registrationNumber").unique().notNullable(); // unikal raqam
        table.enum("type", ["car", "truck", "motorcycle", "bus"]).notNullable(); // transport turi
        table.string("make").notNullable();  // ishlab chiqaruvchi
        table.string("model").notNullable(); // model
        table.integer("year").notNullable(); // ishlab chiqarilgan yil
        table.enum("status", ["available", "in_service", "out_of_service"]).notNullable().defaultTo("available"); // holati
        table.timestamps(true, true); // createdAt va updatedAt
    });
}

export async function down(knex) {
    await knex.schema.dropTableIfExists("vehicles");
}
