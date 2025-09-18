import { Router } from "express";
import {
  getCart,
  deleteCart,
  addToCart,
  deleteCartItem,
  updateCartItem,
} from "../controllers/cart.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import z from "zod";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.use(authMiddleware(["user"]));

// validation schemas

const numberSchema = z
  .string()
  .refine((val) => !isNaN(parseFloat(val)), {
    path: "price",
    message: "Invalid input: expected number, received string",
  })
  .transform((val) => parseFloat(val));

const addToCartSchemas = {
  body: z.object({
    foodId: z.string(),
    quantity: numberSchema,
  }),
};

const updateCartItemSchema = {
  params: z.object({
    foodId: z.string(),
  }),
  body: z.object({
    quantity: numberSchema.optional(),
  }),
};

const deleteCartItemSchema = {
  params: z.object({
    foodId: z.string,
  }),
  body: z.object({
    quantity: numberSchema,
  }),
};

// routes
router.route("/").get(getCart).delete(deleteCart);
router.route("/items").post(validate(addToCartSchemas), addToCart); // add new item to cart
router
  .route("/items/:foodId")
  .patch(validate(updateCartItemSchema), updateCartItem)
  .delete(validate(deleteCartItemSchema), deleteCartItem);

export default router;
