import { createNewUser, getUserByEmail } from "../models/users/UserModel.js";
import { compareText, encryptText } from "../utils/bcrypt.js";
import { jwtSign } from "../utils/jwt.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // const userData = await User.findOne({ email });
    const userData = await getUserByEmail(email);

    if (userData) {
      // compare plain password and encrypted password
      const loginSuccess = await compareText(password, userData.password);

      const tokenData = {
        email: userData.email,
      };

      const token = await jwtSign(tokenData);

      if (loginSuccess) {
        return res.status(200).json({
          status: "success",
          message: "Login Successful",
          accessToken: token,
          user: {
            _id: userData._id,
            username: userData.username,
          },
        });
      } else {
        next({
          statusCode: 403,
          message: "Credentials not matching",
        });
      }
    } else {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Login error!",
    });
  }
};

export const register = async (req, res, next) => {
  try {
    const { fName, lName, email, phone } = req.body;
    let { password } = req.body;
    password = await encryptText(password);

    // creating
    const data = await createNewUser({
      fName,
      lName,
      email,
      password,
      phone,
    });

    return res.status(201).json({
      status: "success",
      message: "user created",
      data,
    });
  } catch (error) {
    console.log(error.message);

    next({
      statusCodE: 400,
      message: error?.message,
    });
  }
};

export const getUserDetail = async (req, res, next) => {
  req.userData.password = "";

  return res.json({
    status: "success",
    message: "User Detail",
    user: req.userData,
  });
};
