import mongoose from "mongoose";

export const connectMongoDB = async () => {
  return await mongoose.connect(
    process.env.MONGO_URL || "mongodb://localhost:27017/lms-db"
  );
};
