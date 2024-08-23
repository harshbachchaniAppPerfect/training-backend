import { asyncHandler } from "../utils/asyncHandler.js";
import { pool } from "../db/config.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { checkUserExists } from "../queries/user.query.js";
import {
  createTransaction,
  getTransactions,
  getTransactionsByProduct,
  gettransactionsordered,
} from "../queries/transaction.query.js";
import { checkProductExists } from "../queries/product.query.js";

const doTransaction = asyncHandler(async (req, res, next) => {
  const client = await pool.connect();
  try {
    const userId = req.params.userId;
    const { productId } = req.body;
    await client.query("BEGIN");
    const user = await checkUserExists([userId], client);
    if (user.length == 0)
      return next(new ApiError(400, "User with this Id do not exists"));
    const product = await checkProductExists([productId], client);
    if (product.length == 0)
      return next(new ApiError(400, "Product do not exists"));

    const transaction = await createTransaction([
      userId,
      productId,
      product[0].amount,
    ]);
    await client.query("COMMIT");
    return res
      .status(201)
      .json(
        new ApiResponse(201, transaction, "Transaction created succesfully")
      );
  } catch (error) {
    await client.query("ROLLBACK");
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "Internal Server Error",
        error.error || error
      )
    );
  } finally {
    client.release();
  }
});

const getUserTransactions = asyncHandler(async (req, res, next) => {
  try {
    console.log("HIi");
    const userId = req.params.userId;
    if (!userId) return next(new ApiError(400, "UserId is required"));
    const user = await checkUserExists([userId]);
    if (user.length == 0)
      return next(new ApiError(400, "User with this Id do not exists"));
    const transactions = await getTransactions([userId]);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          transactions,
          `Transactions of user with userId ${userId} Fetched Successfully`
        )
      );
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "Internal Server Error",
        error.error || error
      )
    );
  }
});
const getAllTransactionsByProduct = asyncHandler(async (req, res, next) => {
  try {
    const transactions = await getTransactionsByProduct();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          transactions,
          `Transactions By Products Fetched Successfully`
        )
      );
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "Internal Server Error",
        error.error || error
      )
    );
  }
});
const getAllTransactions = asyncHandler(async (req, res, next) => {
  try {
    const transactions = await gettransactionsordered();
    return res
      .status(200)
      .json(
        new ApiResponse(200, transactions, `Transactions Fetched Successfully`)
      );
  } catch (error) {
    return next(
      new ApiError(
        error.statusCode || 500,
        error.message || "Internal Server Error",
        error.error || error
      )
    );
  }
});

export {
  doTransaction,
  getUserTransactions,
  getAllTransactions,
  getAllTransactionsByProduct,
};
