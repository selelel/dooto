import express = require('express')
const router = express.Router()
const { indexPage, indexCss } = require('../client/index');

router.get('/index.css', function(_, res) {
    res.sendFile(indexCss);
  });

router.get('/', (_, res) => {
res.send(indexPage)
})

router.get('/success', (_, res) => {
  res.send('success')
})

router.get('/failure', (_, res) => {
  res.send('failure')
})


router.get('/online', (_, res) => {
  res.status(200).json({message: 'online'})
})

module.exports = router