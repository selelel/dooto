import express = require('express')
const logger = require('../utils/logger')
const router = express.Router()


// middleware that is specific to this router
const timeLog = (req: express.Request, _: any, next: () => void) => {
  console.log('Time: ', Date.now())
  logger.info(`Route hit: ${req.method} ${req.originalUrl}`);
  next()
}

router.use(timeLog)

/**
 * @swagger
 * /book:
 *   get:
 *     summary: Get book test endpoint
 *     description: Returns a test response from the book route
 *     tags: [Book]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 test:
 *                   type: string
 *                   example: "hello"
 */
router.get('/', (_, res) => {
res.send({test: "hello"})
})

/**
 * @swagger
 * /book/hello-world:
 *   get:
 *     summary: Get hello world message
 *     description: Returns a simple hello world message from the book route
 *     tags: [Book]
 *     responses:
 *       200:
 *         description: Successful response
 *         content
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hello World!"
 */
router.get('/hello-world', (_, res) => {
res.send('Hello World!')
})

module.exports = router