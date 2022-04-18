import * as cardRepository from '../repositories/cardRepository.js'
import dayjs from 'dayjs';

async function validateCard(cardId:number) {

    const card = await cardRepository.findById(cardId);
    if (!card) throw new Error("Cartão não encontrado");    
    if (dayjs().format('MM/YY') > card.expirationDate) throw Error("Cartão expirado");
    
    return card;
}

export default validateCard;