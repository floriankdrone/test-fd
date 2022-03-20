const express = require('express');

const router = express.Router();

const validator = require('../clients/validator');
const errors = require('../clients/errors');
const records = require('../models/records');

// POST - fetch
router.post('/', (req, res, next) => {
  const result = validator.schema.validate(req.body || {});
  if (result.error) {
    console.log('Bad Request', result.error);
    return res.json(errors.badRequest);
  }
  req.body = result.value;
  return next();
}, async (req, res) => {
  const {
    startDate, endDate, minCount, maxCount,
  } = req.body;

  const recordData = await records.fetch(
    startDate,
    endDate,
    minCount,
    maxCount,
  );
  res.json(recordData);
});

module.exports = router;
