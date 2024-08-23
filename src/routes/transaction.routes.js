import { Router } from "express";
import {
  doTransaction,
  getAllTransactions,
  getAllTransactionsByProduct,
  getUserTransactions,
} from "../controllers/transaction.controller.js";

const router = Router();

router.route("/create/:userId").post(doTransaction);
router.route("/products").get(getAllTransactionsByProduct);
router.route("/:userId").get(getUserTransactions);
router.route("/").get(getAllTransactions);
export default router;
