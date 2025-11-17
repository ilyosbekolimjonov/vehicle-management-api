import {
    createReport,
    getReports,
    getReportById,
    updateReport,
    deleteReport
} from "../services/report.service.js";

import { createReportSchema, updateReportSchema } from "../validations/report.validation.js";

// CREATE
export const addReport = async (req, res, next) => {
    try {
        const validated = createReportSchema.parse(req.body);
        const [report] = await createReport(validated);

        res.status(201).json({
            success: true,
            data: report,
        });
    } catch (error) {
        next(error);
    }
};

// GET ALL
export const getAllReports = async (req, res, next) => {
    try {
        const reports = await getReports();
        res.json({ success: true, data: reports });
    } catch (error) {
        next(error);
    }
};

// GET BY ID
export const getSingleReport = async (req, res, next) => {
    try {
        const { id } = req.params;

        const report = await getReportById(id);
        if (!report) return res.status(404).json({ message: "Report topilmadi" });

        res.json({ success: true, data: report });
    } catch (error) {
        next(error);
    }
};

// UPDATE
export const editReport = async (req, res, next) => {
    try {
        const validated = updateReportSchema.parse(req.body);
        const { id } = req.params;

        const [updated] = await updateReport(id, validated);
        if (!updated) return res.status(404).json({ message: "Report topilmadi" });

        res.json({ success: true, data: updated });
    } catch (error) {
        next(error);
    }
};

// DELETE
export const removeReport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const count = await deleteReport(id);

        if (!count) return res.status(404).json({ message: "Report topilmadi" });

        res.json({ success: true, message: "Report o‘chirildi" });
    } catch (error) {
        next(error);
    }
};
