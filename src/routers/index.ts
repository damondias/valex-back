import express from "express";
import cardsRouter from "./cardsRouter.js";
import paymentRouter from "./paymentsRouter.js";
import rechargesRouter from "./rechargesRouter.js";

const router = express.Router();

router.use(cardsRouter);
router.use(rechargesRouter);
router.use(paymentRouter);

export default router;