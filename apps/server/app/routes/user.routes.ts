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
 */

import express = require('express')
// import { validate } from '../middleware/validate.dto';
// import { registerDTO } from '../dtos/user.controller.dto';
import { register } from '../controllers/user.controller';
import { validate } from '../middleware/validate.dto';
import { registerDTO } from '../dtos';
const router = express.Router()
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

module.exports = router