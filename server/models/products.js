import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
    index:true,
  },
  category: {
    type: String,
    required: true,
    index:true,
  },
  image:{
    type: String,
    required:true,
  }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
