import express = require('express')
import { isAuth } from '../lib/auth';
import { validate } from '../middleware/validate.dto';
import { POSTtasksDTO } from '../dtos';
import { DELETEallTasks, DELETEtasksCollection, GETtasksCollections, POSTtasks, UPDATEtasksCollection } from '../controllers/tasks.controller';
import { PATCHtasksDTO } from '../dtos/tasks.controller.dto';
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
 *           example: Today I don't feel like doin anything
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
 *       - Tasks Collections
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
 *       - Tasks Collections
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
router.post('/', isAuth, validate(POSTtasksDTO), POSTtasks);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks collections
 *     description: |
 *       - Returns all tasks collections when no `id` is provided.
 *       - Returns a single tasks collection when `id` is provided as a query parameter.
 *     tags:
 *       - Tasks Collections
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Optional tasks collection ID
 *     responses:
 *       200:
 *         description: Tasks collection(s)
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   description: List of tasks collections
 *                   items:
 *                     type: object
 *                     additionalProperties: true
 *                 - type: object
 *                   description: Single tasks collection
 *                   additionalProperties: true
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tasks collection not found
 */
router.get('/', isAuth, GETtasksCollections);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a tasks collection
 *     description: Deletes a tasks collection by its ID.
 *     tags:
 *       - Tasks Collections
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Tasks collection ID to delete
 *     responses:
 *       200:
 *         description: Tasks collection deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tasks collection not found
 *       500:
 *         description: Failed to delete tasks collection
 */
router.delete('/:id', isAuth, DELETEtasksCollection);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update a tasks collection
 *     description: Updates the details of a tasks collection by its ID.
 *     tags:
 *       - Tasks Collections
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Tasks collection ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TasksCollectionCreateDTO'
 *     responses:
 *       200:
 *         description: Tasks collection updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tasks collection not found
 *       500:
 *         description: Failed to update tasks collection
 */
router.patch('/:id', isAuth,validate(PATCHtasksDTO), UPDATEtasksCollection);

/**
 * @swagger
 * /tasks/delete-tasks/{id}:
 *   delete:
 *     summary: Delete all tasks in a tasks collection by tasksId
 *     tags:
 *       - Tasks Collections
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the tasks collection whose tasks will be deleted
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Tasks deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Number of tasks deleted
 *                   example: 5
 *       400:
 *         description: Invalid tasksId supplied
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tasks collection not found or no tasks to delete
 *       500:
 *         description: Server error
 */
router.delete('/delete-tasks/:id', isAuth, DELETEallTasks);



module.exports = router