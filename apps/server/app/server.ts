require('dotenv-flow').config({
  node_env: process.argv[2] || ''
});
import express = require('express');
import path = require('path');
const app = express();
const port = process.env.PORT || 9090;
const clientRoutes = require('./routes/client.routes');
const swagger = require('./lib/swagger');


app.use('/', swagger)
app.use('/', clientRoutes)
app.use(express.static(path.join(__dirname, '/public')));

app.listen(port, () => {
  console.log(`App is on ${process.argv[2]?.split('=')[1]?.toUpperCase() || 'official'} environment`)
  console.log(`App listening on port ${port}`)
})
