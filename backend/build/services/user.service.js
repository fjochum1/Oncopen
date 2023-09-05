"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserWithToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const activeSession_1 = __importDefault(require("../models/activeSession"));
const database_1 = require("../server/database");
const constants_1 = require("../constants");
const createUserWithToken = async (userData) => {
    const userRole = constants_1.DEFAULT_ROLE;
    const userRepository = database_1.connection.getRepository(user_1.default);
    const activeSessionRepository = database_1.connection.getRepository(activeSession_1.default);
    const roleRepository = database_1.connection.getRepository(role_1.default);
    const { login: username, email } = userData;
    let requiredUser = null;
    const user = await userRepository.findOne({ username });
    const role = await roleRepository.findOne({ name: userRole });
    if (!role) {
        throw new Error(`no role exists for ${userRole} in db`);
    }
    if (user) {
        requiredUser = user;
    }
    else {
        const query = {
            username,
            email,
            user_role: role.id
        };
        const u = await userRepository.save(query);
        requiredUser = u;
    }
    if (!process.env.SECRET) {
        throw new Error("SECRET not provided");
    }
    if (requiredUser) {
        const token = jsonwebtoken_1.default.sign({
            id: requiredUser.id,
            username: requiredUser.username,
        }, process.env.SECRET, {
            expiresIn: 86400, // 1 week
        });
        const query = { userId: requiredUser.id, token };
        activeSessionRepository.save(query);
        requiredUser.token = token;
    }
    return requiredUser;
};
exports.createUserWithToken = createUserWithToken;
//# sourceMappingURL=user.service.js.map