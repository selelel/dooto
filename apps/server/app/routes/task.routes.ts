/**
 * @swagger
 * components:
 *   schemas:
 *     POSTtaskDTO:
 *       type: object
 *       required:
 *         - tasksName
 *         - details
 *         - tasksId
 *       properties:
 *         taskName:
 *           type: string
 *           example: "Buy groceries"
 *         details:
 *           type: string
 *           example: "Milk, Bread, Eggs"
 *         due:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-12-31T23:59:59.000Z"
 *         tasksId:
 *           type: string
 *           example: "a21f5ad0-8a77-4b38-87d6-fa4754267cc0"
 *         status:
 *           type: string
 *           nullable: true
 *           example: "PENDING"
 * 
 *     PATCHtaskDTO:
 *       type: object
 *       required:
 *         - tasksId
 *       properties:
 *         taskId:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         taskName:
 *           type: string
 *           nullable: true
 *           example: "Buy groceries and fruits"
 *         details:
 *           type: string
 *           nullable: true
 *           example: "Milk, Bread, Eggs, Apples"
 *         due:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-12-31T23:59:59.000Z"
 *         status:
 *           type: string
 *           nullable: true
 *           example: "PENDING"
 * 
 *     DELETEtaskDTO:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 */
import express = require('express');
import { isAuth } from '../lib/auth';
import { DELETEtask, PATCHtask, POSTtask } from '../controllers/task.controller';
import { validate } from '../middleware/validate.dto';
import { DELETEtasksDTO, PATCHtaskDTO, POSTtaskDTO } from '../dtos/tasks.controller.dto';

const router = express.Router();


/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/POSTtaskDTO'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.post('/', isAuth, validate(POSTtaskDTO), POSTtask);

/**
 * @swagger
 * /task:
 *   patch:
 *     summary: Update an existing task
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PATCHtaskDTO'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.patch('/', isAuth, validate(PATCHtaskDTO), PATCHtask);

/**
 * @swagger
 * /task:
 *   delete:
 *     summary: Delete an existing task
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.delete('/', isAuth, validate(DELETEtasksDTO), DELETEtask);

module.exports = router;