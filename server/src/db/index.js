import mongoose from "mongoose";

export async function connectDB() {
  try {
    console.log("connecting to mongodb...");
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongoose connected");
    console.log("Mongodb connected to: ", connection.connection.host);
  } catch (error) {
    console.log("Mongoose connection error", error);
    process.exit(1);
  }
}
