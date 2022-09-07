import React, { useState } from "react";
import { BiShuffle, BiRepeat } from "react-icons/bi";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { playerState, skipTrack } from "../../adapters/setData";
import { ImPlay3 } from "react-icons/im";
import { IoIosPause } from "react-icons/io";
import { useSpotify } from "../../context/SpotifyContext";
import { fetchCurrentlyPlaying } from "../../adapters/getData";
import { durationToMinsAndSecs } from "../../utils/utilFunctions";

const SpotifyPlayerController = () => {
  const { state, dispatch } = useSpotify();
  const [currentTime, setCurrentTime] = useState(0.0);
  const { token, playingState, currentlyPlayingTrack } = state;
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
    setCurrentTime(0.0);
  };
  return (
    <div className="flex flex-1 justify-center">
      <div className="grid grid gap-3">
        <div className="flex gap-4 items-center justify-center">
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

        {currentlyPlayingTrack && (
          <div className="flex items-center justify-between gap-2">
            <span className="text-[gray] text-[12px] w-[25px]">
              {durationToMinsAndSecs(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={Math.floor(currentlyPlayingTrack.duration)}
              className="audio-slider w-[400px]"
              value={currentTime}
              onChange={(e) => setCurrentTime(e.target.value)}
            />

            <span className="text-[gray] text-[12px] ">
              {durationToMinsAndSecs(currentlyPlayingTrack.duration)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyPlayerController;
