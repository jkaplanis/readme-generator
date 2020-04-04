// require axios module
const axios = require("axios");

const api = {
  // Return promise to get user data from Github api call
  getUser(username) {
    return axios
      .get(`https://api.github.com/users/${username}`)
      .then(res => res.data);
  }
};

// export module
module.exports = api;
