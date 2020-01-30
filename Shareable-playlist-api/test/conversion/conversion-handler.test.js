import ConversionHandler from '../../src/service/conversion/conversion-handler';
import ProviderURL from '../../src/service/provider/base/provider-url';

describe('ConversionHandler', () => {
  describe('Convert', () => {
    it('Converts a ProviderUrl to desired format', async () => {
      const conversionHandler = new ConversionHandler();
      const convertedProvider = conversionHandler.convert(providerURL, format);
    });
  });
});
