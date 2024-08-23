import { validationResult, matchedData } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import bcrypt from "bcrypt";
import { createUser, getUser } from "../queries/user.query.js";
import { getProducts } from "../queries/product.query.js";

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ApiError(400, result.array()[0].msg));
    }
    const data = matchedData(req);
    const email = data.email;
    const password = data.password;
    const username = data.username;
    const address = data.address;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser([email, hashedPassword, username, address]);
    return res
      .status(201)
      .json(new ApiResponse(201, user.data, "User created Successfully"));
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

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ApiError(400, result.array()[0].msg));
    }
    const data = matchedData(req);
    const email = data.email;
    const password = data.password;
    const user = await getUser([email]);
    if (user.length == 0)
      return next(new ApiError(400, "User not exists Please register First"));
    const myuser = user[0];

    const isValidPassword = await bcrypt.compare(
      password,
      myuser.user_password
    );
    if (!isValidPassword)
      return next(new ApiError(400, "Credentails Not Matched"));
    return res
      .status(200)
      .json(new ApiResponse(200, myuser, "User logged in Successfully"));
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

const getAllProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await getProducts();
    return res
      .status(200)
      .json(new ApiResponse(200, products, `Products Fetched Successfully`));
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
export { loginUser, registerUser, getAllProducts };
