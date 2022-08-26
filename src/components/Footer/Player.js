import React from "react";
import {
  BiSkipNext,
  BiSkipPrevious,
  BiShuffle,
  BiRepeat,
} from "react-icons/bi";
import { pausePlaying, startPlaying } from "../../adapters/setData";
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
  return (
    <div className="block">
      <div className="flex gap-4 items-center">
        <BiShuffle className="text-[20px] text-[gray] hover:text-[#fff]" />
        <BiSkipPrevious className="text-[30px] text-[gray] hover:text-[#fff]" />
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
        <BiSkipNext className="text-[30px] text-[gray] hover:text-[#fff]" />
        <BiRepeat className="text-[20px] text-[gray] hover:text-[#fff]" />
      </div>
      <div></div>
    </div>
  );
};

export default SpotifyPlayerController;
