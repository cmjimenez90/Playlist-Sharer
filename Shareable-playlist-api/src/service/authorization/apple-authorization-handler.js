'use strict';
import Config from '../../config/server-config';
import fs from 'fs';
import JWTHandler from 'jsonwebtoken';

export default class AppleAuthorizationHandler {
  constructor() {
    this.secret = fs.readFileSync(Config.APPLEMUSIC_SECRET);
    this.kid = Config.APPLEMUSIC_KID;
    this.teamId = Config.APPLEMUSIC_TEAMID;
  }

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
