import spotifyAuth from './spotify-auth';

describe('getSpotifyAuthorizationUri', ()=>{
  it('Returns the redirect url with reqired query parameters', ()=>{
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
describe('asyncHandleSpotifyCallback', ()=>{

});
