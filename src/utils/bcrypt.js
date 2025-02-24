import bcrypt from "bcryptjs";

const SALT_ROUND = 10;

export const encryptText = async (inputText) => {
  return bcrypt.hash(inputText, SALT_ROUND);
};

export const compareText = async (plaintText, encryptText) => {
  return bcrypt.compare(plaintText, encryptText);
};
