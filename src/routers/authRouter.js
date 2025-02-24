import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/joiValidation.js";
import {
  getUserDetail,
  login,
  register,
} from "../controllers/authControllers.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// login api
// loginValidator to validate login request payload
router.post("/login", loginValidator, login);

// register api
router.post("/register", registerValidator, register);

// get logged in user data
router.get("/", authenticate, getUserDetail);

export default router;
