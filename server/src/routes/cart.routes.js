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

const addToCartSchemas = {
  body: z.object({
    foodId: z.string(),
    quantity: z.number().default(1),
  }),
};

const updateCartItemSchema = {
  params: z.object({
    foodId: z.string(),
  }),
  body: z.object({
    quantity: z.number(),
  }),
};

const deleteCartItemSchema = {
  params: z.object({
    foodId: z.string(),
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
