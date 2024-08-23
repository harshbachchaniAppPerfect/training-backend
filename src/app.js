import express, { urlencoded } from "express";
import { errHandler } from "./utils/errhandler.js";
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

import authRouter from "./routes/user.routes.js";
import transactionRouter from "./routes/transaction.routes.js";
import productRouter from "./routes/product.routes.js";

app.use("/api/auth", authRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/product", productRouter);

app.use(errHandler);
export { app };
