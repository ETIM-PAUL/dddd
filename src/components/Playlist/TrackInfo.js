import React, { useEffect, useState } from "react";
import { useSpotify } from "../../context/SpotifyContext";
import { notPlaying, playing } from "../../utils/globalConstants";
import { MdExplicit } from "react-icons/md";
import { spaceArtistes } from "../../utils/utilFunctions";
import { BsPlayFill } from "react-icons/bs";
import { IoIosPause } from "react-icons/io";
import {
  playerState,
  playerStateTrack,
  playerStateTracks,
} from "../../adapters/setData";
import { fetchCurrentlyPlaying } from "../../adapters/getData";

const TrackInfo = ({ ...props }) => {
  const { state, dispatch } = useSpotify();
  const track_uri = props.track_uri;

  const { currentlyPlayingTrack, playingState, token, selectedPlaylistData } =
    state;
  const [showPlayer, setShowPlayer] = useState(false);
  const setPlayerState = (type) => {
    if (props.type === "search" || props.type === "searchTracks") {
      playerStateTracks(type, token, props.album_uri, props.track_uri).then(
        () => {
          if (type === "pause") {
            dispatch({ type: "setPlayingState", payload: false });
          } else {
            dispatch({ type: "setPlayingState", payload: true });
            fetchCurrentlyPlaying(token).then((response) => {
              dispatch({ type: "setPlayingTrack", payload: response });
            });
          }
        }
      );
    } else {
      if (
        playingState &&
        props.track_uri !== currentlyPlayingTrack?.track_uri
      ) {
        playerStateTrack(type, token, selectedPlaylistData.uri, track_uri).then(
          () => {
            if (type === "pause") {
              dispatch({ type: "setPlayingState", payload: false });
            } else {
              dispatch({ type: "setPlayingState", payload: true });
              fetchCurrentlyPlaying(token).then((response) => {
                dispatch({ type: "setPlayingTrack", payload: response });
              });
            }
          }
        );
      } else if (props.track_uri === currentlyPlayingTrack?.track_uri) {
        playerState(type, token).then(() => {
          if (type === "pause") {
            dispatch({ type: "setPlayingState", payload: false });
          } else {
            dispatch({ type: "setPlayingState", payload: true });
            fetchCurrentlyPlaying(token).then((response) => {
              dispatch({ type: "setPlayingTrack", payload: response });
            });
          }
        });
      }
    }
  };

  return (
    <div
      className="gap-4 flex items-center"
      onMouseOver={() => setShowPlayer(true)}
      onMouseOut={() => setShowPlayer(false)}
    >
      {(props.type === "playlist" ||
        props.type === "searchTracks" ||
        props.type === "search" ||
        props.type === "profile") &&
      !showPlayer ? (
        <div className="text-[#fff] py-1 w-4 pr-2">
          {props.type !== "search" && <span>{props.index + 1}</span>}
        </div>
      ) : (
        <span className="text-white py-1 w-4 pr-1 text-[20px] cursor-default">
          {currentlyPlayingTrack?.id !== props.id || !playingState ? (
            <BsPlayFill onClick={() => setPlayerState("play")} />
          ) : (
            <IoIosPause onClick={() => setPlayerState("pause")} />
          )}
        </span>
      )}
      <div className="hover:text-[#fff] cursor-default flex gap-4 items-center">
        <img
          src={props.image.url}
          alt="track"
          width={45}
          height={55}
          className="my-2"
        />
        <div className="grid">
          <span
            className={
              currentlyPlayingTrack?.id === props.id ? playing : notPlaying
            }
          >
            {props.name}
          </span>
          <div className="flex items-center gap-1 w-56">
            {props.isExplicit ? <MdExplicit className="text-[18px]" /> : null}
            <span className="text-[gray] text-[13px] capitalize font-medium font-sans truncate">
              {spaceArtistes(props.artist, props.type)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackInfo;
