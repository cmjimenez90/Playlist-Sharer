'use strict';

/**
 * @class
 * @classdesc Client Response Error object
 */
export class ClientError {
  constructor(error, message) {
    this.error = error;
    this.message = message;
  }
};

/**
 * @constant CLIENT_ERROR_STATES Error states
 */
export const CLIENT_ERROR_STATES = {
  AUTHORIZATION: 'AUTHORIZATION',
  SERVER_ERROR: 'SERVER ERROR',
  REQUEST_ERROR: 'BAD REQUEST',
  RATE_LIMIT: 'RATE LIMIT',
  PAYLOAD_SIZE: 'PAYLOAD TO LARGE',
};
