import * as paymentRepository from '../repositories/paymentRepository.js';
import * as businessRepository from '../repositories/businessRepository.js';

import validateCard from './validateNotExperiedCard.js';
import totalBalance from './totalBalanceService.js';
import bcrypt from "bcrypt";


export async function create(cardId: number, businessId: number, password: string, amount: number) {
    const card = await validateCard(cardId)
    if (!(bcrypt.compareSync(password, card.password)))  throw new Error("erro senha");

    const businesses = await businessRepository.findById(businessId);
    if(!businesses) throw new Error("Estabelecimento não cadastrado");
    if (businesses.type !== card.type) throw new Error("Tipo de cartão não usual neste estabelecimento");

    const balance = await totalBalance(cardId)
    if((balance - amount) < 0) throw new Error("Saldo Indisponível");

    const paymentData = {cardId, businessId, amount};
    await paymentRepository.insert( paymentData );
}