import { ApiError } from "./apierror.js";

const errHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  }
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
    statusCode: 500,
  });
};

export { errHandler };
