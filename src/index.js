const { MongoClient } = require('mongodb');
const api = require('./api');
const co = require('co');
const express = require('express');
const bodyParser = require('body-parser')


module.exports = config => co(function*() {
  console.log(`MongoDB connecting to ${config.mongodbUri}`);
  const db = yield MongoClient.connect(config.mongodbUri);

  const app = express();
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  app.use(api(db));

  app.listen(config.port);
  console.log(`App listening on ${config.port}`);
}).catch(error => {
  console.error(error.stack);
  process.exit(-1);
});
