import express from "express";
import {
  loginValidator,
  registerValidator,
  updateUserValidator,
} from "../middlewares/joiValidation.js";
import {
  deleteUserController,
  forgotPassword,
  getStudentDetails,
  getUserDetail,
  getUsersDetail,
  login,
  register,
  renewJwt,
  updateUserController,
} from "../controllers/authControllers.js";
import { authenticate, isAdmin, refreshAuthenticate } from "../middlewares/authMiddleware.js";
import { upload } from "../config/multerConfig.js";


const router = express.Router();

// login api
// loginValidator to validate login request payload
router.post("/login", loginValidator, login);

// register api
router.post("/register", registerValidator, register);

// forgot password
router.post("/forgot-password", forgotPassword)

// get logged in user data
router.get("/", authenticate, getUserDetail);

// edit profile
router.put("/edit-profile", authenticate, upload.single('profilePic'), updateUserValidator, updateUserController)

// get all the student's user data 
router.get("/students", authenticate, isAdmin, getStudentDetails)

// get all the users data 
router.get("/users", authenticate, getUsersDetail)

// renew jwt
router.get("/renew-jwt", refreshAuthenticate, renewJwt)

// delete the student user
router.delete("/delete-user", authenticate, isAdmin, deleteUserController)

export default router;
