import { Router } from "express";
import {
  getCart,
  deleteCart,
  addToCart,
  removeFromCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.route("/").get(getCart).delete(deleteCart);
router.post("/add-to-cart", addToCart);
router.post("/remove-from-cart", removeFromCart);

export default router;
