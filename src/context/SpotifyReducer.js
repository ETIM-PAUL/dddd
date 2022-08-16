export function spotifyReducer(state, { type, payload }) {
  switch (type) {
    case "setSpotifyToken": {
      return {
        ...state,
        token: payload,
      };
    }
    case "setPlaylists": {
      return {
        ...state,
        playlists: payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}
