import React from "react";
import { BiShuffle, BiRepeat } from "react-icons/bi";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { playerState, skipTrack } from "../../adapters/setData";
import { ImPlay3 } from "react-icons/im";
import { IoIosPause } from "react-icons/io";
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
    fetchCurrentlyPlaying(token).then((response) => {
      dispatch({ type: "setPlayingTrack", payload: response });
    });
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
    <div className="flex flex-1 justify-center">
      <div className="flex gap-4 items-center">
        <BiShuffle className="text-[20px] text-[gray] hover:text-[#fff]" />
        <CgPlayTrackPrev
          className="text-[35px] text-[gray] hover:text-[#fff]"
          onClick={() => skipPlayingTrack("previous")}
        />
        {!playingState ? (
          <div
            className="w-[35px] h-[35px] rounded-[50%] bg-white flex  items-center justify-center "
            onClick={() => playerPlayingState("play")}
          >
            <ImPlay3 className="text-black text-[20px] ml-[4px]" />
          </div>
        ) : (
          <div
            className="w-[35px] h-[35px] rounded-[50%] bg-white flex  items-center justify-center "
            onClick={() => playerPlayingState("pause")}
          >
            <IoIosPause className="text-black text-[25px] ml-px" />
          </div>
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
