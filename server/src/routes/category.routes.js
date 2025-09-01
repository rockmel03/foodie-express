import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import z from "zod";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

// validation schemas
const createCategorySchemas = {
  body: z.object({
    title: z.string().min(3).max(30),
    description: z.string().optional(),
  }),
};

const updateCategorySchemas = {
  body: z.object({
    title: z.string().min(3).max(30),
    description: z.string().optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
};

const deleteCategorySchemas = {
  params: z.object({
    id: z.string(),
  }),
};

// routes
router
  .route("/")
  .post(
    authMiddleware(["admin"]),
    validate(createCategorySchemas),
    createCategory
  )
  .get(getCategories);

router
  .route("/:id")
  .get(getCategoryById)
  .put(
    authMiddleware(["admin"]),
    validate(updateCategorySchemas),
    updateCategory
  )
  .delete(
    authMiddleware(["admin"]),
    validate(deleteCategorySchemas),
    deleteCategory
  );

export default router;
