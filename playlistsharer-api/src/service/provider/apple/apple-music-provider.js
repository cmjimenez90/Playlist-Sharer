import Provider from '../base/provider';
import AppleMusicParser from './apple-music-url-parser';

/**
 * @class
 * @classdesc Apple Music Provider with URL parser
 */
export default class AppleMusicProvider extends Provider {
  constructor() {
    super('apple', 'api.music.apple.com', 'music.apple.com', new AppleMusicParser());
  }
};
