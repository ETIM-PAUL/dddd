import React from "react";
import { useSpotify } from "../../context/SpotifyContext";
const SideBarComponent = ({ ...props }) => {
  const { dispatch } = useSpotify();

  return (
    <div
      className="flex gap-3 text-[gray] hover:text-white active:text-white hover:cursor-default py-2 self-center"
      onClick={() => {
        dispatch({ type: "setPlaylistData", payload: {} });
        dispatch({ type: "setPlaylist", payload: null });
        dispatch({ type: "setSearchValue", payload: "" });
        dispatch({ type: "setSearchResult", payload: {} });
        dispatch({ type: "setCategory", payload: null });
      }}
    >
      <span className="text-[25px]">{props.icon}</span>
      <span className="font-bold flex items-center text-[13px] font-sans">
        {props.title}
      </span>
    </div>
  );
};

export default SideBarComponent;
