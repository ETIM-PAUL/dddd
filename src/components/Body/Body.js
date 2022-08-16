import React, { useEffect } from "react";
import { fetchPlaylist } from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";

import "./body.css";
const Body = () => {
  const { state, dispatch } = useSpotify();
  const { token, selectedPlaylist } = state;

  useEffect(() => {
    if (selectedPlaylist !== null) {
      fetchPlaylist(token, selectedPlaylist).then((response) => {
        dispatch({ type: "setPlaylistData", payload: response });
        console.log(response);
      });
    }
  }, [dispatch, selectedPlaylist, token]);
  return <div className="bg-blend h-[86vh]"></div>;
};

export default Body;
