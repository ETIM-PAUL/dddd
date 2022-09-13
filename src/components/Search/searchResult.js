import React, { useEffect, useState } from "react";
import { useSpotify } from "../../context/SpotifyContext";
import {
  durationToMinsAndSecs,
  mostPopularItems,
  mostPopularItemData,
  mostPopularItem,
} from "../../utils/utilFunctions";
import { IoIosPause } from "react-icons/io";
import TrackInfo from "../Playlist/TrackInfo";
import { ImPlay3 } from "react-icons/im";
import SearchItemCategory from "./searchItemsCategory";
import { fetchCurrentlyPlaying } from "../../adapters/getData";
import {
  playerState,
  playerStateTrack,
  playerStateTracks,
} from "../../adapters/setData";
import loading from "../../assets/22.gif";
import SearchFilter from "./SearchFilter";

const SearchResult = ({ tableHeading }) => {
  const { state, dispatch } = useSpotify();
  const [filter, setFilter] = useState("all");
  const [filtering, setFiltering] = useState(false);
  const { searchResult, token, currentlyPlayingTrack, playingState } = state;
  const playCollection = (type, albumUri, uri) => {
    playerStateTracks(type, token, albumUri, uri).then(() => {
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
    fetchCurrentlyPlaying(token).then((response) => {
      dispatch({ type: "setPlayingTrack", payload: response });
    });
  }, [dispatch, token]);
  return (
    <>
      {Object.keys(searchResult).length > 0 ? (
        <div className="pt-4 h-screen px-8 text-white">
          <div className="flex gap-3 sticky">
            <SearchFilter title="all" setFilter={setFilter} filter={filter} />
            <SearchFilter
              title="artists"
              setFilter={setFilter}
              setFiltering={setFiltering}
              filter={filter}
            />
            <SearchFilter
              title="podcasts &amp; shows"
              setFiltering={setFiltering}
              setFilter={setFilter}
              filter={filter}
            />
            <SearchFilter title="songs" setFilter={setFilter} filter={filter} />
            <SearchFilter
              title="playlists"
              setFiltering={setFiltering}
              setFilter={setFilter}
              filter={filter}
            />
            <SearchFilter
              title="albums"
              setFiltering={setFiltering}
              setFilter={setFilter}
              filter={filter}
            />
          </div>
          {(filter === "all" || !filtering) && (
            <>
              <div className="my-4 block md:flex md:w-[100%] md:mx-auto justify-between gap-6  font-sans">
                <section className="md:w-[40%] 2xl:w-[30%]">
                  <p className="font-bold text-[25px]">Top result</p>
                  <div className="my-2 block relative bg-[#181818] rounded-lg  h-[245px] hover:bg-[#222222] group">
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
                        <div className="my-2 bg-black w-fit rounded-[20px] flex justify-content items-center font-sans">
                          <span className="p-2 text-[#ddd] text-[12px] capitalize font-bold ">
                            {mostPopularItemData.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="w-[45px] h-[45px] rounded-[50%] bg-[#1ad760] hidden  absolute bottom-8 right-5 group-hover:flex  items-center justify-center hover:w-[47px] hover:h-[47px]">
                        {currentlyPlayingTrack?.id !== mostPopularItemData.id ||
                        !playingState ? (
                          <ImPlay3
                            className="text-black text-[25px] ml-px"
                            onClick={() =>
                              playCollection(
                                "play",
                                mostPopularItemData.album,
                                mostPopularItemData.uri
                              )
                            }
                          />
                        ) : (
                          <IoIosPause
                            className="text-black text-[25px] ml-px"
                            onClick={() =>
                              playCollection(
                                "pause",
                                mostPopularItemData.album,
                                mostPopularItemData.uri
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </section>
                <section className=" md:w-[60%] 2xl:w-[70%] ">
                  <p className="font-bold text-[25px] pl-10">Songs</p>
                  <div className="py-2 block relative bg-transparent rounded-lg h-[250px]">
                    {mostPopularItems(searchResult.tracks)
                      .slice(0, 4)
                      .map(
                        (
                          { id, name, artists, album, duration_ms, uri },
                          index
                        ) => {
                          return (
                            <div
                              className="flex justify-between px-[0.7rem] items-center hover:bg-[#2b2b2b] hover:rounded-md"
                              key={id}
                            >
                              <TrackInfo
                                id={id}
                                index={index}
                                track_uri={uri}
                                name={name}
                                album_uri={album.uri}
                                artist={artists}
                                image={album?.images[2]}
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
              </div>
            </>
          )}

          <div className="pb-4">
            {((filter === "artists" && filtering) || filter === "all") && (
              <SearchItemCategory title="artists" filter={filter} />
            )}
            {((filter === "albums" && filtering) || filter === "all") && (
              <SearchItemCategory title="album" filter={filter} />
            )}
            {((filter === "playlists" && filtering) || filter === "all") && (
              <SearchItemCategory title="playlists" filter={filter} />
            )}
            {((filter === "podcasts & shows" && filter) ||
              filter === "all") && (
              <SearchItemCategory title="shows" filter={filter} />
            )}
            {filter === "songs" && filtering && (
              <SearchItemCategory
                title="songs"
                tableHeading={tableHeading}
                filtering={filtering}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="text-white flex justify-center pt-16 font-sans font-bold text-[15px]">
          <img src={loading} alt="" />
        </div>
      )}
    </>
  );
};

export default SearchResult;
