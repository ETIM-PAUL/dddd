import axios from "axios";

export const fetchPlaylists = async (token) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data.items?.map(({ name, id }) => {
      return { name, id };
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchPlaylist = async (token, playlist) => {
  try {
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
      image: response.data.images[0],
      isPublic: response.data.public,
      name: response.data.name,
      description: response.data.description,
      owner: response.data.owner.display_name,
      tracks: response.data.tracks.items.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        isExplicit: item.track.explicit,
        addedOn: item.added_at,
        color: item.primary_color,
        album: item.track.album.name,
        image: item.track.album.images[0],
        duration: item.track.duration_ms,
        artist: item.track.artists.map((artiste) => artiste.name),
      })),
    };
    return playlistData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCurrentlyPlaying = async (token) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data !== "") {
      const { item } = response.data;
      // console.log(item);
      const currentlyPlaying = {
        id: item.id,
        name: item.name,
        artistes: item.artists.map((artiste) => artiste.name),
        duration: item.duration_ms,
        image: item.album.images[2].url,
      };
      return currentlyPlaying;
    } else return null;
  } catch (error) {
    console.log(error);
  }

  // return data;
};
export const fetchPlayerState = async (token) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (response.data !== "") {
      const playerState = {
        isPlaying: response.data.is_playing,
        volume: response.data.device.volume_percent,
      };

      return playerState;
    } else {
      const playerState = {
        isPlaying: false,
        volume: 10,
      };

      return playerState;
    }
  } catch (error) {
    console.log(error);
  }

  // return data;
};
export const fetchCategories = async (token) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/categories?limit=50&offset=1",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data.categories.items?.map(({ name, id, icons }) => {
      return { name, id, icons };
    });
    // console.log(response.data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
