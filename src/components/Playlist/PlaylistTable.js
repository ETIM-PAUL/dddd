import React from "react";
import { useSpotify } from "../../context/SpotifyContext";
import { BsClock } from "react-icons/bs";
import {
  durationToMinsAndSecs,
  getMonthDayYear,
} from "../../utils/utilFunctions";
import TrackInfo from "./TrackInfo";

const PlaylistTable = ({ tableHeading }) => {
  const { state } = useSpotify();
  const { selectedPlaylistData } = state;
  return (
    <div className="mt-4 w-[100%]  pb-8">
      {/* Playlist Table Headings */}
      <div className={tableHeading ? "sticky top-[70px] bg-[#181818]" : ""}>
        <div className="grid grid-cols-tableGridHead text-[#b3b3b3] uppercase text-[13px] px-[3.5rem] font-sans items-center pt-2">
          <div className="gap-4 flex items-center">
            <span className="text-[15px] font-bold">#</span>
            <span className="hover:text-[#fff] cursor-default">title</span>
          </div>
          <span className="hover:text-[#fff] cursor-default">album</span>
          <span className="hover:text-[#fff] cursor-default">date added</span>
          <span className="hover:text-[#fff] cursor-default">
            <BsClock className="text-[15px] cursor-default" />
          </span>
        </div>
        <hr
          className={
            tableHeading
              ? "border-t-[gray]  mt-2 mb-4"
              : "border-t-[gray] mt-2 mx-8 mb-4"
          }
        />
      </div>

      {/* Tracks Info */}
      {selectedPlaylistData?.tracks.map(
        (
          { id, album, image, addedOn, name, isExplicit, duration, artist },
          index
        ) => {
          return (
            <div
              className="grid grid-cols-tableGridBody text-[gray] uppercase text-[13px] font-sans px-[3.5rem] hover:bg-[#2b2b2b] hover:rounded-md z-20"
              key={id}
            >
              <TrackInfo
                id={id}
                index={index}
                image={image}
                name={name}
                artist={artist}
                isExplicit={isExplicit}
                type="playlist"
              />
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
