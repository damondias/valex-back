import express from "express";
import cardsRouter from "./cardsRouter.js";
import rechargesRouter from "./rechargesRouter.js";

const router = express.Router();

router.use(cardsRouter);
router.use(rechargesRouter);

export default router;