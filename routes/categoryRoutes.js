import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  getCategoriesController,
  singleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the category
 *           example: 60b6b53c9e4e8b001fcc1c9d
 *         name:
 *           type: string
 *           description: The name of the category
 *           example: Electronics
 *         slug:
 *           type: string
 *           description: The slug of the category
 *           example: electronics
 *       required:
 *         - name
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */
/**
 * @swagger
 * /api/v1/category/create-category:
 *   post:
 *     summary: Create a new category (Admin access)
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '201':
 *         description: New category created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: new category created
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       '200':
 *         description: Category already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Category Already Exists
 *       '401':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized Access
 *       '500':
 *         description: Error while creating category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error while creating category
 *                 error:
 *                   type: object
 *                   description: The error details
 * security:
 *   - BearerAuth: []
 */
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

/**
 * @swagger
 *
 * /api/v1/category/update-category/{id}:
 *   put:
 *     summary: Update category
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *           required:
 *             - name
 *         description: The updated name for the category
 *     responses:
 *       '200':
 *         description: The updated category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '500':
 *         description: Error while updating category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   description: The error details
 *                 message:
 *                   type: string
 *                   example: Error while updating category
 * security:
 *   - BearerAuth: []
 */
//update category
router.put("/update-category/:id", requireSignIn, updateCategoryController);

/**
 * @swagger
 *
 * /api/v1/category/get-category:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Category
 *     responses:
 *       '200':
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: All Categories List
 *                 category:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       '500':
 *         description: Error while getting all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   description: The error details
 *                 message:
 *                   type: string
 *                   example: Error while getting all categories
 */
//get all categories

router.get("/get-category", getCategoriesController);

/**
 * @swagger
 *
 * /api/v1/category/single-category/{slug}:
 *   get:
 *     summary: Get a single category by slug
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         description: The slug of the category to retrieve
 *     responses:
 *       '200':
 *         description: Single category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Get Single Category Successfully
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       '500':
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   description: The error details
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 */

// get single category
router.get("/single-category/:slug", singleCategoryController);

/**
 * @swagger
 *
 * /api/v1/category/delete-category/{id}:
 *   delete:
 *     summary: Delete a category by ID (Admin access)
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the category to delete
 *     responses:
 *       '200':
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category Deleted Successfully
 *       '500':
 *         description: Error while deleting category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error while deleting category
 *                 error:
 *                   type: object
 *                   description: The error details
 * security:
 *   - BearerAuth: []
 */
//delete category
router.delete("/delete-category/:id", requireSignIn, deleteCategoryController);

export default router;
