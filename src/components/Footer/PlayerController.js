import React from "react";
import { BiShuffle, BiRepeat } from "react-icons/bi";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import {
  pausePlaying,
  skipToNextTrack,
  skipToPrevTrack,
  startPlaying,
} from "../../adapters/setData";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import { useSpotify } from "../../context/SpotifyContext";

const SpotifyPlayerController = () => {
  const { state, dispatch } = useSpotify();
  const { token, playingState, currentlyPlayingTrack } = state;
  const pausePlayer = () => {
    dispatch({ type: "setPlayingState", payload: false });
    pausePlaying(token);
  };
  const startPlayer = () => {
    dispatch({ type: "setPlayingState", payload: true });
    startPlaying(currentlyPlayingTrack, token);
  };
  const skipNext = () => {
    skipToNextTrack(token);
    dispatch({ type: "setPlayingState", payload: true });
  };
  const skipPrev = () => {
    skipToPrevTrack(token);
    dispatch({ type: "setPlayingState", payload: true });
  };
  return (
    <div className="block">
      <div className="flex gap-4 items-center">
        <BiShuffle className="text-[20px] text-[gray] hover:text-[#fff]" />
        <CgPlayTrackPrev
          className="text-[35px] text-[gray] hover:text-[#fff]"
          onClick={() => skipPrev()}
        />
        {!playingState ? (
          <BsFillPlayCircleFill
            className="text-[45px] text-[#fff]"
            onClick={() => startPlayer()}
          />
        ) : (
          <BsFillPauseCircleFill
            className="text-[45px] text-[#fff]"
            onClick={() => pausePlayer()}
          />
        )}
        <CgPlayTrackNext
          className="text-[35px] text-[gray] hover:text-[#fff]"
          onClick={() => skipNext()}
        />
        <BiRepeat className="text-[20px] text-[gray] hover:text-[#fff]" />
      </div>
      <div></div>
    </div>
  );
};

export default SpotifyPlayerController;
