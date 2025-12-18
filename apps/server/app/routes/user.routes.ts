/**
 * @swagger
 * components:
 *   schemas:
 *     POSTCreateCategoryDTO:
 *       type: object
 *       required:
 *         - category
 *       properties:
 *         category:
 *           type: string
 *           description: Category name
 *           example: Electronics
 *     RegisterDTO:
 *       type: object
 *       required:
 *         - name
 *         - username
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User's full name
 *           example: John Doe
 *         username:
 *           type: string
 *           description: Unique username
 *           example: johndoe123
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: john@example.com
 *         password:
 *           type: string
 *           description: User password
 *           example: strongPassword123
 *     SigninDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: john@example.com
 *         password:
 *           type: string
 *           description: User password
 *           example: strongPassword123
 */
import express = require('express')
import { GetCategory, CreateCategory, logout, register } from '../controllers/user.controller';
import { validate } from '../middleware/validate.dto';
import { registerDTO } from '../dtos';
import { POSTCreateCategoryDTO, signinDTO } from '../dtos/user.controller.dto';
import { isAuth } from '../lib/auth';

const router = express.Router()
const passportLocal = require('../config/passport-local').passportLocal;

/**
 * @swagger
 * /users/authenticated:
 *   get:
 *     summary: Check if user is authenticated
 *     description: Returns a success message if the user is authenticated
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User is authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authenticated
 *       401:
 *         description: User is not authenticated
 */
router.get('/authenticated', isAuth, (_, res) => {
  res.status(200).json({ message: 'Authenticated' }); 
});
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDTO'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *       400:
 *         description: Validation error
 */
router.post("/register", validate(registerDTO), register);

/**
 * @swagger
 * /users/signin/password:
 *   post:
 *     summary: Sign in a user with username/email and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SigninDTO'
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post('/signin/password', validate(signinDTO), passportLocal.authenticate('local', {
    successReturnToOrRedirect: '/success',
    failureRedirect: '/failure',
    failureMessage: true
}));

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out the current session
 *     tags: [Users]
 *     responses:
 *       302:
 *         description: Redirects to root after logout
 *       500:
 *         description: Logout failed
 */
router.post('/logout', isAuth, logout);

/**
 * @swagger
 * /users/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/POSTCreateCategoryDTO'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/category", isAuth, validate(POSTCreateCategoryDTO), CreateCategory);

/**
 * @swagger
 * /users/category:
 *   get:
 *     summary: Get all categories for the authenticated user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 additionalProperties: true
 *       401:
 *         description: Unauthorized
 */
router.get("/category", isAuth, GetCategory);

module.exports = router