import * as employeeRepository from '../repositories/employeeRepository.js';
import * as cardRepository from '../repositories/cardRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';

import { TransactionTypes } from '../repositories/cardRepository.js';
import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt";
import dayjs from 'dayjs';

import validateCard from './validateNotExperiedCard.js';
import totalBalance from './totalBalanceService.js';

export async function create(employeeId: number, type: TransactionTypes) {
    
    const employerData = await verifyEmployee(employeeId);
    const verifyAlreadHaveTypeCard = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if(verifyAlreadHaveTypeCard) throw new Error("Colaborador possui este cartão em nossos dados") ;

    const employerFullName = employerData.fullName;
    const cardholderName = cutName(employerFullName);    
    const numberCreditCard = faker.finance.creditCardNumber('mastercard');
    const expirationDate = formatExpirationDate();    
    const cvcHash = bcrypt.hashSync((faker.finance.creditCardCVV()), 10);
    
    const cardData ={
        employeeId : employeeId,
        number: numberCreditCard,
        cardholderName: cardholderName,
        securityCode: cvcHash,
        expirationDate: expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type: type
    };
    await cardRepository.insert(cardData);
    
    function cutName(fullName:string) {
        const array = fullName.split(" ");
        
        let cutName = [];
        for (let i = 0; i < array.length; i++) {
            if ( i !== array.length-1 && i !== 0 ) {
                if (array[i].length>2) {
                    cutName.push(array[i][0]);
                }
            }
        }
        const newName = array[0] +' '+ cutName+ ' ' + (array[array.length-1]);
        return newName.toUpperCase();
    }

    function formatExpirationDate() {
        const data = dayjs().format('MM/YY');
        const cut = data.split('/');
        const last = Number(cut[1]) + 5;
        const expiration = data.replace(cut[1], last as any);
        return expiration;
    }

}
    
async function verifyEmployee(employeeId: number) {
    const employerData = await employeeRepository.findById(employeeId);

    if (!employerData)
        throw new Error("Colaborador não encontrato/existente");
    return employerData;
}

export async function update(cardId: number, cvc: string, password:string) {
   
    const card = await cardRepository.findById(cardId);
 
    if (!(bcrypt.compareSync(cvc, card.securityCode)))  throw new Error("Erro no código de segurança");
    if (dayjs().format('MM/YY') > card.expirationDate) throw Error("Cartão expirado");
    if (card.password) throw Error("Cartão já ativado");
    if (password.length !== 4) throw Error("A senha precisa ter 4 digitos");

    const passwordHashed = bcrypt.hashSync(password, 10);
    const activatedCard = {
     ...card,
     password: passwordHashed
    }; 
    await cardRepository.update(cardId, activatedCard);
}

export async function balance(cardId:any) {
    const card = await validateCard(cardId);
    
    const balance = await totalBalance(cardId);
    const payments = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);    
    const statement = {
        balance:balance,
        transactions:payments,
        recharges:recharges
    }
    return statement;
}