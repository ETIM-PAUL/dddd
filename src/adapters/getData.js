import axios from "axios";

export const fetchPlaylists = async (token) => {
  const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const data = response.data.items?.map(({ name, id }) => {
    return { name, id };
  });

  return data;
};
export const fetchPlaylist = async (token, playlist) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlist}`,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }
  );
  const playlistData = {
    id: response.data.id,
    image: response.data.images[1],
    isPublic: response.data.public,
    name: response.data.name,
    description: response.data.description,
    owner: response.data.owner.display_name,
    tracks: response.data.tracks.items.map((item) => ({
      id: item.track.id,
      added: item.added_at,
      color: item.primary_color,
      album: item.track.album.name,
      image: item.track.album.images[2],
      duration: item.track.duration_ms,
      artist: item.track.artists.map((artiste) => artiste.name),
    })),
  };
  console.log(response);
  return playlistData;
  // const data = playlists.data.items?.map(({ name, id }) => {
  //   return { name, id };
  // });

  // return data;
};
