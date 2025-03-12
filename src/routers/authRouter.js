import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/joiValidation.js";
import {
  getStudentDetails,
  getUserDetail,
  login,
  register,
  renewJwt,
} from "../controllers/authControllers.js";
import { authenticate, isAdmin, refreshAuthenticate } from "../middlewares/authMiddleware.js";


const router = express.Router();

// login api
// loginValidator to validate login request payload
router.post("/login", loginValidator, login);

// register api
router.post("/register", registerValidator, register);

// get logged in user data
router.get("/", authenticate, getUserDetail);

// get all the student's user data 
router.get("/students", authenticate, isAdmin, getStudentDetails)

// renew jwt
router.get("/renew-jwt", refreshAuthenticate, renewJwt)

export default router;
