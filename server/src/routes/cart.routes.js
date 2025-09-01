import { Router } from "express";
import {
  getCart,
  deleteCart,
  addToCart,
  removeFromCart,
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
    quantity: z.number(),
  }),
};

const removeFromCartSchemas = {
  body: z.object({
    foodId: z.string(),
    quantity: z.number(),
  }),
};

// routes
router.route("/").get(getCart).delete(deleteCart);
router.post("/add-to-cart", validate(addToCartSchemas), addToCart);
router.post(
  "/remove-from-cart",
  validate(removeFromCartSchemas),
  removeFromCart
);

export default router;
