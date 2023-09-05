"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const user_1 = __importDefault(require("../models/user"));
const database_1 = require("../server/database");
exports.default = (pass) => {
    const opts = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: process.env.SECRET,
    };
    pass.use(new passport_jwt_1.Strategy(opts, async (jwtPayload, done) => {
        try {
            const userRepository = database_1.connection === null || database_1.connection === void 0 ? void 0 : database_1.connection.getRepository(user_1.default);
            const user = await (userRepository === null || userRepository === void 0 ? void 0 : userRepository.findOne(jwtPayload._doc._id));
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        }
        catch (err) {
            return done(err, false);
        }
    }));
};
//# sourceMappingURL=passport.js.map