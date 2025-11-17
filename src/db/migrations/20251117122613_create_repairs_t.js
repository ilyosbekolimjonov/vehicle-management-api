export async function up(knex) {
    await knex.schema.createTable("repairs", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("vehicleId").notNullable().references("id").inTable("vehicles").onDelete("CASCADE"); 
        table.text("description").notNullable(); 
        table.decimal("cost", 10, 2).notNullable(); 
        table.date("date").notNullable(); 
        table.enum("status", ["pending", "in_progress", "completed"]).notNullable().defaultTo("pending"); 
        table.timestamps(true, true); 
    });
}

export async function down(knex) {
    await knex.schema.dropTableIfExists("repairs");
}
