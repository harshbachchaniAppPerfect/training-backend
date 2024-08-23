import { Router } from "express";
import {
  emailChain,
  passwordChain,
  validateSchema,
} from "../utils/validator.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";
const router = Router();

router.route("/login").post(emailChain(), passwordChain(), loginUser);
router.route("/register").post(validateSchema(), registerUser);

export default router;
