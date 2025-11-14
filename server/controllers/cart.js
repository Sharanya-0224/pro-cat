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

      if (!existing) {
        cart.products.push({ productId });
      }
      // If already exists, do nothing (already in cart)
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

// Clear entire cart for user → DELETE /api/cart/:userId
cartRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await Cart.deleteOne({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a product from cart → DELETE /api/cart/:userId/:productId
cartRouter.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const before = cart.products.length;
    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    if (before === cart.products.length) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cart.save();
    const updatedCart = await cart.populate("products.productId");
    res.json(updatedCart.products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update product quantity → PATCH /api/cart/:userId/:productId
cartRouter.patch("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { action } = req.body; // "increment" | "decrement"

    if (!action || !["increment", "decrement"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const MAX_QTY = 5;
    const MIN_QTY = 1;

    if (action === "increment") {
      item.quantity = Math.min(item.quantity + 1, MAX_QTY);
    } else if (action === "decrement") {
      item.quantity = Math.max(item.quantity - 1, MIN_QTY);
    }

    await cart.save();
    const updatedCart = await cart.populate("products.productId");
    res.json(updatedCart.products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default cartRouter;
