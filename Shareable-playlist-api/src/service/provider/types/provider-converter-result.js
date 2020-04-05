'use strict';


class ProviderConverterResult {
  constructor(convertedProviderItem, hasError = false, errorStatus = '') {
    this.convertedItem = convertedProviderItem;
    this.hasError = hasError;
    this.errorStatus = errorStatus;
  }
}

export {ProviderConverterResult};
