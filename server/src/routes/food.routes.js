import { Router } from "express";
import {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
} from "../controllers/food.controller.js";

const router = Router();

router.route("/").post(createFood).get(getFoods);
router.route("/:id").get(getFoodById).put(updateFood).delete(deleteFood);

export default router;
