import db from "../db/knex.js";

export const ReportService = {
    async createReport(data) {
        return await db("reports").insert(data).returning("*");
    },
    
    async getReports() {
        return await db("reports").select("*");
    },
    
    async getReportById(id) {
        return await db("reports").where({ id }).first();
    },
    
    async updateReport(id, data) {
        return await db("reports").where({ id }).update(data).returning("*");
    },
    
    async deleteReport(id) {
        return await db("reports").where({ id }).delete();
    },
}
