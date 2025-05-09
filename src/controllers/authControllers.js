import { v4 as uuidv4 } from "uuid";
import { deleteOTP, findOTPByAssociate, insertOTP, insertRegisterToken } from "../models/sessions/sessionSchema.js";
import { createNewUser, deleteUserById, getStudents, getUserByEmail, getUsersModel, updateUser } from "../models/users/UserModel.js";
import { sendOTP, userActivationEmail } from "../services/emailServices.js";
import { compareText, encryptText } from "../utils/bcrypt.js";
import { jwtSign, refreshJwtSign } from "../utils/jwt.js";


export const login = async (req, res, next) => {
  try {
    console.log("login")
    const { email, password } = req.body;
    console.log(email, password)

    // const userData = await User.findOne({ email });
    const userData = await getUserByEmail(email);

    if (!userData.isVerified === true) {
      return next({
        statusCode: 401,
        message: "Verify your Account please!"
      })
    }
    if (!userData) {
      return res.status(401).json({
        status: "error",
        message: "User not Found!"
      })
    }
    if (userData && userData.isVerified === true) {
      // compare plain password and encrypted password
      const loginSuccess = await compareText(password, userData.password);

      const tokenData = {
        email: userData.email,
      };
      // token and refreshJwtToken
      const token = await jwtSign(tokenData);
      console.log(token, "token")
      const refreshToken = await refreshJwtSign(tokenData)

      // save the refresh token in the user data 
      const data = await updateUser(
        { email: userData.email },
        { refreshJWT: refreshToken }
      )

      if (loginSuccess) {
        return res.status(200).json({
          status: "success",
          message: "Login Successful",
          accessToken: token,
          refreshToken: refreshToken,
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
    console.log(error)
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
      profilePic: "./assets/Profile.png"
    });
    if (!data._id) {
      return res.status(400).json({
        status: "error",
        message: "Email sending failed! Registration aborted!"
      });
    }
    const session = await insertRegisterToken({
      token: uuidv4(),
      associate: data.email
    })
    if (!session._id) {
      return res.status(400).json({
        status: "error",
        message: "Email sending failed! Registration aborted!"
      });
    } else {
      const url = `${process.env.ROOT_URL}/verify-user?sessionId=${session._id}&t=${session.token}`

      const userActivation = await userActivationEmail({
        email: data.email,
        userName: data.fName,
        url
      })
    }

    return res.status(201).json({
      status: "success",
      message: "Registered Successfully! Please check your mail for the verification Link!",
      data,
    });
  } catch (error) {
    console.log(error.message);
    next({
      statusCode: 400,
      message: error?.message,
    });
  }
};

export const getUserDetail = async (req, res, next) => {

  try {
    req.userData.password = "";

    // Ensure userData exists
    if (!req.userData) {
      return res.status(400).json({
        status: "error",
        message: "User not found",
      });
    }
    return res.json({
      status: "success",
      message: "User Detail",
      user: req.userData,
    });
  } catch (error) {
    return next({
      statusCode: 500,
      message: error.message,
    })
  }
};

export const getStudentDetails = async (req, res, next) => {
  try {
    const data = await getStudents()
    if (data) {
      return res.status(200).json({
        status: "success",
        message: "Students List Fetched",
        users: data
      })
    }
    next()
    //  : res.status(401).json({
    //   status: "error",
    //   message: "No students found"
    // })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "error",
      message: "Internal error"
    })

  }
}

export const getUsersDetail = async (req, res, next) => {
  try {
    const data = await getUsersModel()

    if (data) {
      return res.status(200).json({
        status: "success",
        message: "Fetched",
        data
      })
    }
  } catch (error) {
    return res.status(200).json({
      status: "success",
      message: "Token Refreshed",
      accessToken: token
    })
  }
}

export const renewJwt = async (req, res, next) => {
  // recreate the access token 
  const tokenData = {
    email: req.userData.email,
  };
  const token = await jwtSign(tokenData)

  return res.status(200).json({
    status: "success",
    message: "Token Refreshed",
    accessJWT: token
  })
}

export const updateUserController = async (req, res, next) => {
  try {
    req.body.profilePic = "/profilePic/" + req.file.filename
    const userId = req.userData._id;
    const updateObj = req.body

    const data = await updateUser(userId, updateObj)
    if (data) {
      return res.status(200).json({
        status: "success",
        message: "Updated Successfully!",
        data
      })
    }
  } catch (error) {
    next({
      statusCode: 400,
      message: error?.message,
    });
  }
}

export const deleteUserController = async (req, res, next) => {
  try {
    const { _id } = req.body
    const data = await deleteUserById(_id)
    if (data) {
      return res.status(200).json({
        status: "success",
        message: "User Deleted !",
        data
      })
    }
  } catch (error) {
    console.log(error)
    next({
      statusCode: 400,
      message: error?.message,
    });
  }
}