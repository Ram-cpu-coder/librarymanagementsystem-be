import UserSchema from "./UserSchema.js";

// Create user
export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};

// read user
// get user by email address
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

// update user
export const updateUser = (filter, updatedUserObject) => {
  return UserSchema.findOneAndUpdate(filter, updatedUserObject);
};

// delete user
export const deleteUserById = (_id) => {
  return UserSchema.findByIdAndDelete(_id);
};

// getStudents
export const getStudents = () => {
  return UserSchema.find({ role: "student" })
}