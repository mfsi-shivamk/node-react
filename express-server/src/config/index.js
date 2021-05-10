/* eslint-disable global-require */
import fs from 'fs';
import path from 'path';

const normalizedPath = __dirname;
const data = {};

fs.readdirSync(normalizedPath).forEach((file) => {
  if (file !== 'index.js') {
    // eslint-disable-next-line import/no-dynamic-require
    data[file.split('.')[0]] = require(path.join(__dirname, file)).default;
  }
});

export default data;
