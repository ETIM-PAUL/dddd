import React from "react";
import { useSpotify } from "../../context/SpotifyContext";

const PlaylistHeading = () => {
  const { state } = useSpotify();
  const { selectedPlaylistData } = state;

  return (
    <div className="flex  gap-8  py-6 px-8">
      <img
        src={selectedPlaylistData.image?.url}
        alt="playlist"
        width={230}
        height={200}
        className="shadow-2xl"
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
          <span className="font-bold text-[#fff] text-[14px]">
            {selectedPlaylistData.owner}
          </span>
          {selectedPlaylistData.tracks.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="flex content-center mt-[-2px] font-black">
                .
              </span>
              <span className="text-[14px] pt-[3px]">
                {selectedPlaylistData?.tracks.length} songs&#65292;
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeading;
