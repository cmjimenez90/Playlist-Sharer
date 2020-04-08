'use strict';

/**
 * @class
 * @classdesc Conversion Result data object
 */
export default class ConversionResult {
  constructor(convertedURL = '', hasError=false, error='', errorMessage ='') {
    this.convertedURL = convertedURL;
    this.hasError = hasError;
    this.error = error,
    this.message = errorMessage;
  }
}
