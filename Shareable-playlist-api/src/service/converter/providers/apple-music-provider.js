import Provider from './provider';
import AppleMusicParser from '../parser/apple-music-url-parser';
export default class AppleMusicProvider extends Provider {
  constructor() {
    super('apple', 'api.music.apple.com', 'music.apple.com', new AppleMusicParser());
  }
};
