export function spotifyReducer(state, { type, payload }) {
  switch (type) {
    case "setUser": {
      return {
        ...state,
        user: payload,
      };
    }
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
    case "setCategories": {
      return {
        ...state,
        categories: payload,
      };
    }
    case "setCategory": {
      return {
        ...state,
        selectedCategory: payload,
      };
    }
    case "setSearchValue": {
      return {
        ...state,
        searchValue: payload,
      };
    }
    case "setSearchResult": {
      return {
        ...state,
        searchResult: payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}
