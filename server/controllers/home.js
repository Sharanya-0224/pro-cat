import express from "express";
import Product from "../models/products.js";

const homeRouter = express.Router();

// GET /api/home → fetch all catalogue products
homeRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find({}); // fetch all 12 catalogue items
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default homeRouter;
