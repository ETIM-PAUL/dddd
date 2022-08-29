import axios from "axios";
import { fetchCurrentlyPlaying } from "./getData";

export const changeVolume = async (token, value) => {
  try {
    await axios.put(
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

export const playerState = async (type, token) => {
  try {
    await axios.put(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        position_ms: 0,
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

export const skipTrack = async (type, token) => {
  try {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    fetchCurrentlyPlaying(token);
  } catch (error) {
    console.log(error);
  }
};
