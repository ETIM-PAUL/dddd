export function spotifyReducer(state, { type, payload }) {
  switch (type) {
    case "setSpotifyToken": {
      return {
        ...state,
        token: payload,
      };
    }
    case "setPlayingTrack": {
      return {
        ...state,
        currentlyPlayingTrack: payload,
      };
    }
    case "setPlayingState": {
      return {
        ...state,
        playingState: payload,
      };
    }
    case "setPlayerVolume": {
      return {
        ...state,
        playerVolume: payload,
      };
    }
    case "setPlaylists": {
      return {
        ...state,
        playlists: payload,
      };
    }
    case "setPlaylist": {
      return {
        ...state,
        selectedPlaylist: payload,
      };
    }
    case "setPlaylistData": {
      return {
        ...state,
        selectedPlaylistData: payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}
