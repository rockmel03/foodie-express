import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
} from "../controllers/food.controller.js";
import z from "zod";
import { validate } from "../middlewares/validate.middleware.js";
import upload, { handleMulterError } from "../middlewares/multer.middleware.js";

const router = Router();

// validation schemas
const numberSchema = z
  .string()
  .refine((val) => !isNaN(parseFloat(val)), {
    path: "price",
    message: "Invalid input: expected number, received string",
  })
  .transform((val) => parseFloat(val));

const createFoodSchemas = {
  body: z.object({
    title: z.string().min(3).max(30),
    description: z.string().optional(),
    price: numberSchema,
    discount: numberSchema.optional(),
    categoryId: z.string(),
  }),
};

const updateFoodSchemas = {
  body: z.object({
    title: z.string().min(3).max(30).optional(),
    description: z.string().optional(),
    price: numberSchema.optional(),
    discount: numberSchema.optional(),
    categoryId: z.string().optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
};

const deleteFoodSchemas = {
  params: z.object({
    id: z.string(),
  }),
};

// routes
router
  .route("/")
  .post(
    authMiddleware(["admin"]),
    upload.single("image"),
    handleMulterError,
    validate(createFoodSchemas),
    createFood
  )
  .get(getFoods);
router
  .route("/:id")
  .get(getFoodById)
  .patch(
    authMiddleware(["admin"]),
    upload.single("image"),
    handleMulterError,
    validate(updateFoodSchemas),
    updateFood
  )
  .delete(authMiddleware(["admin"]), validate(deleteFoodSchemas), deleteFood);

export default router;
