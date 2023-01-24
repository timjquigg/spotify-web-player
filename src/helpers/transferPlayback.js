import axios from "axios";

export default function transferPlayback(deviceId, token) {
  axios({
    method: "put",
    url: "https://api.spotify.com/v1/me/player",
    data: {
      device_ids: [deviceId],
      play: true,
    },
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    responseType: "json",
  });
}
