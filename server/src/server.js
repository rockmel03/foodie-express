import "./config/env.js";
import http from "http";
import app from "./app.js";
import { connectDB } from "./db/index.js";
import logger from "./config/logger.js";

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    logger.error("Mongoose connection error", error);
    process.exit(1);
  });
