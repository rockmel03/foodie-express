import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(cookieParser());

// routes import
import healthCheckRouter from "./routes/healthCheck.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1", healthCheckRouter);
app.use("/api/v1/users", userRouter);

export default app;
