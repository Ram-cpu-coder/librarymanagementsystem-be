import jwt from "jsonwebtoken";

export const jwtSign = async (signData) => {
  return jwt.sign(signData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

export const jwtVerify = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
