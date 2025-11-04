import express = require('express');
import path = require('path');
const { IndexPage, IndexCss } = require('./client/index');
const app = express()
const port = 9090

app.get('/index.css', function(_, res) {
  res.sendFile(IndexCss);
});

app.get('/', (_, res) => {
  res.send(IndexPage)
})

app.get('/hello-world', (_, res) => {
  res.send('Hello World!')
})

app.use(express.static(path.join(__dirname, '/public')));

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
