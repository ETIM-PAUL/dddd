import { useContext, useReducer, createContext } from "react";
import { spotifyReducer } from "./SpotifyReducer";

const SpotifyContext = createContext();

const SpotifyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(spotifyReducer, {
    token: null,
    playlists: [],
    selectedPlaylist: null,
    selectedPlaylistData: {},
    currentlyPlayingTrack: {},
    playingState: {},
  });

  const value = { state, dispatch };
  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  );
};

function useSpotify() {
  const context = useContext(SpotifyContext);
  if (context === undefined) {
    throw new Error("useSpotify must be used within a SpotifyContext");
  }
  return context;
}

export { SpotifyProvider, useSpotify };
