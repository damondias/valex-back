import express from 'express'
import * as paymentsController from '../controllers/paymentsController.js';

const paymentRouter = express.Router();
paymentRouter.post('/payments', paymentsController.purchases);

export default paymentRouter;