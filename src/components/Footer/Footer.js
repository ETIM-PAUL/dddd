import React, { useEffect, useState } from "react";

import {
  fetchCurrentlyPlaying,
  fetchPlayerState,
} from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";
import SpotifyPlayerController from "./PlayerController";
import PlayingTrack from "./PlayingTrack";
import Volume from "./Volume";

const Footer = () => {
  const { state, dispatch } = useSpotify();
  const { token } = state;

  useEffect(() => {
    fetchPlayerState(token).then((response) => {
      dispatch({ type: "setPlayingState", payload: response.isPlaying });
      dispatch({ type: "setPlayerVolume", payload: response.volume });
    });
    fetchCurrentlyPlaying(token).then((response) => {
      dispatch({ type: "setPlayingTrack", payload: response });
    });
  }, [dispatch, token]);

  return (
    <div>
      <div className="w-auto h-[1px] bg-[#383636]"></div>
      <div className="bg-[#181818] border-[gray] w-auto h-[90px] z-50">
        <div className="px-4 py-3 flex justify-between items-center">
          <PlayingTrack />
          <SpotifyPlayerController />
          <Volume />
        </div>
      </div>
    </div>
  );
};

export default Footer;
