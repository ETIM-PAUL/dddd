import React from "react";
import { useSpotify } from "../../context/SpotifyContext";
import { notPlaying, playing } from "../../utils/globalConstants";
import { MdExplicit } from "react-icons/md";
import { spaceArtistes } from "../../utils/utilFunctions";

const TrackInfo = ({ ...props }) => {
  const { state } = useSpotify();

  const { currentlyPlayingTrack } = state;

  return (
    <div className="gap-4 flex items-center">
      {props.type === "playlist" && (
        <span className="text-[#fff] py-1">{props.index + 1}</span>
      )}
      <div className="hover:text-[#fff] cursor-default flex gap-4 items-center">
        <img
          src={props.image.url}
          alt="track"
          width={45}
          height={55}
          className="my-2"
        />
        <div className="grid">
          <span
            className={
              currentlyPlayingTrack?.name === props.name ? playing : notPlaying
            }
          >
            {props.name}
          </span>
          <div className="flex items-center gap-1">
            {props.isExplicit ? <MdExplicit className="text-[18px]" /> : null}
            <span className="text-[gray] text-[13px] capitalize font-medium font-sans">
              {spaceArtistes(props.artist, props.type)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackInfo;
