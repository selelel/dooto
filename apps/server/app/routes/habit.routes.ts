
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
import { POSTAddContributionDTO, POSTHabitDTO } from '../dtos';
import { GEThabit, GEThabits, POSThabit, ToggleContribution } from '../controllers/habit.controller';

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
 * /habit/{id}:
 *   get:
 *     summary: Get a habit by ID
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
 *     responses:
 *       200:
 *         description: Habit retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Habit not found
 */

router.get('/:id', isAuth, GEThabit);

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
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date for filtering habits
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for filtering habits
 *       - in: query
 *         name: category
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
router.get('/', isAuth, GEThabits);

/**
 * @swagger
 * /habit/{id}/toggle:
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
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: boolean
 *                 description: Mark contribution as completed or not. Defaults to true.
 *                 example: true
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
router.post('/:id/toggle', isAuth, validate(POSTAddContributionDTO), ToggleContribution);



module.exports = router;