'use script';

const internalError = {
  code: -30500,
  msg: 'Internal error',
};

const badRequest = {
  code: -30400,
  msg: 'Bad request',
};

module.exports = {
  internalError,
  badRequest,
};
