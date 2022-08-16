import React from "react";
import { useSpotify } from "../../context/SpotifyContext";
import { BsClock } from "react-icons/bs";

const PlaylistTable = () => {
  const { state, dispatch } = useSpotify();
  const { token, selectedPlaylist, selectedPlaylistData } = state;
  return (
    <div className="mt-16 w-[100%]">
      <div className="row  flex justify-between text-[gray] uppercase text-[13px] font-sans px-12">
        <div className="gap-4 flex">
          <span>#</span>
          <span className="hover:text-[#fff] cursor-default">title</span>
        </div>
        <span className="hover:text-[#fff] cursor-default">album</span>
        <span className="hover:text-[#fff] cursor-default">date added</span>
        <span className="hover:text-[#fff] cursor-default">
          <BsClock className="text-[15px] cursor-default" />
        </span>
      </div>
      <div className="mt-3 bg-[gray] h-[0.5px]" />
      {selectedPlaylistData?.tracks.map(
        ({ id, album, image, duration, artist }, index) => {
          return (
            <div className="flex justify-between text-[gray] uppercase text-[13px] font-sans px-12">
              <div className="gap-4 flex">
                <span className="text-[#fff] py-1">{index + 1}</span>
                <div className="hover:text-[#fff] cursor-default">
                  <img
                    src={image.url}
                    alt="track"
                    width={40}
                    height={50}
                    className="my-2"
                  />
                </div>
              </div>
              <td className="text-[#fff] py-1">{artist}</td>
            </div>
          );
        }
      )}
      {/* <table className="">
        <tr className="uppercase text-[gray] font-sans text-[12px] flex justify-between px-4">
          <th>#</th>
          <th>title</th>
          <th>album</th>
          <th>date added</th>
        </tr>
        <tr className="">
          {selectedPlaylistData?.tracks.map(
            ({ id, album, image, duration, artist }, index) => {
              return (
                <>
                  <td className="text-[#fff] py-1">{index + 1}</td>;
                  <td className="text-[#fff] py-1">{artist}</td>;
                </>
              );
            }
          )}
        </tr>
      </table> */}
    </div>
  );
};

export default PlaylistTable;
