// Spotify Client ID and redirect URI
const clientId = "deca63a4222f4471856891dec379d5ba";
const redirectUri = "http://space_jammming.surge.sh";

// user's access token
let accessToken;

const Spotify = {
  //get token method
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    //check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      let expiresIn = Number(expiresInMatch[1]);

      //clear parameters allowing us to grab a new access token when it expires.
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

      window.location = accessUrl;
    }
  },

  // add search method for Spotify API
  async search(term) {
    const accessToken = Spotify.getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  // add save playlist method
  async savePlaylist(listName, trackUris) {
    if (!listName || !trackUris.length) {
      return;
    }
    // create variables
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userID;

    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: headers,
    });
    const jsonResponse = await response.json();
    userID = jsonResponse.id;
    const response_1 = await fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ name: listName }),
      }
    );
    const jsonResponse_1 = await response_1.json();
    const playlistID = jsonResponse_1.id;
    return fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ uris: trackUris }),
      }
    );
  }, // end of savePlaylist method
};

export default Spotify;
