import fs = require('fs');
import path = require('path');

const indexPage = fs.readFileSync(path.join(__dirname, './page/index.html'), 'utf8');
const indexCss = path.join(__dirname, './css/index.css');
module.exports = { indexPage, indexCss };