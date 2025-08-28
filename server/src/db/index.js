import mongoose from "mongoose";
import logger from "../config/logger.js";

export async function connectDB() {
  try {
    logger.info("connecting to mongodb...");
    const connection = await mongoose.connect(process.env.MONGO_URI);
    logger.info("Mongoose connected");
    logger.info("Mongodb connected to host: " + connection.connection.host);
  } catch (error) {
    logger.error("Mongoose connection error", error);
    process.exit(1);
  }
}
