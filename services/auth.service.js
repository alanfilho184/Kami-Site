const axios = require('axios')
const { URLSearchParams } = require('url');
const DiscordOauth2 = require("discord-oauth2");

const oauth = new DiscordOauth2();

class authService {
    constructor() {
    }

    async getUserInfo(code) {
        const params = new URLSearchParams();
        params.append('client_id', `${process.env.clientId}`);
        params.append('client_secret', process.env.clientSecret);
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', `${process.env.oauthRedirectUri}`);
        params.append('scope', 'identify');

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }

        const response = await axios.post('https://discordapp.com/api/oauth2/token', params, { headers })
        const userInfo = await oauth.getUser(response.data.access_token)

        const config = {
            method: 'get',
            url: `${process.env.botApiUrl}/beta`,
            headers: {
                "Authorization": process.env.apiToken,
                "Content-Type": "application/json"
            },
            data: {
                "id": userInfo.id,
            }
        }

        const res = await axios(config)

        userInfo.isBeta = res.data.isBeta
        userInfo.avatarURL = `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png`

        return userInfo
    }

}

module.exports = authService