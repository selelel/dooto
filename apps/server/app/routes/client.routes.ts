import express = require('express')
const logger = require('../utils/logger')
const router = express.Router()
const { indexPage, indexCss } = require('../client/index');


// middleware that is specific to this router
const timeLog = (req: express.Request, _: any, next: () => void) => {
  console.log('Time: ', Date.now())
  logger.info(`Route hit: ${req.method} ${req.originalUrl}`);
  next()
}

router.use(timeLog)

router.get('/index.css', function(_, res) {
    res.sendFile(indexCss);
  });

router.get('/', (_, res) => {
res.send(indexPage)
})

router.get('/hello-world', (_, res) => {
res.send('Hello World!')
})

module.exports = router