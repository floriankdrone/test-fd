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
  app.listen(process.env.PORT || 5000, () => {
    console.log('Server listening to port 3000');
  });
});
