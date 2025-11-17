import db from "../db/knex.js";

export async function createReport(data) {
    return await db("reports").insert(data).returning("*");
}

export async function getReports() {
    return await db("reports").select("*");
}

export async function getReportById(id) {
    return await db("reports").where({ id }).first();
}

export async function updateReport(id, data) {
    return await db("reports").where({ id }).update(data).returning("*");
}

export async function deleteReport(id) {
    return await db("reports").where({ id }).delete();
}
