import { findByApiKey } from "../repositories/companyRepository.js";
import { Request, Response, NextFunction } from "express";

async function validateCompanyMiddleware(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers["x-api-key"] as string

    const company = await findByApiKey(apiKey)
    if (!company) {
        return res.sendStatus(404)        
    }
    next()
}

export default validateCompanyMiddleware;