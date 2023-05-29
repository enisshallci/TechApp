import express from "express";
import { createWishlistController, getUserWishlists, deleteProductFromWishlist } from "../controllers/wishlistController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/',requireSignIn, createWishlistController);

router.get('/get-wishlist',requireSignIn, getUserWishlists);

router.delete('/:wishlistId/:productId', requireSignIn, deleteProductFromWishlist);





export default router;
