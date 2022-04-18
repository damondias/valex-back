import * as paymentRepository from '../repositories/paymentRepository.js'
import * as rechargeRepository from '../repositories/rechargeRepository.js'


async function totalBalance(id: number){
    const recharges = await rechargeRepository.findByCardId(id);
    const payments = await paymentRepository.findByCardId(id);
    
    const totalRecharge = recharges.reduce(sum, 0);
    const totalPayments = payments.reduce(sum, 0);
    const balance = totalRecharge - totalPayments;

    function sum (total, item){ return total + item.amount}

    return balance;
}

export default totalBalance;