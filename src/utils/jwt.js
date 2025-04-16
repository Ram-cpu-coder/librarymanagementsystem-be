import jwt from "jsonwebtoken";
import { insertToken } from "../models/sessions/sessionSchema.js";

export const jwtSign = async (signData) => {
  console.log(process.env.JWT_SECRET, key)
  const token = jwt.sign(signData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
  insertToken({ token })
  return token;
};

export const jwtVerify = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};


export const refreshJwtSign = async (signData) => {
  return jwt.sign(signData, process.env.REFRESH_JWT_SECRET, {
    expiresIn: process.env.REFRESH_JWT_EXPIRESIN,
  });
};

export const refreshJwtVerify = async (token) => {
  return jwt.verify(token, process.env.REFRESH_JWT_SECRET);
};
