import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'users',
    required: true,
  },
  products: [{
    type: mongoose.ObjectId,
    ref: 'Products',
  }],
});

export default mongoose.model("Wishlist", wishlistSchema);
