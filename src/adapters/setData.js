import axios from "axios";

export const changeVolume = async (token, value) => {
  try {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(value),
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const startPlaying = async ({ id, name, artistes, image }, token) => {
  try {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/play",
      {},
      {
        position_ms: 0,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const pausePlaying = async (token) => {
  try {
    await axios.put(
      "https://api.spotify.com/v1/me/player/pause",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
