'use strict';
import Config from '../../config/server-config';
import fs from 'fs';
import JWTHandler from 'jsonwebtoken';

/**
 * Apple Music Authorization Handler Class
 * @class
 * @classdesc Manages the creation of the Apple Developer tokens
 */
export default class AppleAuthorizationHandler {
  /**
   * Create an AppleAuthoriztionHandler
   */
  constructor() {
    this.secret = fs.readFileSync(Config.APPLEMUSIC_SECRET);
    this.kid = Config.APPLEMUSIC_KID;
    this.teamId = Config.APPLEMUSIC_TEAMID;
  }

  /**
   *  Returns a new Apple Developer Token
   * @return {jwtToken} developer JWT token
   */
  generateDeveloperToken() {
    const jwtOptions = {
      header: {
        kid: this.kid,
      },
      algorithm: 'ES256',
      expiresIn: '3h',
    };
    const developerToken = JWTHandler.sign({iss: this.teamId}, this.secret, jwtOptions);
    return developerToken;
  }
}
