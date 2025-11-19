import { ReportService } from "../services/report.service.js"

import { createReportSchema, updateReportSchema } from "../validations/report.validation.js"

export const ReportController = {
    async addReport(req, res, next){
        try {
            const validated = createReportSchema.parse(req.body)
            const [report] = await ReportService.createReport(validated)
    
            res.status(201).json({
                success: true,
                data: report,
            })
        } catch (error) {
            next(error)
        }
    },
    
    async getAllReports(req, res, next){
        try {
            const reports = await ReportService.getReports()
            res.json({ success: true, data: reports })
        } catch (error) {
            next(error)
        }
    },
    
    async getSingleReport(req, res, next){
        try {
            const { id } = req.params
    
            const report = await ReportService.getReportById(id)
            if (!report) return res.status(404).json({ message: "Report topilmadi" })
    
            res.json({ success: true, data: report })
        } catch (error) {
            next(error)
        }
    },
    
    async editReport(req, res, next){
        try {
            const validated = updateReportSchema.parse(req.body)
            const { id } = req.params
    
            const [updated] = await ReportService.updateReport(id, validated)
            if (!updated) return res.status(404).json({ message: "Report topilmadi" })
    
            res.json({ success: true, data: updated })
        } catch (error) {
            next(error)
        }
    },
    
    async removeReport(req, res, next){
        try {
            const { id } = req.params
            const count = await ReportService.deleteReport(id)
    
            if (!count) return res.status(404).json({ message: "Report topilmadi" })
    
            res.json({ success: true, message: "Report o'chirildi" })
        } catch (error) {
            next(error)
        }
    },
}
