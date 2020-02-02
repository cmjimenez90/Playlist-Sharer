import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.SERVER_PORT || 3000,
  SPOTIFY_CLIENTID: process.env.SPOTIFY_CLIENTID,
  SPOTIFY_SECRET: process.env.SPOTIFY_SECRET || '',
  SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI || '',
  APPLEMUSIC_SECRET: process.env.APPLEMUSIC_SECRET || '',
  APPLEMUSIC_KID: process.env.APPLEMUSIC_KID || '',
  APPLEMUSIC_TEAMID: process.env.APPLEMUSIC_TEAMID || '',
};
