import React, { useEffect, useState, Suspense, lazy } from "react";
import { useSpotify } from "../../context/SpotifyContext";
import {
  durationToMinsAndSecs,
  mostPopularItem,
  mostPopularItemData,
  spaceArtistes,
} from "../../utils/utilFunctions";
import TrackInfo from "../Playlist/TrackInfo";

const SearchResult = ({ showResult }) => {
  const { state } = useSpotify();

  const { searchResult } = state;

  const mostPopularTracks = () => {
    searchResult.tracks.sort((a, b) =>
      a.popularity < b.popularity ? 1 : a.popularity > b.popularity ? -1 : 0
    );

    const tracksToDisplay = searchResult.tracks.slice(0, 4);
    return tracksToDisplay;
  };

  mostPopularItem(searchResult);

  return (
    <>
      {Object.keys(searchResult).length > 0 ? (
        <div className="pt-8 h-screen px-8">
          <div className="text-white block md:flex md:w-[95%] justify-between gap-6  font-sans">
            <section className=" w-[40%]">
              <p className="font-semibold text-[25px]">Top result</p>
              <div className="my-2 block relative bg-[#181818] rounded-lg  h-[245px]">
                <div className="p-4 block">
                  <img
                    src={mostPopularItemData.image}
                    alt="most popular"
                    className="w-24 h-24 rounded-lg"
                  />

                  <div className="relative grid font-sans my-4">
                    <strong className="text-[20px] md:text-[30px] font-bold ">
                      {mostPopularItemData.name}
                    </strong>
                    <span className="my-2 text-[gray] text-[13px] capitalize font-medium ">
                      {spaceArtistes(mostPopularItemData.artists, "search")}
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section className="flex-1 w-[60%]">
              <p className="font-semibold text-[25px]">Songs</p>
              <div className="py-2 block relative bg-transparent rounded-lg h-[250px]">
                {mostPopularTracks().map(
                  ({ id, name, artists, album, duration_ms }) => {
                    return (
                      <div
                        className="flex justify-between px-[0.7rem] items-center hover:bg-[#2b2b2b] hover:rounded-md"
                        key={id}
                      >
                        <Suspense fallback={<h1>Still Loading…</h1>}></Suspense>
                        <TrackInfo
                          key={id}
                          name={name}
                          artist={artists}
                          image={album.images[2]}
                          type="search"
                        />
                        <span className="text-[#b3b3b3] py-1 self-center font-normal">
                          {durationToMinsAndSecs(duration_ms)}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </section>

            {/* <div className="flex pb-16 pt-4 justify-between gap-[1.7rem]">
        {categories.slice(0, 4).map(({ id, name, icons }, i) => (
          <Category
            key={id}
            name={name}
            icons={icons}
            index={i}
            iconWidth={120}
          />
        ))}
      </div> */}
          </div>
        </div>
      ) : (
        <div>No Result</div>
      )}
    </>
  );
};

export default SearchResult;
