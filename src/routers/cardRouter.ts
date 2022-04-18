import express from "express";
import validateCardTypeMiddleware from "../middlewares/validateCardTypeMiddleware.js";
import validateCompanyMiddleware from "../middlewares/validateCompanyMiddlewares.js";
import typeCardSchema from "../schemas/cardTypeSchema.js";
import * as cardsController from '../controllers/cardsController.js'


const cardsRouter = express.Router();

cardsRouter.post('/cards/create',validateCompanyMiddleware, validateCardTypeMiddleware(typeCardSchema) );
cardsRouter.post('/cards/activate', cardsController.update);
cardsRouter.get('/cards/balance/:id', cardsController.balance);

export default cardsRouter;