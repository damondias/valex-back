import { Router } from "express";
import cardsRouter from "./cardRouter.js";

const router = Router();

router.use(cardsRouter);

export default router;