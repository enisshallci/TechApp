import express from "express";
import {
  createWishlistController,
  getUserWishlists,
  deleteProductFromWishlist,
  getAllWishlists,
} from "../controllers/wishlistController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique ID of the wishlist
 *         user:
 *           type: string
 *           description: The ID of the user associated with the wishlist
 *         products:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of product IDs in the wishlist
 *       required:
 *         - user
 */

/**
 * @swagger
 * /api/v1/wishlist/:
 *   post:
 *     summary: Create a wishlist
 *     description: Creates a wishlist for the authenticated user.
 *     tags:
 *       - Wishlist
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of product IDs to be added to the wishlist
 *             example:
 *               products: ["6473dfcbffd1ab4835017e76/646f8d2e2c02e97c427bbbd0"]
 *     responses:
 *       '201':
 *         description: Wishlist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       '500':
 *         description: Failed to create wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the failure
 * security:
 *   - BearerAuth: []
 */
router.post("/", requireSignIn, createWishlistController);

/**
 * @swagger
 * /api/v1/wishlist/get-wishlist:
 *   get:
 *     summary: Get user wishlists
 *     tags:
 *       - Wishlist
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wishlist'
 *       500:
 *         description: Failed to get user wishlists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/get-wishlist", requireSignIn, getUserWishlists);

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

router.get("/allwishlist", getAllWishlists);
export default router;
