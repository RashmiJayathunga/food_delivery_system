import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      foodId: { type: String, required: true }, // you can link with product id
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String },
    }
  ]
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
