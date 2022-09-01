import React, { useEffect } from "react";
import { fetchPlaylists } from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";
import { Link } from "react-router-dom";

const Playlists = () => {
  const { state, dispatch } = useSpotify();

  const { playlists } = state;

  useEffect(() => {
    fetchPlaylists(state.token).then((response) =>
      dispatch({ type: "setPlaylists", payload: response })
    );
  }, [dispatch, state.token]);

  return (
    <div className="text-[gray]  mt-3">
      <ul>
        {playlists.map(({ name, id }) => {
          return (
            <Link to={`/playlist/${id}`} key={id}>
              <li
                onClick={() => dispatch({ type: "setPlaylist", payload: id })}
                className="text-[14px] hover:text-[#fff] hover:cursor-default py-2 font-medium font-sans"
              >
                {name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Playlists;
