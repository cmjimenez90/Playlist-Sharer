import axios from 'axios';
import spotifyAuth from '../../src/service/authorization/spotify/spotify-auth';

jest.mock('axios');

describe('getSpotifyAuthorizationUri', ()=>{
  it('Returns the redirect url with required query parameters', ()=>{
    const uri = spotifyAuth.getSpotifyAuthorizationUri();
    const searchParameters = uri.searchParams;
    const clientId = searchParameters.get('client_id');
    const responseType = searchParameters.get('response_type');
    const redirectUri = searchParameters.get('redirect_uri');

    expect(clientId).toBeDefined();
    expect(responseType).toBeDefined();
    expect(redirectUri).toBeDefined();
  });
});

describe('asyncHandleSpotifyCallback', () => {
  describe('user approves the access request', () =>{
    it('returns the access token when successful', async ()=> {
      const FAKE_TOKEN = {
        'access_token': '123-123-123-123-123-123',
        'token_type': 'Bearer',
        'expires_in': 3600,
        'refresh_token': '1234-1234-1234-1234',
        'scope': ''};
      const FAKE_RESPONSE = {
        'status': 200,
        'statusText': 'OK',
        'data': FAKE_TOKEN,
      };
      axios.post.mockResolvedValue(FAKE_RESPONSE);
      expect.assertions(2);
      const token = await spotifyAuth.asyncHandleSpotifyCallback('fakecode');
      expect(token).toBeDefined();
      expect(token).toBe(FAKE_TOKEN);
    });
  });

  describe('when a status other than 200 ok is returned', ()=>{
    it('returns an error message', async () => {
      const FAKE_RESPONSE = {
        'status': 500,
        'statusText': 'SERVER ERROR',
      };
      const ERROR_MESSAGE = {
        error: 'CALLBACK FAILURE',
        message: 'SPOTIFY - NO TOKEN RETRIEVED',
      };
      axios.post.mockRejectedValue(FAKE_RESPONSE);
      expect.assertions(2);
      const token = await spotifyAuth.asyncHandleSpotifyCallback('fakecode');
      expect(token).toBeDefined();
      expect(token).toMatchObject(ERROR_MESSAGE);
    });
  });
});

describe('asyncRefreshSpotifyToken', () => {
  describe('process is succesful', () => {
    it('returns the access token when successful', async ()=> {
      const FAKE_TOKEN = {
        'access_token': '123-123-123-123-123-123',
        'token_type': 'Bearer',
        'expires_in': 3600,
        'scope': ''};
      const FAKE_RESPONSE = {
        'status': 200,
        'statusText': 'OK',
        'data': FAKE_TOKEN,
      };
      axios.post.mockResolvedValue(FAKE_RESPONSE);
      expect.assertions(2);
      const refreshToken =
      await spotifyAuth.asyncRefreshSpotifyToken('REFRESH TOKEN HERE');
      expect(refreshToken).toBeDefined();
      expect(refreshToken).toMatchObject(FAKE_TOKEN);
    });
    describe('process is unsuccessful', () => {
      it('returns an error message', async ()=>{
        const FAKE_RESPONSE = {
          'status': 500,
          'statusText': 'SERVER ERROR',
        };
        const ERROR_RESPONSE = {
          error: 'REFRESH FAILURE',
        };
        axios.post.mockRejectedValue(FAKE_RESPONSE);
        expect.assertions(2);
        const refreshToken =
        await spotifyAuth.asyncRefreshSpotifyToken('REFRESH TOKEN HERE');
        expect(refreshToken).toBeDefined();
        expect(refreshToken).toMatchObject(ERROR_RESPONSE);
      });
    });
  });
});

describe('asyncGetClientCredentials', () => {
  describe('valid authorization token is already available', () => {
    it('returns the same authorization token', async () => {});
  });
  describe('expired authorization token is available', () => {
    it('generates a new authorization token', async () => {});
    it('stores the new authorization token internally', () => {});
  });
  describe('no authorization token is avaiable', () =>{
    it('generates a new authorization token', () => {});
    it('stores the new authorization token internally', () => {});
  });
});
