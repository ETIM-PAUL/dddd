import React, { useEffect } from "react";
import { fetchPlaylists } from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";

const Playlists = () => {
  const { state, dispatch } = useSpotify();

  useEffect(() => {
    console.log(fetchPlaylists(state.token));
    fetchPlaylists(state.token).then((response) =>
      dispatch({ type: "setPlaylists", payload: response })
    );
  }, [dispatch, state.token]);

  return (
    <div className="text-[gray]  mt-3">
      <ul>
        {state?.playlists.map(({ name, id }) => {
          return (
            <li
              key={id}
              className="text-[14px] hover:text-[#fff] hover:cursor-default py-2 font-black"
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Playlists;
