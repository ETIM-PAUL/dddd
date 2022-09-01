import React from "react";
import { useSpotify } from "../../context/SpotifyContext";
import {
  durationToMinsAndSecs,
  mostPopularItems,
  mostPopularItemData,
  mostPopularItem,
  spaceArtistes,
} from "../../utils/utilFunctions";
import TrackInfo from "../Playlist/TrackInfo";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import SearchItemCategory from "./searchItemsCategory";

const SearchFilter = ({ title }) => {
  return (
    <div className=" border-none font-sans font-normal block ">
      <span className="text-white bg-[#222222] py-2 px-3 text-[14px] rounded-[20px] capitalize">
        {title}
      </span>
    </div>
  );
};

const SearchResult = ({ showResult }) => {
  const { state } = useSpotify();

  const { searchResult } = state;

  mostPopularItem(searchResult);

  return (
    <>
      {Object.keys(searchResult).length > 0 ? (
        <div className="pt-4 h-screen px-8 text-white">
          <div className="flex gap-3">
            <SearchFilter title="all" />
            <SearchFilter title="artists" />
            <SearchFilter title="podcasts &amp; shows" />
            <SearchFilter title="songs" />
            <SearchFilter title="playlists" />
            <SearchFilter title="albums" />
          </div>
          <div className="my-4 block md:flex md:w-[100%] md:mx-auto justify-between gap-6  font-sans">
            <section className="md:w-[40%] 2xl:w-[30%]">
              <p className="font-bold text-[25px]">Top result</p>
              <div className="my-2 block relative bg-[#181818] rounded-lg  h-[245px] hover:bg-[#222222]">
                <div className="p-4 block">
                  <img
                    src={mostPopularItemData.image}
                    alt="most popular"
                    className="w-24 h-24 rounded-lg"
                  />

                  <div className="relative grid font-sans my-4">
                    <strong className="text-[20px] md:text-[30px] font-bold truncate">
                      {mostPopularItemData.name}
                    </strong>
                    <span className="my-2 text-[gray] text-[13px] capitalize font-medium ">
                      {spaceArtistes(mostPopularItemData.artists, "search")}
                    </span>
                  </div>
                  <BsFillPlayCircleFill className="text-[#1ad760] text-[55px] hover: absolute bottom-6 right-5 hover:p-[1px]" />
                </div>
              </div>
            </section>
            <section className=" md:w-[60%] 2xl:w-[70%] ">
              <p className="font-bold text-[25px]">Songs</p>
              <div className="py-2 block relative bg-transparent rounded-lg h-[250px]">
                {mostPopularItems(searchResult.tracks)
                  .slice(0, 4)
                  .map(({ id, name, artists, album, duration_ms }) => {
                    return (
                      <div
                        className="flex justify-between px-[0.7rem] items-center hover:bg-[#2b2b2b] hover:rounded-md"
                        key={id}
                      >
                        <TrackInfo
                          id={id}
                          name={name}
                          artist={artists}
                          image={album?.images[2]}
                          type="search"
                        />
                        <span className="text-[#b3b3b3] py-1 self-center font-normal">
                          {durationToMinsAndSecs(duration_ms)}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </section>
          </div>
          <div className="pb-4">
            <SearchItemCategory title="artists" />
            <SearchItemCategory title="album" />
            <SearchItemCategory title="playlists" />
            <SearchItemCategory title="shows" />
            <SearchItemCategory title="episodes" />
          </div>
        </div>
      ) : (
        <div>No Result</div>
      )}
    </>
  );
};

export default SearchResult;
