import express from "express";
<<<<<<< Updated upstream
import { createWishlistController, getUserWishlists, deleteProductFromWishlist } from "../controllers/wishlistController.js";
=======
import {
  createWishlistController,
  getUserWishlists,
  deleteProductFromWishlist,
  getAllWishlists,
} from "../controllers/wishlistController.js";
>>>>>>> Stashed changes
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/',requireSignIn, createWishlistController);

router.get('/get-wishlist',requireSignIn, getUserWishlists);

router.delete('/:wishlistId/:productId', requireSignIn, deleteProductFromWishlist);




<<<<<<< Updated upstream
=======
/**
 * @swagger
 * /api/v1/wishlist/{wishlistId}/{productId}:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags:
 *       - Wishlist
 *     parameters:
 *       - in: path
 *         name: wishlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the wishlist
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to remove from the wishlist
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Wishlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Failed to remove product from wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete(
  "/:wishlistId/:productId",
  requireSignIn,
  deleteProductFromWishlist
);
router.get('/allwishlist', getAllWishlists)
>>>>>>> Stashed changes

export default router;
