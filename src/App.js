import React, { useState, useEffect } from "react";

import SpotifyLogin from "./pages/login";
import SpotifyPlayer from "./pages/main";
import { getTokenFromUrl } from "./utils/utilFunctions";

function App() {
  const [spotifyLoginToken, setSpotifyLoginToken] = useState("");

  useEffect(() => {
    const hashed = getTokenFromUrl();
    window.location.hash = "";
    const loginToken = hashed.access_token;

    if (loginToken) {
      setSpotifyLoginToken(loginToken);
    }
  }, []);

  return <div>{spotifyLoginToken ? <SpotifyPlayer /> : <SpotifyLogin />}</div>;
}

export default App;
