import express from "express";
import { recharge } from "../controllers/rechargesController.js";
import validateCompanyMiddleware from "../middlewares/validateCompanyMiddleware.js";

const rechargesRouter = express.Router();

rechargesRouter.post('/recharges',validateCompanyMiddleware, recharge);

export default rechargesRouter;