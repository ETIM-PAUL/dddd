import React, { useEffect } from "react";
import { useSpotify } from "./context/SpotifyContext";

import SpotifyLogin from "./pages/login";
import SpotifyPlayer from "./pages/main";
import { getTokenFromUrl } from "./utils/utilFunctions";

function App() {
  const { state, dispatch } = useSpotify();

  useEffect(() => {
    const hashed = getTokenFromUrl();
    window.location.hash = "";
    const loginToken = hashed.access_token;

    if (loginToken) {
      dispatch({ type: "setSpotifyToken", payload: loginToken });
    }
  }, [dispatch]);

  return <div>{state.token ? <SpotifyPlayer /> : <SpotifyLogin />}</div>;
}

export default App;
