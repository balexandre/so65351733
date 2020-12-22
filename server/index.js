// #######################################################################
// index.js

const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/test';
const PORT = process.env.PORT || 3001;

// #######################################################################
// middleware
app.use(express.json()); // parse JSON bodies
// app.use(express.urlencoded()); // parse URL-encoded bodies

// #######################################################################
// routes
app.use('/', routes);

// #######################################################################
// database
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// #######################################################################

// eslint-disable-next-line no-console
const log = (msg, ...arg) => console.log(msg, arg);

mongoose.connection.on('connected', () => {
  log(`Connected to ${MONGO_URL}`);
  app.listen(PORT, () => log(`Server ready http://localhost:${PORT}`));
});

// when Node process ends, close the Mongoose connection
const gracefulExit = () => {
  mongoose.connection.close(() => {
    log('Mongoose connection is now disconnected through app termination');
    process.exit(0);
  });
};
// connection throws an error
mongoose.connection.on('error', (err) => {
  log('Failed to connect to DB on startup ', err);
});

// connection is disconnected
mongoose.connection.on('disconnected', () => {
  log('Mongoose default connection to DB : disconnected');
});

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
