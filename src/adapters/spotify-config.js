const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-recently-played",
  "user-read-playback-position",
  "user-top-read",
  "user-read-email",
  "user-read-private",
  "user-library-modify",
  "user-library-read",
];

export const spotifyLoginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
