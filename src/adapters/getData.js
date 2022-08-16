import axios from "axios";

export const fetchPlaylists = async (token) => {
  const playlists = await axios.get("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const data = playlists.data.items?.map(({ name, id }) => {
    return { name, id };
  });

  return data;
};
