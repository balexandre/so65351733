// grab all models and export all in one go
const fs = require('fs');

const models = {};
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.js') {
    const name = file.substr(0, file.indexOf('.'));
    models[name] = require(`./${name}`); // eslint-disable-line global-require, import/no-dynamic-require
  }
});

module.exports = models;
