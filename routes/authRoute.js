import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  deleteUserController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           description: Password for the user account
 *           example: mypassword123
 *         phone:
 *           type: string
 *           description: Phone number of the user
 *           example: +1234567890
 *         address:
 *           type: object
 *           description: Address of the user
 *           properties:
 *             street:
 *               type: string
 *               example: 123 Street
 *             city:
 *               type: string
 *               example: City
 *             country:
 *               type: string
 *               example: Country
 *         answer:
 *           type: string
 *           description: Security answer for the user account
 *           example: myanswer
 *         role:
 *           type: number
 *           description: Role of the user (0 for default)
 *           example: 0
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phone
 *         - address
 *         - answer
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth management
 */
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User registered successfully
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
 *                   example: User registered successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '200':
 *         description: User already registered
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
 *                   example: Already Registered, please login
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal server error
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
 *                   example: Error in Registration
 *                 error:
 *                   type: string
 *                   example: Internal server error occurred
 */

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the user account
 *                 example: mypassword123
 *     responses:
 *       '200':
 *         description: Login successful
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
 *                   example: Login Successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       '404':
 *         description: Invalid email or password
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
 *                   example: Invalid email or password
 *       '500':
 *         description: Internal server error
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
 *                   example: Error in login
 *                 error:
 *                   type: string
 *                   example: Internal server error occurred
 */
//LOGIN || POST
router.post("/login", loginController);

/**
 * @swagger
 * paths:
 *   /api/v1/auth/forgot-password:
 *     post:
 *       summary: Reset user password
 *       tags:
 *         - Auth
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Email address of the user
 *                   example: johndoe@example.com
 *                 answer:
 *                   type: string
 *                   description: Security answer for the user account
 *                   example: myanswer
 *                 newPassword:
 *                   type: string
 *                   description: New password for the user account
 *                   example: mynewpassword123
 *       responses:
 *         '200':
 *           description: Password reset successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: Password Reset Successfully
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Email is required / Answer is required / New Password is required
 *         '404':
 *           description: User not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: Wrong Email Or Answer
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: Something went wrong
 *                   error:
 *                     type: string
 *                     example: Internal server error occurred
 */
//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

/**
 * @swagger
 * /api/v1/auth/test:
 *     get:
 *       summary: Test endpoint
 *       tags:
 *         - Auth
 *       security:
 *         - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Protected Route
 *       '401':
 *         description: Unauthorized - Invalid or missing authentication token or user is not an admin
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
 *                   example: UnAuthorized Access
 *       '500':
 *         description: Internal server error
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
 *                   example: Error in admin middleware
 * security:
 *   - BearerAuth: []
 */
//test routes
router.get("/test", requireSignIn, isAdmin, testController);

/**
 * @swagger
 * paths:
 *   /api/v1/auth/user-auth:
 *     get:
 *       summary: Verify user authentication
 *       tags:
 *         - Auth
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: User authenticated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                     example: true
 *         '401':
 *           description: Unauthorized - Invalid or missing authentication token
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Unauthorized
 *                   error:
 *                     type: string
 *                     example: Invalid or missing authentication token
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Something went wrong
 *                   error:
 *                     type: string
 *                     example: Internal server error occurred
 * security:
 *   - BearerAuth: []
 */

//protected User route-auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

/**
 * @swagger
 * paths:
 *   /api/v1/auth/admin-auth:
 *     get:
 *       summary: Protected Admin Route - Authentication Required
 *       tags:
 *         - Auth
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: Admin authenticated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                     example: true
 *         '401':
 *           description: Unauthorized - Invalid or missing authentication token, or user is not an admin
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Unauthorized
 *                   error:
 *                     type: string
 *                     example: Invalid or missing authentication token, or user is not an admin
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Something went wrong
 *                   error:
 *                     type: string
 *                     example: Internal server error occurred
 * security:
 *   - BearerAuth: []
 */

//protected Admin route-auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

/**
 * @swagger
 * paths:
 *   /api/v1/auth/profile:
 *     put:
 *       summary: Update Profile
 *       tags:
 *         - Auth
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         description: Profile data to be updated
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 address:
 *                   type: string
 *                 phone:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Profile updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: Profile Updated Successfully
 *                   updatedUser:
 *                     $ref: '#/components/schemas/User'
 *         '400':
 *           description: Bad request - Error while updating profile
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: Error while updating profile
 *                   error:
 *                     type: object
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Something went wrong
 *                   error:
 *                     type: string
 *                     example: Internal server error occurred
 * security:
 *   - BearerAuth: []
 */
//update profile
router.put("/profile", requireSignIn, updateProfileController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the order.
 *           example: 60bfe4c3db532d001f5e052a
 *         products:
 *           type: array
 *           description: The products included in the order.
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         payment:
 *           type: object
 *           description: The payment details of the order.
 *           example: {}
 *         buyer:
 *           type: object
 *           description: The buyer associated with the order.
 *           properties:
 *             _id:
 *               type: string
 *               description: The ID of the buyer.
 *               example: 60bfe4c3db532d001f5e052b
 *             name:
 *               type: string
 *               description: The name of the buyer.
 *               example: John Doe
 *         status:
 *           type: string
 *           description: The status of the order.
 *           enum:
 *             - Not Process
 *             - Processing
 *             - Shipped
 *             - delivered
 *             - cancel
 *           default: Not Process
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was created.
 *           example: '2023-06-03T12:34:56Z'
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was last updated.
 *           example: '2023-06-03T13:45:21Z'
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The unique ID of the product
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
 *           type: string
 *           description: The ID of the category associated with the product
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
 * paths:
 *   /api/v1/auth/orders:
 *     get:
 *       summary: Get User Orders
 *       tags:
 *         - Auth
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Order'
 *         '401':
 *           description: Unauthorized - Invalid token or token not provided
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: Unauthorized Access
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: Error while getting orders
 *                   error:
 *                     type: object
 * security:
 *   - BearerAuth: []
 */
//orders
router.get("/orders", requireSignIn, getOrdersController);

/**
 * @swagger
 * /api/v1/auth/all-orders:
 *   get:
 *     summary: Get all orders (Admin access)
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
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
 *         description: Error while getting orders
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
 *                   example: Error while getting orders
 *                 error:
 *                   type: object
 *                   description: The error details
 * security:
 *   - BearerAuth: []
 */
//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

/**
 * @swagger
 * /api/v1/auth/order-status/{orderId}:
 *   put:
 *     summary: Update order status (Admin access)
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         description: The ID of the order to update
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *           required:
 *             - status
 *         description: The new status for the order
 *     responses:
 *       '200':
 *         description: The updated order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
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
 *         description: Error while updating order status
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
 *                   example: Error while updating order status
 *                 error:
 *                   type: object
 *                   description: The error details
 * security:
 *   - BearerAuth: []
 */


// delete user
router.delete('/delete-user/:userId', deleteUserController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
