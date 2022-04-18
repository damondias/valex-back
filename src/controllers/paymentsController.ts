import { Request, Response } from "express";
import * as paymentsServices from '../services/paymentsServices.js';

export async function purchases(req: Request, res: Response) {
    const { cardId, businessId, password, amount } = req.body
    if (!businessId || !cardId || !password || !amount) {
        return res.sendStatus(422);
    }

    await paymentsServices.create(cardId, businessId, password, amount)
    return res.sendStatus(201)
}