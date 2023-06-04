import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productListController,
  productCountController,
  productFiltersController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController,
} from "../controllers/productController.js";
import {
  createProductReview,
  countProductReview,
  getReviewsController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique ID of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         slug:
 *           type: string
 *           description: The slug of the category
 *       required:
 *         - _id
 *         - name
 *         - slug
 *
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique ID of the product
 *         productId:
 *           type: string
 *           description: The product ID
 *         name:
 *           type: string
 *           description: The name of the product
 *         slug:
 *           type: string
 *           description: The slug of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         category:
 *           $ref: '#/components/schemas/Category'
 *           description: The category associated with the product
 *         quantity:
 *           type: number
 *           description: The quantity of the product
 *         photo:
 *           type: object
 *           properties:
 *             data:
 *               type: string
 *               format: binary
 *               description: The binary data of the product photo
 *             contentType:
 *               type: string
 *               description: The content type of the product photo
 *         shipping:
 *           type: boolean
 *           description: The shipping status of the product
 *       required:
 *         - _id
 *         - productId
 *         - name
 *         - slug
 *         - description
 *         - price
 *         - category
 *         - quantity
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the review
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: The rating of the review (between 1 and 5)
 *         comment:
 *           type: string
 *           description: The comment of the review
 *         product:
 *           type: string
 *           description: The ID of the product associated with the review
 *       required:
 *         - rating
 *         - comment
 *         - product
 */
/**
 * @swagger
 * /api/v1/products/review:
 *   post:
 *     summary: Create a product review (User access)
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *               product:
 *                 type: string
 *             required:
 *               - rating
 *               - comment
 *               - product
 *     responses:
 *       '201':
 *         description: Review created successfully
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
 *                   example: Review Created Successfully
 *                 reviews:
 *                   $ref: '#/components/schemas/Review'
 *       '500':
 *         description: Error in reviewing product
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
 *                   example: Error in reviewing product
 * security:
 *   - BearerAuth: []
 */
router.post("/review", requireSignIn, createProductReview);

/**
 * @swagger
 *
 * /api/v1/products/review/{productId}/count:
 *   get:
 *     summary: Get the count of reviews for a product
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: The count of reviews for the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 10
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
 *         description: Error while getting the count of reviews
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
 *                   example: Something went wrong
 * security:
 *   - BearerAuth: []
 */
router.get("/review/:productId/count", requireSignIn, countProductReview);

/**
 * @swagger
 * /api/v1/products/get-reviews:
 *   get:
 *     summary: Get all reviews
 *     tags:
 *       - Product
 *     responses:
 *       '200':
 *         description: The list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 countTotal:
 *                   type: number
 *                   example: 5
 *                 message:
 *                   type: string
 *                   example: All Reviews
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *       '500':
 *         description: Error while getting reviews
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
 *                   example: Error in getting reviews
 *                 error:
 *                   type: string
 *                   example: Error message
 *
 */
router.get("/get-reviews", getReviewsController);

/**
 * @swagger
 *
 * /api/v1/products/create-product:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               quantity:
 *                 type: number
 *               shipping:
 *                 type: boolean
 *               photo:
 *                 type: file
 *     responses:
 *       '201':
 *         description: The created product
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
 *                   example: Product Created Successfully
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       '401':
 *         description: Unauthorized access or not an admin
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
 *         description: Error while creating the product
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
 *                   example: Error in creating product
 */
//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

/**
 * @swagger
 *
 * /api/v1/products/update-product/{pid}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               quantity:
 *                 type: number
 *               shipping:
 *                 type: boolean
 *               photo:
 *                 type: file
 *     responses:
 *       '201':
 *         description: The updated product
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
 *                   example: Product Updated Successfully
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       '401':
 *         description: Unauthorized access or not an admin
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
 *         description: Error while updating the product
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
 *                   example: Error in Update Product
 */

//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

/**
 * @swagger
 *
 * /api/v1/products/get-product:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Product
 *     responses:
 *       '200':
 *         description: All products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 counTotal:
 *                   type: number
 *                   example: 10
 *                 message:
 *                   type: string
 *                   example: AllProducts
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Error while getting products
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
 *                   example: Error in getting products
 *                 error:
 *                   type: string
 *                   example: Something went wrong
 */

//get products
router.get("/get-product", getProductController);

/**
 * @swagger
 *
 * /api/v1/products/get-product/{slug}:
 *   get:
 *     summary: Get a single product by slug
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         description: The slug of the product
 *     responses:
 *       '200':
 *         description: The single product
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
 *                   example: Single Product Fetched
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Error while getting the single product
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
 *                   example: Error while getting single product
 *                 error:
 *                   type: string
 *                   example: Something went wrong
 */
//single product
router.get("/get-product/:slug", getSingleProductController);

/**
 * @swagger
 * /api/v1/products/product-photo/{pid}:
 *   get:
 *     summary: Get product photo by ID
 *     description: Retrieves the photo of a product based on its ID.
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: pid
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       '400':
 *         description: Invalid product ID
 *       '500':
 *         description: Error while getting photo
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
 *                   example: Error while getting photo
 *                 error:
 *                   type: object
 *                   example: {}
 */

//get photo
router.get("/product-photo/:pid", productPhotoController);

/**
 * @swagger
 * /api/v1/products/delete-product/{pid}:
 *   delete:
 *     summary: Delete product by ID
 *     description: Deletes a product based on its ID.
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: pid
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product deleted successfully
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
 *                   example: Product deleted successfully
 *       '500':
 *         description: Error while deleting product
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
 *                   example: Error while deleting product
 *                 error:
 *                   type: object
 *                   example: {}
 */
//delete product
router.delete("/delete-product/:pid", deleteProductController);

/**
 * @swagger
 * /api/v1/products/product-filters:
 *   post:
 *     summary: Filter products
 *     description: Filters products based on the provided criteria.
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               checked:
 *                 type: array
 *                 items:
 *                   type: string
 *               radio:
 *                 type: array
 *                 items:
 *                   type: number
 *             example:
 *               checked: ["64665492f476964df57d8a1d"]
 *               radio: [10, 100]
 *     responses:
 *       '200':
 *         description: Successfully filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Error while filtering products
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
 *                   example: Error while filtering products
 *                 error:
 *                   type: object
 *                   example: {}
 */
//filter product
router.post("/product-filters", productFiltersController);

/**
 * @swagger
 * /api/v1/products/product-count:
 *   get:
 *     summary: Get product count
 *     description: Retrieves the count of products.
 *     tags:
 *       - Product
 *     responses:
 *       '200':
 *         description: Successfully retrieved product count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: number
 *                   example: 10
 *       '400':
 *         description: Error in product count
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
 *                   example: Error in product count
 *                 error:
 *                   type: object
 *                   example: {}
 */
//product count
router.get("/product-count", productCountController);

/**
 * @swagger
 * /api/v1/products/product-list/{page}:
 *   get:
 *     summary: Get a list of products
 *     description: Retrieves a paginated list of products.
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: page
 *         description: The page number
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved product list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Error in per page control
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
 *                   example: error in per page control
 *                 error:
 *                   type: object
 *                   example: {}
 */
//product per page
router.get("/product-list/:page", productListController);

/**
 * @swagger
 * /api/v1/products/search/{keyword}:
 *   get:
 *     summary: Search for products
 *     description: Retrieves products based on the provided keyword.
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: keyword
 *         description: The keyword to search for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Error in search product API
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
 *                   example: Error In Search Product API
 *                 error:
 *                   type: object
 *                   example: {}
 */
//search product
router.get("/search/:keyword", searchProductController);

/**
 * @swagger
 * /api/v1/products/related-product/{pid}/{cid}:
 *   get:
 *     summary: Get related products
 *     description: Retrieves related products based on the provided product ID and category ID.
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: The ID of the main product
 *         schema:
 *           type: string
 *       - in: path
 *         name: cid
 *         required: true
 *         description: The ID of the category associated with the main product
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved related products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Error while getting related products
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
 *                   example: Error while getting related product
 *                 error:
 *                   type: object
 *                   example: {}
 */
//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

/**
 * @swagger
 * /api/v1/products/product-category/{slug}:
 *   get:
 *     summary: Get products by category
 *     description: Retrieves products based on the provided category slug.
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The slug of the category
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved products by category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Error while getting products
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
 *                   example: {}
 *                 message:
 *                   type: string
 *                   example: Error while getting products
 */
//category wise product
router.get("/product-category/:slug", productCategoryController);

/**
 * @swagger
 * /api/v1/products/braintree/token:
 *   get:
 *     summary: Get Braintree client token
 *     description: Retrieves the Braintree client token for initializing client-side payment integration.
 *     tags:
 *       - Product
 *     responses:
 *       '200':
 *         description: Successfully retrieved Braintree client token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '500':
 *         description: Error while generating Braintree client token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

/**
 * @swagger
 * /api/v1/products/braintree/payment:
 *   post:
 *     summary: Make a Braintree payment
 *     description: Makes a payment using the Braintree payment gateway.
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nonce:
 *                 type: string
 *                 description: The payment nonce generated by the client
 *               cart:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     price:
 *                       type: number
 *                       description: The price of the item
 *             example:
 *               nonce: "payment-nonce"
 *               cart: [{ price: 1000.99 }]
 *     responses:
 *       '200':
 *         description: Payment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Indicates the success of the payment
 *       '500':
 *         description: Error while processing the payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 * security:
 *   - BearerAuth: []
 */
//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
