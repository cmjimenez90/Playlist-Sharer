'use strict';

/**
 * @class
 * @classdesc Provider Converter Result data object
 */
class ProviderConverterResult {
  constructor(convertedProviderItem, hasError = false, errorStatus = '') {
    this.convertedItem = convertedProviderItem;
    this.hasError = hasError;
    this.errorStatus = errorStatus;
  }
}

export {ProviderConverterResult};
