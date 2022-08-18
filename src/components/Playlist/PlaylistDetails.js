import React, { useEffect } from "react";
import { fetchPlaylist } from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";
import "../../styles/body.css";
import PlaylistTable from "./PlaylistTable";

const PlaylistDetails = () => {
  const { state, dispatch } = useSpotify();
  const { token, selectedPlaylist, selectedPlaylistData } = state;

  useEffect(() => {
    if (selectedPlaylist !== null) {
      fetchPlaylist(token, selectedPlaylist).then((response) => {
        dispatch({ type: "setPlaylistData", payload: response });
        console.log(response);
      });
    }
  }, [dispatch, selectedPlaylist, token]);
  return (
    <div>
      {Object.keys(selectedPlaylistData).length > 0 && (
        <div className=" py- h-[75vh] overflow-scroll ">
          <div className="flex px-8 gap-8 py-5 bg-[#2b2b2b]">
            <img
              src={selectedPlaylistData.image?.url}
              alt="playlist"
              width={230}
              height={200}
            />
            <div className="pt-6">
              {selectedPlaylistData.isPublic && (
                <p className="uppercase text-[#fff] font-bold text-[12px] font-sans">
                  public playlist
                </p>
              )}
              <h1 className="text-[100px] text-[#fff] leading-[1em] mt-2 font-bold tracking-[-4px] font-sans">
                {selectedPlaylistData.name}
              </h1>
              <p className="text-[#b3b3b3] mt-4">
                {selectedPlaylistData.description}
              </p>
              <div className="flex gap-1 mt-1 text-[#b3b3b3] font-sans ">
                <span className="font-semibold">
                  {selectedPlaylistData.owner}
                </span>
                <span className="flex content-center mt-[-2px] font-black">
                  .
                </span>
                <span className="text-[14px] pt-[3px]">
                  {selectedPlaylistData?.tracks.length} songs&#65292;
                </span>
              </div>
            </div>
          </div>
          <PlaylistTable />
        </div>
      )}
    </div>
  );
};

export default PlaylistDetails;
