import express from "express";
import Cart from "../models/cart.js";

const cartRouter = express.Router();

// Add a product to cart  → POST /api/cart/add
cartRouter.post("/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [{ productId }] });
    } else {
      const existing = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.products.push({ productId });
      }
    }

    await cart.save();
    res.json({ message: "Product added to cart successfully", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's cart items → GET /api/cart/:userId
cartRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) return res.json({ message: "Cart is empty", products: [] });

    res.json(cart.products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default cartRouter;
