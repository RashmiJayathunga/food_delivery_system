import express from "express";
import { addToCart, getCart, removeCartItem } from "../controllers/cart.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.delete("/:foodId", verifyToken, removeCartItem);

export default router;
