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

export const playerState = async (type, token, context_uri, track_number) => {
  try {
    await axios.put(
      `https://api.spotify.com/v1/me/player/${type}`,
      {
        context_uri,
        position_ms: 0,
        offset: parseInt(track_number - 1),
      },
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
export const seekToPosition = async (token, value) => {
  try {
    await axios.put(
      `https://api.spotify.com/v1/me/player/seek?position_ms=${parseInt(
        value
      )}`,
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
