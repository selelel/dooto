import express = require('express')
const router = express.Router()
const { indexPage, indexCss } = require('../client/index');

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