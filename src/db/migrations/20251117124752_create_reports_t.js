export async function up(knex) {
    await knex.schema.createTable("reports", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("vehicleId").notNullable().references("id").inTable("vehicles").onDelete("CASCADE"); // Transport ID
        table.string("title").notNullable(); // Hisobot nomi
        table.text("description").notNullable(); // Hisobot ta'rifi
        table.timestamps(true, true)
    });
}

export async function down(knex) {
    await knex.schema.dropTableIfExists("reports");
}
