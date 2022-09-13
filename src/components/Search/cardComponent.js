import React, { useEffect } from "react";
import { ImPlay3 } from "react-icons/im";
import {
  fetchCurrentlyPlaying,
  fetchPlayerState,
} from "../../adapters/getData";
import { playerState } from "../../adapters/setData";
import { useSpotify } from "../../context/SpotifyContext";
import { IoIosPause } from "react-icons/io";

const CardComponent = ({ ...props }) => {
  const roundedImages = "rounded-[50%]  h-40 bg-cover group-shadow-2xl";
  const squareImages = " h-40 bg-cover group-shadow-2xl";
  const { state, dispatch } = useSpotify();
  const { token, currentlyPlayingTrack, playingState } = state;

  const playOrPauseCollection = (type) => {
    playerState(type, token, props.uri, props.track_number).then(() => {
      fetchPlayerState(token)
        .then((response) => {
          dispatch({ type: "setPlayingState", payload: response.isPlaying });
        })
        .then(() => {
          setTimeout(() => {
            fetchCurrentlyPlaying(token).then((response) => {
              dispatch({ type: "setPlayingTrack", payload: response });
            });
          }, 300);
        });
    });
  };

  return (
    <div className="group isolate hover:bg-[#222222] hover:cursor-pointer rounded-[10px] bg-[#181818] flex">
      <div className="inline-grid  px-4 w-full ">
        <div className="mt-4 mb-3 relative">
          <div
            className={props.type === "artist" ? roundedImages : squareImages}
            style={{
              backgroundImage: `url(${props.image[0]?.url})`,
            }}
          ></div>
          {props.type === "show" || props.type === "episode" ? null : (
            <div className="w-[45px] h-[45px] rounded-[50%] bg-[#1ad760] hidden absolute bottom-4 right-2 group-hover:grid  items-center justify-center hover:w-[47px] hover:h-[47px] ">
              {props.uri !== currentlyPlayingTrack?.uri || !playingState ? (
                <ImPlay3
                  className="text-black text-[25px] ml-[4px] "
                  onClick={() => playOrPauseCollection("play")}
                />
              ) : (
                <IoIosPause
                  className="text-black text-[25px] "
                  onClick={() => playOrPauseCollection("pause")}
                />
              )}
            </div>
          )}
        </div>

        <div className="mb-8 font-sans font-bold grid gap-2">
          <p className="text-white truncate">{props.name}</p>
          {props.type === "category" ? (
            <p className="text-[gray] text-[13px] capitalize font-medium font-sans truncate">
              {props.desc}
            </p>
          ) : (
            <p className="text-[gray] text-[13px] capitalize font-medium font-sans">
              {props.type}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
