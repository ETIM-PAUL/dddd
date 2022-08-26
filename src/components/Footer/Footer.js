import React, { useEffect, useState } from "react";
import {
  BiSkipNext,
  BiSkipPrevious,
  BiShuffle,
  BiRepeat,
  BiDevices,
} from "react-icons/bi";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsStack,
} from "react-icons/bs";
import { TbMicrophone2 } from "react-icons/tb";
import {
  fetchCurrentlyPlaying,
  fetchPlayerState,
} from "../../adapters/getData";
import { pausePlaying, startPlaying } from "../../adapters/setData";
import { useSpotify } from "../../context/SpotifyContext";
import Volume from "./Volume";

const Footer = () => {
  const [playing, setPlaying] = useState(false);
  const { state, dispatch } = useSpotify();
  const { token, currentlyPlayingTrack, playingState } = state;
  const { name, artistes, duration, image } = state.currentlyPlayingTrack;

  const pausePlayer = () => {
    dispatch({ type: "setPlayingState", payload: false });

    pausePlaying(token);
  };
  const startPlayer = () => {
    dispatch({ type: "setPlayingState", payload: true });

    startPlaying(currentlyPlayingTrack, token);
  };

  useEffect(() => {
    fetchPlayerState(token).then((response) =>
      dispatch({ type: "setPlayingState", payload: response })
    );
    fetchCurrentlyPlaying(token).then((response) => {
      dispatch({ type: "setPlayingTrack", payload: response });
    });
  }, [dispatch, token]);

  return (
    <div>
      <div className="w-auto h-[1px] bg-[#383636]"></div>
      <div className="bg-[#181818] border-[gray] w-auto h-[90px] z-50">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <img alt="" src={image} />
            <div className="grid">
              <p className="text-[#fff] hover:underline hover:cursor-pointer ">
                {name}
              </p>
              <div className="flex gap-1">
                {artistes?.map((artiste, id) => {
                  return (
                    <p
                      className="text-[#b3b3b3] text-xs hover:underline hover:cursor-pointer"
                      key={id}
                    >
                      {artiste}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
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

          <div className="flex gap-3">
            <TbMicrophone2 className="text-[20px] text-[gray] hover:text-[#fff] self-center" />
            <BiDevices className="text-[20px] text-[gray] hover:text-[#fff] self-center" />
            <BsStack className="text-[20px] text-[gray] hover:text-[#fff] self-center" />

            <Volume />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
