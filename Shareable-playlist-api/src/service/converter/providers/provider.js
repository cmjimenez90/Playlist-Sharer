export default class Provider {
  constructor(platform, apiRootURL, rootURL, parser) {
    this.platform = platform;
    this.apiRootURL = apiRootURL;
    this.rootUrl = rootURL;
    this.parse = parser.parse;
  };
};
