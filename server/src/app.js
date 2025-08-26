import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(cookieParser());

// routes import
import healthCheckRouter from "./routes/healthCheck.routes.js";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import foodRouter from "./routes/food.routes.js";
import cartRouter from "./routes/cart.routes.js";

app.use("/api/v1", healthCheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/foods", foodRouter);
app.use("/api/v1/carts", cartRouter);

// global error handler
app.use(errorHandler);

export default app;
