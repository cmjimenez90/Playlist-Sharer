'use strict';

import fs from 'fs';
import Config from '../../src/config/server-config';
import AppleAuthorizationHandler from '../../src/service/authorization/apple-authorization-handler';
import JWTHandler from 'jsonwebtoken';

jest.mock('fs');
jest.mock('../../src/config/server-config');


describe('AppleAuthorizationHandler', () => {
  describe('asyncGenerateDeveloperToken', () => {
    describe('APPLE MUSIC JWT DEVELOPER TOKEN', () => {
      Config.APPLEMUSIC_TEAMID = 'TEAMID';
      Config.APPLEMUSIC_KID = 'KIDVALUE';
      Config.APPLEMUSIC_SECRET = 'FAKEPATH';
      const fakePrivateKeyString = `-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgU208KCg/doqiSzsVF5sknVtYSgt8/3oiYGbvryIRrzSgCgYIKoZIzj0DAQehRANCAAQfrvDWizEnWAzB2Hx2r/NyvIBO6KGBDL7wkZoKnz4Sm4+1P1dhD9fVEhbsdoq9RKEf8dvzTOZMaC/iLqZFKSN6\n-----END PRIVATE KEY-----`;
      fs.readFileSync.mockReturnValue(fakePrivateKeyString);
      const appleAuthorizationHandler = new AppleAuthorizationHandler();
      const developerToken = appleAuthorizationHandler.generateDeveloperToken();

      it('returns a jwt token using ECDSA encryption', async () => {
        const decodedToken = JWTHandler.decode(await developerToken, {complete: true});
        expect(decodedToken.header.alg).toBe('ES256');
      });
      it('jwt token header contains KID', async () => {
        const decodedToken = JWTHandler.decode(await developerToken, {complete: true});
        expect(decodedToken.header.kid).toBe('KIDVALUE');
      });
      it('JWT token body contains issuer', async () => {
        const decodedToken = JWTHandler.decode(await developerToken, {complete: true});
        expect(decodedToken.payload.iss).toBe('TEAMID');
      });
      it('JWT token body contains issued at', async () => {
        const decodedToken = JWTHandler.decode(await developerToken, {complete: true});
        expect(decodedToken.payload.iat).toBeTruthy();
      });
      it('JWT token body contains expiration', async () => {
        const decodedToken = JWTHandler.decode(await developerToken, {complete: true});
        expect(decodedToken.payload.exp).toBeTruthy();
      });
      it('JWT token signature signed with secret', async () => {
        const isValid = JWTHandler.verify(await developerToken, fakePrivateKeyString, {algorithms: ['ES256']});
        expect(isValid).toBeTruthy();
      });
    });
  });
});
