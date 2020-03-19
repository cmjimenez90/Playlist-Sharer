'use strict';

export default class AuthorizationError {
  constructor(token, hasError = false, errorMessage = '') {
    this.authorizationToken = token;
    this.hasError = hasError;
    this.errorMessage = errorMessage;
  };
}
