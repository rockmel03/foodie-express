import dotenv from "dotenv";
dotenv.config({ path: "src/.env" });

import http from "http";
import app from "./app.js";
import { connectDB } from "./db/index.js";

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.log("Mongoose connection error", error);
    process.exit(1);
  });
