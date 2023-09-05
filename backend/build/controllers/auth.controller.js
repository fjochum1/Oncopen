"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubOauthHandler = void 0;
const session_service_1 = require("../services/session.service");
const user_service_1 = require("../services/user.service");
const githubOauthHandler = async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) {
            return res.json({ error: 'authorization code not provided' });
        }
        // Get access_token using code
        const { access_token } = await (0, session_service_1.getGithubOathToken)({ code });
        // Get user details using access token
        const userData = await (0, session_service_1.getGithubUser)({ access_token });
        const returnedUser = await (0, user_service_1.createUserWithToken)(userData);
        res.json({ user: returnedUser });
    }
    catch (err) {
        res.json({ 'error': err.message });
    }
};
exports.githubOauthHandler = githubOauthHandler;
//# sourceMappingURL=auth.controller.js.map