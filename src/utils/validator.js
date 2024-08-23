import { body, checkSchema } from "express-validator";

const emailChain = () =>
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail();

const passwordChain = () =>
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be of atleast 8 characters ")
    .matches(/\d/)
    .withMessage("Password must have atleast one number");

const validateSchema = () => {
  return checkSchema({
    email: {
      notEmpty: { errorMessage: "email is required" },
      isEmail: { errorMessage: "Invalid email format" },
    },
    password: {
      notEmpty: { errorMessage: "password is required" },
      isLength: {
        options: { min: 8 },
        errorMessage: "Password must be of atleast 8 characters",
      },
      matches: {
        options: /\d/,
        errorMessage: "Password must contain at least one digit",
      },
    },
    username: { notEmpty: { errorMessage: "Username is required" } },
    address: { notEmpty: { errorMessage: "address is required" } },
  });
};
export { emailChain, passwordChain, validateSchema };
