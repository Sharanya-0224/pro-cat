import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: String, // can later be replaced by ObjectId if you have user auth
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
