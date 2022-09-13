import React from "react";
import { useSpotify } from "../../context/SpotifyContext";
import {
  durationToMinsAndSecs,
  mostPopularItems,
} from "../../utils/utilFunctions";
import TrackInfo from "../Playlist/TrackInfo";
import { BsClock } from "react-icons/bs";

const TracksResult = ({ tableHeading, title }) => {
  const { state } = useSpotify();

  const { searchResult } = state;

  return (
    <div>
      <section className="">
        <div className={tableHeading ? "sticky top-[70px] bg-[#181818]" : ""}>
          <div className="grid grid-cols-searchTracksHead text-[#b3b3b3] uppercase text-[13px] px-[1.5rem] font-sans items-center pt-6">
            <div className="gap-4 flex items-center">
              <span className="text-[15px] font-bold">#</span>
              <span className="hover:text-[#fff] cursor-default">title</span>
            </div>
            <span className="hover:text-[#fff] cursor-default">album</span>
            <span className="hover:text-[#fff] cursor-default">
              <BsClock className="text-[15px] cursor-default" />
            </span>
          </div>
          <hr
            className={
              tableHeading
                ? "border-t-[gray]  mt-2 mb-4"
                : "border-t-[gray] mt-2 mx-3 mb-4"
            }
          />
        </div>
        <div className="py-2 block relative bg-transparent rounded-lg h-[250px]">
          {mostPopularItems(searchResult[title]).map(
            ({ id, name, artists, album, duration_ms, uri }, index) => {
              return (
                <div
                  className="grid grid-cols-searchTracksBody text-[gray] uppercase text-[13px] font-sans px-[.8rem] hover:bg-[#2b2b2b] hover:rounded-md z-20 mx-3"
                  key={id}
                >
                  <TrackInfo
                    id={id}
                    index={index}
                    name={name}
                    artist={artists}
                    album_uri={album.uri}
                    image={album?.images[2]}
                    type="searchTracks"
                    track_uri={uri}
                  />
                  <span className="text-[#b3b3b3] py-1 text-[13px] capitalize self-center font-normal">
                    {album.name}
                  </span>

                  <span className="text-[#b3b3b3] py-1 self-center font-normal">
                    {durationToMinsAndSecs(duration_ms)}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
};

export default TracksResult;
