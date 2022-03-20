'use script';

const joi = require('joi');

const schema = joi.object().keys({
  startDate: joi.date().required(),
  endDate: joi.date().greater(joi.ref('startDate')).required(),
  minCount: joi.number().integer().required(),
  maxCount: joi.number().integer().greater(joi.ref('minCount')).required(),
});

module.exports = {
  schema,
};
