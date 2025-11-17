export async function up(knex) {
    await knex.schema.createTable("orders", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("vehicleId").notNullable().references("id").inTable("vehicles").onDelete("CASCADE"); 
        table.uuid("userId").notNullable().references("id").inTable("users").onDelete("CASCADE"); 
        table.date("startDate").notNullable(); 
        table.date("endDate").notNullable();   
        table.enum("status", ["pending", "approved", "rejected", "completed"]).notNullable().defaultTo("pending");
        table.decimal("totalAmount", 10, 2).notNullable();
        table.string("currency").notNullable().defaultTo("USD"); 
        table.timestamps(true, true);
    });
}

export async function down(knex) {
    await knex.schema.dropTableIfExists("orders");
}
