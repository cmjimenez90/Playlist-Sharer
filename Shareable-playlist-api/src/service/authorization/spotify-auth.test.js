import axios from 'axios';
import spotifyAuth from './spotify-auth';

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
  it('returns the data when successful', async ()=> {
    const FAKE_TOKEN = {
      'access_token': '123-123-123-123-123-123',
      'token_type': 'Bearer',
      'expires_in': 3600,
      'refresh_token': '1234-1234-1234-1234',
      'scope': ''};
    const FAKE_DATA = {'data': FAKE_TOKEN};
    axios.post.mockResolvedValue(FAKE_DATA);
    expect.assertions(2);
    const data = await spotifyAuth.asyncHandleSpotifyCallback('fakecode');
    expect(data).toBeDefined();
    expect(data).toBe(FAKE_TOKEN);
  });
});
