/**
 * @swagger
 * components:
 *   schemas:
 *     POSTCreateMoodJournalDTO:
 *       type: object
 *       properties:
 *         note:
 *           type: string
 *           description: The note for the mood journal entry
 *           example: Feeling happy today
 *         mood:
 *           type: string
 *           description: The mood for the journal entry
 *           example: HAPPY
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the mood journal entry in ISO 8601 format (YYYY-MM-DD)
 *           example: 2025-01-15
 *     PATCHCreateMoodJournalDTO:
 *       type: object
 *       properties:
 *         note:
 *           type: string
 *           description: The note for the mood journal entry
 *           example: Ain't happy today. :(
 *         mood:
 *           type: string
 *           description: The mood for the journal entry
 *           example: SAD
 */

import express = require('express');
import { isAuth } from '../lib/auth';
import { CreateMoodJournal, DeleteMoodJournal, GetAllMoodJournals, GetMoodJournal, UpdateMoodJournal } from '../controllers/moodjournal.controller';
import { validate } from '../middleware/validate.dto';
import { POSTCreateMoodJournalDTO } from '../dtos/moodjournal.controller.dto';

const router = express.Router();

/**
 * @swagger
 * /mood-journal:
 *   post:
 *     summary: Create a new mood journal entry
 *     tags:
 *       - Mood Journal
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/POSTCreateMoodJournalDTO'
 *     responses:
 *       201:
 *         description: Mood journal entry created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', isAuth, validate(POSTCreateMoodJournalDTO), CreateMoodJournal);

/**
 * @swagger
 * /mood-journal:
 *   get:
 *     summary: Get mood journal entries for the authenticated user
 *     tags:
 *       - Mood Journal
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date (inclusive) in ISO 8601 format (YYYY-MM-DD). Cannot be used together with 'id' path parameter.
 *         example: 2025-01-01
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date (inclusive) in ISO 8601 format (YYYY-MM-DD). Cannot be used together with 'id' path parameter.
 *         example: 2025-01-31
 *     responses:
 *       200:
 *         description: List of mood journal entries or a single entry if 'id' is specified.
 *       400:
 *         description: Bad request - 'id' cannot be used together with 'from'/'to' query parameters or invalid date format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot specify both id and date range parameters (from/to) together.
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Mood journal entry not found (if id specified and not found)
 *       500:
 *         description: Failed to fetch mood journals
 */
router.get('/', isAuth, GetAllMoodJournals);

/**
 * @swagger
 * /mood-journal/{id}:
 *   get:
 *     summary: Get a specific mood journal entry by ID
 *     tags:
 *       - Mood Journal
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: Mood journal entry ID. Cannot be used together with 'from' and 'to' query parameters.
 *         example: "1982e82a-28c9-4243-a5b1-4540ed740a05"
 *     responses:
 *       200:
 *         description: List of mood journal entries or a single entry if 'id' is specified.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/MoodJournal'
 *                 - $ref: '#/components/schemas/MoodJournal'
 *       400:
 *         description: Bad request - 'id' cannot be used together with 'from'/'to' query parameters or invalid date format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot specify both id and date range parameters (from/to) together.
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Mood journal entry not found (if id specified and not found)
 *       500:
 *         description: Failed to fetch mood journals
 */
router.get('/:id', isAuth, GetMoodJournal);

/**
 * @swagger
 * /mood-journal/{id}:
 *   patch:
 *     summary: Update a mood journal entry
 *     tags:
 *       - Mood Journal
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mood journal entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PATCHCreateMoodJournalDTO'
 *     responses:
 *       200:
 *         description: Mood journal entry updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Mood journal entry not found
 *       500:
 *         description: Failed to update mood journal
 */
router.patch('/:id', isAuth, UpdateMoodJournal);

/**
 * @swagger
 * /mood-journal/{id}:
 *   delete:
 *     summary: Delete a mood journal entry
 *     tags:
 *       - Mood Journal
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mood journal entry ID
 *     responses:
 *       204:
 *         description: Mood journal entry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mood journal entry deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Mood journal entry not found
 *       500:
 *         description: Failed to delete mood journal
 */
router.delete('/:id', isAuth, DeleteMoodJournal);

module.exports = router;