import mongoose from "mongoose";
import Product from "../models/products.js";
import config from "../utils/config.js";

mongoose.connect(config.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    const products = [
      // 💻 DEVICES
      {
        title: "Wireless Earbuds",
        description: "Compact true wireless earbuds with immersive sound and long battery life.",
        cost: 2499,
        category: "Devices",
        image: "airpods.jpeg"
      },
      {
        title: "Smartphone Stand",
        description: "Adjustable aluminum stand for smartphones and tablets.",
        cost: 899,
        category: "Devices",
        image: "phonestand.png"
      },
      {
        title: "Bluetooth Speaker",
        description: "Portable mini speaker with deep bass and waterproof design.",
        cost: 1899,
        category: "Devices",
        image: "speaker.jpeg"
      },
      {
        title: "Mechanical Keyboard",
        description: "RGB backlit keyboard for responsive typing and gaming.",
        cost: 3299,
        category: "Devices",
        image:  "keyboard.jpeg"
      },

      // 🏠 DECORS
      {
        title: "Aromatic Candle Set",
        description: "Set of three scented candles to create a cozy atmosphere.",
        cost: 699,
        category: "Decors",
        image: "candle.png"
      },
      {
        title: "Indoor Plant Pot",
        description: "Elegant ceramic pot with a low-maintenance green plant.",
        cost: 549,
        category: "Decors",
        image: "pot.png"
      },
      {
        title: "Table Lamp",
        description: "Minimal LED lamp with soft warm light and sleek design.",
        cost: 1599,
        category: "Decors",
        image: "lamp.jpeg"
      },
      {
        title: "Wall Art Frame",
        description: "Abstract art print with premium black frame for living spaces.",
        cost: 999,
        category: "Decors",
        image: "artframe.png"
      },

      // 🎒 ACCESSORIES
      {
        title: "Leather Wallet",
        description: "Classic brown leather wallet with multiple card slots.",
        cost: 1199,
        category: "Accessories",
        image: "wallet.jpg"
      },
      {
        title: "Analog Watch",
        description: "Elegant wristwatch with a minimalist black dial and metal strap.",
        cost: 2799,
        category: "Accessories",
        image: "watch.jpg"
      },
      {
        title: "Travel Backpack",
        description: "Water-resistant backpack with multiple compartments for everyday use.",
        cost: 2299,
        category: "Accessories",
        image: "travelbag.jpeg"
      },
      {
        title: "Sunglasses",
        description: "UV-protected stylish sunglasses with a matte black finish.",
        cost: 899,
        category: "Accessories",
        image: "sunglass.png"
      }
    ];

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("✅ Products added successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.error("❌ Error seeding data:", err));
