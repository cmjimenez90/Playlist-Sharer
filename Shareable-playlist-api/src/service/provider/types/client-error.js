'use strict';

export class ClientError {
  constructor(error, message) {
    this.error = error;
    this.message = message;
  }
};

export const CLIENT_ERROR_STATES = {
  AUTHORIZATION: 'AUTHORIZATION',
  SERVER_ERROR: 'SERVER ERROR',
  REQUEST_ERROR: 'BAD REQUEST',
  RATE_LIMIT: 'RATE LIMIT',
  PAYLOAD_SIZE: 'PAYLOAD TO LARGE',
};
