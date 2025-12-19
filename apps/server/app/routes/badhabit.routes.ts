/**
 * @swagger
 * components:
 *   schemas:
 *     POSTBadHabitTimerDTO:
 *       type: object
 *       required:
 *         - habitName
 *       properties:
 *         habitName:
 *           type: string
 *           description: The name of the habit
 *           example: Smoking
 *         details:
 *           type: string
 *           description: Optional description of the habit
 *           example: Smoke less than 5 cigarettes per day
 */

import express = require('express');
import { isAuth } from '../lib/auth';
import { 
  CreateBadHabitTimer, 
  ToggleBadHabitTimerRelapse, 
  GetAllBadHabitTimers, 
  GetBadHabitTimerById, 
  DeleteBadHabitTimerById
} from '../controllers/badhabit.controller';

const router = express.Router();

/**
 * @swagger
 * /badhabit-timer:
 *   post:
 *     summary: Create a new bad habit timer
 *     tags:
 *       - Bad Habit Timer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/POSTBadHabitTimerDTO'
 *     responses:
 *       201:
 *         description: Bad habit timer created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', isAuth, CreateBadHabitTimer);

/**
 * @swagger
 * /badhabit-timer/{id}/relapse/toggle:
 *   post:
 *     summary: Record a relapse for a bad habit timer
 *     tags:
 *       - Bad Habit Timer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bad habit timer
 *     responses:
 *       200:
 *         description: Relapse recorded successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Bad habit timer not found
 */
router.post('/:id/relapse/toggle', isAuth, ToggleBadHabitTimerRelapse);

/**
 * @swagger
 * /badhabit-timer:
 *   get:
 *     summary: Get all bad habit timers for the authenticated user
 *     tags:
 *       - Bad Habit Timer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bad habit timers
 *       401:
 *         description: Unauthorized
 */
router.get('/', isAuth, GetAllBadHabitTimers);

/**
 * @swagger
 * /badhabit-timer/{id}:
 *   get:
 *     summary: Get a bad habit timer by ID
 *     tags:
 *       - Bad Habit Timer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bad habit timer
 *     responses:
 *       200:
 *         description: The bad habit timer
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Bad habit timer not found
 */
router.get('/:id', isAuth, GetBadHabitTimerById);

/**
 * @swagger
 * /badhabit-timer/{id}:
 *   delete:
 *     summary: Delete a bad habit timer by ID
 *     tags:
 *       - Bad Habit Timer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bad habit timer
 *     responses:
 *       204:
 *         description: Bad habit timer deleted successfully (No Content)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Bad habit timer not found
 */
router.delete('/:id', isAuth, DeleteBadHabitTimerById);

module.exports = router;