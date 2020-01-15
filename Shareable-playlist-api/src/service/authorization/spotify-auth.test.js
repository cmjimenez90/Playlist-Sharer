import spotifyAuth from './spotify-auth';
import axios from 'axios';
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
  it('returns the data when successful', ()=> {
    const axiosReponse = {
      data: {
        values: 'test',
      },
    };
    axios.post.mockImplementationOnce(() => {
      Promise.resolve(axiosReponse);
    });
    return spotifyAuth.asyncHandleSpotifyCallback('FAKECODE').then(
        (data) => {
          expect(data).toBeDefined();
        },
    );
  });
});
