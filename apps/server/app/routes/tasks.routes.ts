import express = require('express')
import { isAuth } from '../lib/auth';
import { POSTtask } from '../controllers/tasks.controller';
import { validate } from '../middleware/validate.dto';
import { createTasksCollectionSchema } from '../dtos/tasks.controller.dto';
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     TasksCollectionCreateDTO:
 *       type: object
 *       required:
 *         - tasksName
 *         - details
 *       properties:
 *         tasksName:
 *           type: string
 *           description: Name of the tasks collection
 *           example: Work tasks for today
 *         details:
 *           type: string
 *           description: Detailed description of the tasks collection
 *           example: Tasks to complete before end of day
 *         due:
 *           type: string
 *           format: date-time
 *           description: Optional due date for the collection
 *           example: 2025-12-31T23:59:59.000Z
 *
 * /tasks:
 *   post:
 *     summary: Create a new tasks collection
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TasksCollectionCreateDTO'
 *     responses:
 *       201:
 *         description: Tasks collection created successfully
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

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new tasks collection
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TasksCollectionCreateDTO'
 *     responses:
 *       201:
 *         description: Tasks collection created successfully
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
router.post('/', isAuth, validate(createTasksCollectionSchema), POSTtask);

module.exports = router