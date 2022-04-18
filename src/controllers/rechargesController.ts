import { Request, Response } from "express";
import * as rechargesServices from '../services/rechargesServices.js'

export async function recharge(req: Request, res: Response) {
   const { cardId, amount } = req.body;
   
   if (!cardId || !amount) {
    return res.sendStatus(422);
    }

   rechargesServices.rechargeCard(cardId, amount);
   res.sendStatus(201);
}