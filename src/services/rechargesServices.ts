import * as rechargeRepository from '../repositories/rechargeRepository.js'
import { RechargeInsertData } from '../repositories/rechargeRepository.js';
import validateCard from './validateNotExperiedCard.js';

export async function rechargeCard(cardId:number, amount:number) {

    if(amount < 0 || amount === 0) throw new Error("Valor precisa ser positivo");
    const card = await validateCard(cardId);

    const rechargeData : RechargeInsertData = {cardId, amount};
    await rechargeRepository.insert(rechargeData);
    
}