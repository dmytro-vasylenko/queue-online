const axios = require("axios");

module.exports = {
    getUser: async google_token => {
        try {
            const user = (await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${google_token}`
            )).data;
            return user;
        } catch (error) {
            return false;
        }
    }
};
