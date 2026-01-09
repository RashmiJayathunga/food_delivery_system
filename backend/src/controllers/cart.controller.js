import Cart from "../models/Cart.js";
import jwt from "jsonwebtoken";

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // extracted from token
    const { foodId, name, price, quantity, image } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ foodId, name, price, quantity, image }] });
    } else {
      const existingItem = cart.items.find(item => item.foodId === foodId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ foodId, name, price, quantity, image });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get User Cart
export const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ userId });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { foodId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.foodId !== foodId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
