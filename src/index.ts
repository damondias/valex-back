import cors from "cors";
import dotenv from "dotenv";
import express, { json, NextFunction, Request, Response } from "express";
import router from "./routers/index.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use((error, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (error.response) {
    return res.sendStatus(error.response.status);
  }

  res.sendStatus(500);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});