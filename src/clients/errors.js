'use script';

const internalError = {
  code: -30500,
  msg: 'Internal error',
};

const notFound = {
  code: -30404,
  msg: "Not found",
};

const badRequest = {
  code: -30400,
  msg: 'Bad request',
};

module.exports = {
  internalError,
  badRequest,
  notFound,
};
