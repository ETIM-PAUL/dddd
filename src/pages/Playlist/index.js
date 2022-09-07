import React, { useEffect, useState } from "react";
import { fetchCurrentlyPlaying, fetchPlaylist } from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";
import "../../styles/body.css";
import PlaylistTable from "../../components/Playlist/PlaylistTable";
import { ImPlay3 } from "react-icons/im";
import { IoIosPause } from "react-icons/io";

import { BsThreeDots } from "react-icons/bs";
import { BiDownArrow, BiSearch } from "react-icons/bi";
import {
  MdOutlineDownloadForOffline,
  MdOutlinePersonAdd,
} from "react-icons/md";
import { playerState } from "../../adapters/setData";
import PlaylistHeading from "../../components/Playlist/PlaylistHeading";
import Header from "../../components/HeaderNav/Header";

const PlaylistDetails = ({ tableHeading, headerBg }) => {
  const { state, dispatch } = useSpotify();
  const [loading, setLoading] = useState(true);
  const {
    token,
    selectedPlaylist,
    playingState,
    selectedPlaylistData,
    currentlyPlayingTrack,
  } = state;

  const setPlayerState = (type) => {
    playerState(type, token, selectedPlaylistData.uri).then(() => {
      if (type === "pause") {
        dispatch({ type: "setPlayingState", payload: false });
      } else {
        dispatch({ type: "setPlayingState", payload: true });
        fetchCurrentlyPlaying(token).then((response) => {
          dispatch({ type: "setPlayingTrack", payload: response });
        });
      }
    });
  };

  useEffect(() => {
    if (selectedPlaylist !== null) {
      fetchPlaylist(token, selectedPlaylist).then((response) => {
        dispatch({ type: "setPlaylistData", payload: response });
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [dispatch, selectedPlaylist, token]);
  return (
    <>
      {loading ? (
        ""
      ) : (
        <div>
          {Object.keys(selectedPlaylistData).length > 0 && (
            <>
              <Header headerBg={headerBg} type="playlist" />
              <PlaylistHeading />
              <div className="pt-8 h-screen">
                <div className="flex justify-between mx-8">
                  <div className="flex items-center gap-6">
                    {selectedPlaylistData &&
                      selectedPlaylistData.tracks.length > 0 && (
                        <div className="flex items-center gap-6">
                          {currentlyPlayingTrack.uri !==
                            selectedPlaylistData.uri || !playingState ? (
                            <div className="w-[55px] h-[55px]">
                              <div className="w-[48px] h-[48px] rounded-[50%] bg-[#1ad760] hover:bg-[#5cc75c] flex items-center justify-center hover:w-[50px] hover:h-[50px]">
                                <ImPlay3
                                  className="text-black text-[25px] ml-px"
                                  onClick={() => setPlayerState("play")}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="w-[55px] h-[55px]">
                              <div className="w-[48px] h-[48px] rounded-[50%] bg-[#1ad760] hover:bg-[#5cc75c] flex items-center justify-center hover:w-[50px] hover:h-[50px]">
                                <IoIosPause
                                  className=" text-[25px] ml-px "
                                  onClick={() => setPlayerState("pause")}
                                />
                              </div>
                            </div>
                          )}
                          <MdOutlineDownloadForOffline className="text-[#b3b3b3] text-[35px]" />
                        </div>
                      )}
                    <MdOutlinePersonAdd className="text-[#b3b3b3] text-[35px]" />
                    <BsThreeDots className="text-[#b3b3b3] text-[35px]" />
                  </div>
                  {selectedPlaylistData?.tracks.length > 0 && (
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
                {selectedPlaylistData.tracks.length > 0 && (
                  <PlaylistTable tableHeading={tableHeading} />
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PlaylistDetails;
