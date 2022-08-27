import React, { useEffect } from "react";
import { fetchPlaylist } from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";
import "../../styles/body.css";
import PlaylistTable from "./PlaylistTable";
import {
  BsFillPlayCircleFill,
  BsThreeDots,
  BsFillPauseCircleFill,
} from "react-icons/bs";
import { BiDownArrow, BiSearch } from "react-icons/bi";
import {
  MdOutlineDownloadForOffline,
  MdOutlinePersonAdd,
} from "react-icons/md";
import Header from "../HeaderNav/Header";
import { pausePlaying, startPlaying } from "../../adapters/setData";
import PlaylistHeading from "./PlaylistHeading";

const PlaylistDetails = () => {
  const { state, dispatch } = useSpotify();
  const {
    token,
    selectedPlaylist,
    playingState,
    selectedPlaylistData,
    currentlyPlayingTrack,
  } = state;
  const pausePlayer = () => {
    dispatch({ type: "setPlayingState", payload: false });
    pausePlaying(token);
  };
  const startPlayer = () => {
    dispatch({ type: "setPlayingState", payload: true });
    startPlaying(currentlyPlayingTrack, token);
  };

  useEffect(() => {
    if (selectedPlaylist !== null) {
      fetchPlaylist(token, selectedPlaylist).then((response) => {
        dispatch({ type: "setPlaylistData", payload: response });
      });
    }
  }, [dispatch, selectedPlaylist, token]);
  return (
    <div>
      {Object.keys(selectedPlaylistData).length > 0 && (
        <>
          <PlaylistHeading />
          <div className="flex mt-8 justify-between px-8">
            <div className="flex items-center gap-6">
              {selectedPlaylistData.tracks.length > 0 && (
                <div className="flex items-center gap-6">
                  {!playingState ? (
                    <BsFillPlayCircleFill
                      className="text-[#1ad760] text-[55px]"
                      onClick={() => startPlayer()}
                    />
                  ) : (
                    <BsFillPauseCircleFill
                      className="text-[#1ad760] text-[55px]"
                      onClick={() => pausePlayer()}
                    />
                  )}
                  <MdOutlineDownloadForOffline className="text-[#b3b3b3] text-[35px]" />
                </div>
              )}
              <MdOutlinePersonAdd className="text-[#b3b3b3] text-[35px]" />
              <BsThreeDots className="text-[#b3b3b3] text-[35px]" />
            </div>
            {selectedPlaylistData.tracks.length > 0 && (
              <div className="text-[#b3b3b3] text-[15px] flex items-center gap-5">
                <div className="text-[20px] hover:rounded-[50%] hover:bg-[#333] w-[30px] h-[30px] flex items-center justify-center hover:text-[#fff]">
                  <BiSearch className="" />
                </div>
                <div className="flex items-center gap-2">
                  <span>Custom order </span>
                  <span className="text-[#b3b3b3] text-[15px]">
                    <BiDownArrow className="text-[10px]" />
                  </span>
                </div>
              </div>
            )}
          </div>
          {selectedPlaylistData.tracks.length > 0 && <PlaylistTable />}
        </>
      )}
    </div>
  );
};

export default PlaylistDetails;
