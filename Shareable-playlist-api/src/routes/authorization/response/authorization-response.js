/**
 * Authorization object for authorization reponses
 * Can hold error messaged if needed
 */

'use strict';

export default class AuthorizationReponse {
  constructor(token, hasError = false, errorMessage = '') {
    this.authorizationToken = token;
    this.hasError = hasError;
    this.errorMessage = errorMessage;
  };
}
