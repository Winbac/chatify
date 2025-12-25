import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) throw new Error("MONGO_URI is not set");

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully:", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to database:", error);
    process.exit(1);
  }
};
