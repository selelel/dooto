import fs = require('fs');
import path = require('path');

const IndexPage = fs.readFileSync(path.join(__dirname, './page/index.html'), 'utf8');
const IndexCss = path.join(__dirname, './css/index.css');

module.exports = { IndexPage, IndexCss };