// Imports
const express = require("express");
const axios = require("axios");
require("dotenv").config({ path: ".env.local" });
const morgan = require("morgan");
const { generateRandomString } = require("../lib/random");

// Env Variables
const port = process.env.SERVER_PORT;
// const reactPort = process.env.REACT_PORT;
// const serverAddress = process.env.SERVER_ADDRESS;
const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const spotify_redirect_uri = `http://localhost:3000/auth/callback`;

// Create Server
const app = express();

// Middleware
app.use(morgan("dev"));

let access_token = "";

app.get("/auth/login", (req, res) => {
  const scope = "streaming user-read-email user-read-private";
  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
});

app.get("/auth/callback", (req, res) => {
  const code = req.query.code;
  const url = "https://accounts.spotify.com/api/token";
  const data = {
    code: code,
    redirect_uri: spotify_redirect_uri,
    grant_type: "authorization_code",
  };
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
        "base64"
      ),
    "Content-Type": "application/x-www-form-urlencoded",
  };
  // resposneType: "json",

  axios({
    method: "post",
    url: url,
    data: data,
    headers: headers,
    responseType: "json",
  })
    .then((response) => {
      access_token = response.data.access_token;
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/auth/token", (req, res) => {
  res.json({
    access_token: access_token,
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
