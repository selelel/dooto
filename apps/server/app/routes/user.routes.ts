/**
 * @swagger
 * components:
 *   schemas:
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
 *
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
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
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       400:
 *         description: Validation error
 *
 * /users/signin/password:
 *   post:
 *     summary: Sign in a user with username/email and password
 *     tags:
 *       - Users
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

import express = require('express')
// import { validate } from '../middleware/validate.dto';
// import { registerDTO } from '../dtos/user.controller.dto';
import { register } from '../controllers/user.controller';
import { validate } from '../middleware/validate.dto';
import { registerDTO } from '../dtos';
import { signinDTO } from '../dtos/user.controller.dto';
const router = express.Router()
const passportLocal = require('../config/passport-local').passportLocal;
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

module.exports = router