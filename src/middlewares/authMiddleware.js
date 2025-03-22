import { findToken } from "../models/sessions/sessionSchema.js";
import { getUserByEmail } from "../models/users/UserModel.js";
import { jwtVerify, refreshJwtVerify } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    // 1. get the token
    const token = req.headers.authorization;
    // 1.1 find the header token from the database
    const tokenFromDb = await findToken(token)
    // console.log("token", tokenFromDb)
    // 2. verify the token
    const decodedData = await jwtVerify(tokenFromDb.token);
    // console.log("DECODED", decodedData);

    if (decodedData?.email) {
      // 3. find the user from the decoded data
      const userData = await getUserByEmail(decodedData.email);

      if (userData) {
        //3.1 add user data to request
        req.userData = userData;

        // 4. go and do the next process
        next();
      } else {
        const errorObj = {
          statusCode: 400,
          message: "Authetication Failed!",
        };

        // next(errorObj);
        return res.send({
          status: "error",
          message: "Error Authenticating",
        });
      }
    } else {
      const errorObj = {
        statusCode: 401,
        message: "Invalid Token",
      };

      next(errorObj);
    }
  } catch (error) {
    // console.log("VERIFYJWT", error);
    const errorObj = {
      statusCode: 401,
      message: error?.message ?? "Error Validating Token"
    };

    next(errorObj);
  }
};

export const refreshAuthenticate = async (req, res, next) => {
  try {
    // 1. get the token
    const token = req.headers.authorization;

    // 2. verify the token
    const decodedData = await refreshJwtVerify(token);
    // console.log("DECODED", decodedData);

    if (decodedData?.email) {
      // 3. find the user from the decoded data
      const userData = await getUserByEmail(decodedData.email);
      // extra check  if the userdata exists and check if the token is available in the database
      if (userData && userData.refreshJWT == token) {
        //3.1 add user data to request
        req.userData = userData;

        // 4. go and do the next process
        next();
      } else {
        const errorObj = {
          statusCode: 400,
          message: "Authetication Failed!",
        };

        // next(errorObj);
        return res.send({
          status: "error",
          message: "Error Authenticating",
        });
      }
    } else {
      const errorObj = {
        statusCode: 401,
        message: "Invalid Token",
      };

      next(errorObj);
    }
  } catch (error) {
    // console.log("VERIFYJWT", error);
    const errorObj = {
      statusCode: 401,
      message: "Error Validating Token",
    };

    next(errorObj);
  }
};


export const isAdmin = async (req, res, next) => {
  req.userData.role == "admin"
    ? next()
    : next({
      status: 403,
      message: "Not authorized",
    });
};
