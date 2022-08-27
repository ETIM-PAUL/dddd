import React from "react";
import { useSpotify } from "../../context/SpotifyContext";
import { BsClock } from "react-icons/bs";
import { MdExplicit } from "react-icons/md";
import {
  durationToMinsAndSecs,
  getMonthDayYear,
} from "../../utils/utilFunctions";

const PlaylistTable = () => {
  const { state } = useSpotify();
  const notPlaying = "text-[#fff] text-[15px] capitalize font-medium font-sans";
  const playing = "text-[#1ad760] text-[15px] capitalize font-medium font-sans";
  const { selectedPlaylistData, currentlyPlayingTrack } = state;
  return (
    <div className="mt-8 w-[100%] px-8">
      {/* Playlist Header */}
      <div className="grid grid-cols-tableGridHead text-[gray] uppercase text-[13px] font-sans mx-8 sticky top-[75px] z-30">
        <div className="gap-4 flex">
          <span className="text-[15px] font-bold">#</span>
          <span className="hover:text-[#fff] cursor-default">title</span>
        </div>
        <span className="hover:text-[#fff] cursor-default">album</span>
        <span className="hover:text-[#fff] cursor-default">date added</span>
        <span className="hover:text-[#fff] cursor-default">
          <BsClock className="text-[15px] cursor-default" />
        </span>
      </div>

      {/* Horizontal Divider */}
      <div className="mt-2 bg-[gray] h-[0.5px] my-5 sticky top-[100px] z-30" />

      {/* Tracks Info */}
      {selectedPlaylistData?.tracks.map(
        (
          { id, album, image, addedOn, name, isExplicit, duration, artist },
          index
        ) => {
          return (
            <div
              className="grid grid-cols-tableGridBody  text-[gray] uppercase text-[13px] font-sans px-8 hover:bg-[#2b2b2b] hover:rounded-md z-20"
              key={id}
            >
              <div className="gap-4 flex items-center">
                <span className="text-[#fff] py-1">{index + 1}</span>
                <div className="hover:text-[#fff] cursor-default flex gap-4 items-center">
                  <img
                    src={image.url}
                    alt="track"
                    width={45}
                    height={55}
                    className="my-2"
                  />
                  <div className="grid">
                    <span
                      className={
                        currentlyPlayingTrack.name === name
                          ? playing
                          : notPlaying
                      }
                    >
                      {name}
                    </span>
                    <div className="flex items-center gap-1">
                      {isExplicit ? (
                        <MdExplicit className="text-[18px]" />
                      ) : null}
                      <span className="text-[gray] text-[13px] capitalize font-medium font-sans">
                        {artist.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-[#b3b3b3] py-1 text-[13px] capitalize self-center font-normal">
                {album}
              </span>
              <span className="text-[#b3b3b3] py-1 self-center capitalize font-normal">
                {getMonthDayYear(addedOn)}
              </span>
              <span className="text-[#b3b3b3] py-1 self-center font-normal">
                {durationToMinsAndSecs(duration)}
              </span>
            </div>
          );
        }
      )}
    </div>
  );
};

export default PlaylistTable;
