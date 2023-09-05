"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubUser = exports.getGithubOathToken = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const getGithubOathToken = async ({ code, }) => {
    const rootUrl = 'https://github.com/login/oauth/access_token';
    const options = {
        client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        code,
    };
    const queryString = qs_1.default.stringify(options);
    try {
        const { data } = await axios_1.default.post(`${rootUrl}?${queryString}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const decoded = qs_1.default.parse(data);
        return decoded;
    }
    catch (err) {
        throw Error(err);
    }
};
exports.getGithubOathToken = getGithubOathToken;
const getGithubUser = async ({ access_token, }) => {
    try {
        const response = await (0, node_fetch_1.default)('https://api.github.com/user', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const data = await response.json();
        return data;
    }
    catch (err) {
        throw Error(err);
    }
};
exports.getGithubUser = getGithubUser;
//# sourceMappingURL=session.service.js.map