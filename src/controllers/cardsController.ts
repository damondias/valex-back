import { Request, Response } from "express";

import * as cardServices from '../services/cardsServices.js'

export async function create(req: Request, res: Response) {
    const {employeeId, type } = req.body;

    if (!type || !employeeId) {
        return res.sendStatus(422);
    }

    await cardServices.create(employeeId, type)
   
    return res.sendStatus(201);
}


export async function update(req: Request, res: Response) {
    const { cardId, cvc, password } = req.body;

    if (!cvc || !cardId || !password) {
        return res.sendStatus(422);
    }

    await cardServices.update(cardId, cvc, password)

    return res.sendStatus(200);
}

export async function balance(req: Request, res: Response) {
    const { id  } = req.params;
    if ( !id ) {
        return res.sendStatus(422);
    }

    const balance = await cardServices.balance(id)

    res.send(balance);
}
