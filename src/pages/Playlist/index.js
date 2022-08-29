import React, { useEffect, useState } from "react";
import { fetchPlaylist } from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";
import "../../styles/body.css";
import PlaylistTable from "../../components/Playlist/PlaylistTable";
import loadingGif from "../../assets/22.gif";

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
import { playerState } from "../../adapters/setData";
import PlaylistHeading from "../../components/Playlist/PlaylistHeading";

const PlaylistDetails = ({ tableHeading }) => {
  const { state, dispatch } = useSpotify();
  const [loading, setLoading] = useState(true);
  const { token, selectedPlaylist, playingState, selectedPlaylistData } = state;

  const setPlayerState = (type) => {
    playerState(type, token);
    if (type === "pause") {
      dispatch({ type: "setPlayingState", payload: false });
    } else dispatch({ type: "setPlayingState", payload: true });
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
        <img src={loadingGif} className="mx-auto mt-48" alt="loading-gif" />
      ) : (
        <div>
          {Object.keys(selectedPlaylistData).length > 0 && (
            <>
              <PlaylistHeading />
              <div className="pt-8 h-screen">
                <div className=" flex justify-between mx-8">
                  <div className="flex items-center gap-6">
                    {selectedPlaylistData.tracks.length > 0 && (
                      <div className="flex items-center gap-6">
                        {!playingState ? (
                          <BsFillPlayCircleFill
                            className="text-[#1ad760] text-[55px]"
                            onClick={() => setPlayerState("play")}
                          />
                        ) : (
                          <BsFillPauseCircleFill
                            className="text-[#1ad760] text-[55px]"
                            onClick={() => setPlayerState("pause")}
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
