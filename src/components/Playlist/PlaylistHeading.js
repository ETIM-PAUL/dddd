import React from "react";
import { useSpotify } from "../../context/SpotifyContext";
import defaultImage from "../../assets/defaultImg.jpeg";
const PlaylistHeading = () => {
  const { state } = useSpotify();
  const { selectedPlaylistData } = state;

  return (
    <div className="flex  gap-8  py-6 px-8">
      <img
        src={
          selectedPlaylistData.image?.url
            ? selectedPlaylistData.image?.url
            : defaultImage
        }
        alt="playlist"
        width={230}
        height={200}
        className="object-contain"
      />

      <div className="pt-6 inline-grid items-end">
        {selectedPlaylistData.isPublic && (
          <p className="uppercase text-[#fff] font-bold text-[12px] font-sans">
            public playlist
          </p>
        )}
        <h1 className="text-[75px] text-[#fff] leading-[1em] my-1 font-bold tracking-[-4px] font-sans">
          {selectedPlaylistData.name}
        </h1>
        <p className="text-[#b3b3b3]">{selectedPlaylistData.description}</p>
        <div className="flex gap-1  text-[#b3b3b3] font-sans items-center ">
          <span className="font-bold text-[#fff] text-[14px]">
            {selectedPlaylistData.owner}
          </span>
          {selectedPlaylistData.tracks.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="flex items-center font-black mt-[-6px]">.</span>
              <span className="text-[14px] items-center mt-0">
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
