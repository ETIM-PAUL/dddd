import React from "react";
import { BiShuffle, BiRepeat } from "react-icons/bi";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { playerState, skipTrack } from "../../adapters/setData";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import { useSpotify } from "../../context/SpotifyContext";
import { fetchCurrentlyPlaying } from "../../adapters/getData";

const SpotifyPlayerController = () => {
  const { state, dispatch } = useSpotify();
  const { token, playingState } = state;
  const playerPlayingState = (type) => {
    playerState(type, token);
    if (type === "pause") {
      dispatch({ type: "setPlayingState", payload: false });
    } else dispatch({ type: "setPlayingState", payload: true });
  };
  const skipPlayingTrack = (type) => {
    skipTrack(type, token).then(() => {
      fetchCurrentlyPlaying(token).then((response) => {
        dispatch({ type: "setPlayingTrack", payload: response });
      });
    });
    dispatch({ type: "setPlayingState", payload: true });
  };
  return (
    <div className="block">
      <div className="flex gap-4 items-center">
        <BiShuffle className="text-[20px] text-[gray] hover:text-[#fff]" />
        <CgPlayTrackPrev
          className="text-[35px] text-[gray] hover:text-[#fff]"
          onClick={() => skipPlayingTrack("previous")}
        />
        {!playingState ? (
          <BsFillPlayCircleFill
            className="text-[45px] text-[#fff]"
            onClick={() => playerPlayingState("play")}
          />
        ) : (
          <BsFillPauseCircleFill
            className="text-[45px] text-[#fff]"
            onClick={() => playerPlayingState("pause")}
          />
        )}
        <CgPlayTrackNext
          className="text-[35px] text-[gray] hover:text-[#fff]"
          onClick={() => skipPlayingTrack("next")}
        />
        <BiRepeat className="text-[20px] text-[gray] hover:text-[#fff]" />
      </div>
      <div></div>
    </div>
  );
};

export default SpotifyPlayerController;
