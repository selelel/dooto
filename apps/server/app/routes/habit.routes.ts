
/**
 * @swagger
 * components:
 *   schemas:
 *     POSTHabitDTO:
 *       type: object
 *       required:
 *         - name
 *         - frequency
 *       properties:
 *         habitName:
 *           type: string
 *           description: The name of the habit
 *           example: Drink Water
 *         details:
 *           type: string
 *           description: Optional description of the habit
 *           example: Drink a glass of water after every meal
 *         categoryId:
 *           type: string
 *           description: Optional category of the habit
 *           example: efc93804-e869-4bc9-b12f-6ddec9e5487a
 */

import express = require('express');
import { isAuth } from '../lib/auth';
import { validate } from '../middleware/validate.dto';
import { DELETEHabitDTO, GEThabitDTO, GEThabitsDTO, GETtoggleDTO, PATCHHabitDTO, POSTHabitDTO } from '../dtos';
import { DeleteHabit, GEThabit, GEThabits, PatchHabit, POSThabit, ToggleContribution } from '../controllers/habit.controller';

const router = express.Router();
/**
 * @swagger
 * /habit:
 *   post:
 *     summary: Create a new habit
 *     tags:
 *       - Habit
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/POSTHabitDTO'
 *     responses:
 *       201:
 *         description: Habit created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', isAuth, validate(POSTHabitDTO), POSThabit);

/**
 * @swagger
 * /habit/contribution/{id}:
 *   get:
 *     summary: Get habit contributions by habit ID
 *     tags:
 *       - Habit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Habit ID
 *         schema:
 *           type: string
 *           format: uuid
 *
 *       - in: query
 *         name: from
 *         required: false
 *         description: Start date (ISO 8601)
 *         schema:
 *           type: string
 *           format: date
 *
 *       - in: query
 *         name: to
 *         required: false
 *         description: End date (ISO 8601)
 *         schema:
 *           type: string
 *           format: date
 *
 *     responses:
 *       200:
 *         description: Habit retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Habit not found
 */
router.get('/contribution/:id', isAuth, validate(GEThabitDTO), GEThabit);

/**
 * @swagger
 * /habit:
 *   get:
 *     summary: Get all habits for the authenticated user
 *     tags:
 *       - Habit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: false
 *         description: Category ID for filtering habits
 *     responses:
 *       200:
 *         description: List of habits retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', isAuth, validate(GEThabitsDTO), GEThabits);

/**
 * @swagger
 * /habit/toggle/{id}:
 *   post:
 *     summary: Toggle habit contribution (mark complete/incomplete) for a given date (defaults to today)
 *     tags:
 *       - Habit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Habit ID
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: date
 *         required: false
 *         description: Date of the contribution to toggle (ISO 8601 format). Defaults to today if not provided.
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-12-18"
 *     responses:
 *       201:
 *         description: Contribution toggled successfully
 *       400:
 *         description: Invalid input (e.g., invalid date format)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Habit not found
 */
router.post('/toggle/:id', isAuth, validate(GETtoggleDTO), ToggleContribution);

/**
 * @swagger
 * /habit:
 *   delete:
 *     summary: Delete a habit by ID
 *     tags:
 *       - Habit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Habit ID to delete
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Habit deleted successfully
 *       400:
 *         description: Invalid input (e.g., missing or invalid habit ID)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Habit not found
 */
router.delete('/', isAuth, validate(DELETEHabitDTO), DeleteHabit);


/**
 * @swagger
 * /habit:
 *   patch:
 *     summary: Patch an existing habit
 *     description: Update one or more fields of a habit owned by the authenticated user.
 *     tags:
 *       - Habit
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - habitId
 *             properties:
 *               habitId:
 *                 type: string
 *                 example: "clx9z8abc0001"
 *               habitName:
 *                 type: string
 *                 example: "Morning Run"
 *               details:
 *                 type: string
 *                 nullable: true
 *                 example: "Run at least 3km"
 *               categoryId:
 *                 type: string
 *                 nullable: true
 *                 example: "clxcat123"
 *     responses:
 *       200:
 *         description: Habit updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Habit not found
 *       500:
 *         description: Server error
 */
router.patch('/', isAuth, validate(PATCHHabitDTO), PatchHabit);



module.exports = router;