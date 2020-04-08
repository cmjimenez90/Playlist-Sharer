'use strict';

/**
 * @class
 * @classdesc Retreival result data object
 */
export default class RetrievalResult {
  constructor(URLData, hasError = false, error = '', message = '') {
    this.URLData = URLData;
    this.hasError = hasError;
    this.error = error;
    this.message = message;
  }
}
