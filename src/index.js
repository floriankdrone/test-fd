'use script';

const express = require('express');

const db = require('./clients/db');

const app = express();

app.use(express.json());

// Listen to routes
app.use(require('./controllers'));

// Connect database
db.connect(() => {
  // Listen for connection
  app.listen(3000, '0.0.0.0', () => {
    console.log('Server listening to port 3000');
  });
});
