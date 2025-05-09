
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    profilePic: {
      type: String,
      default: "/profilePics/profile.png",
    },
    password: {
      type: String,
      required: true,
    },
    refreshJWT: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
