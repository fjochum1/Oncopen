"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
/*

Copyright (c) 2019 - present AppSeed.us

*/
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../config/passport"));
const users_1 = __importDefault(require("../routes/users"));
const session_route_1 = __importDefault(require("../routes/session.route"));
//const patientRouter = __importDefault(require("../routes/patientRouter"))
const database_1 = require("./database");
// Instantiate express
const server = (0, express_1.default)();
server.use((0, compression_1.default)());
// Passport Config
(0, passport_2.default)(passport_1.default);
server.use(passport_1.default.initialize());
// Connect to sqlite
if (process.env.NODE_ENV !== 'test') {
    (0, database_1.connect)();
}
server.use((0, cors_1.default)());
server.use(express_1.default.json());
// Initialize routes middleware
server.use('/api/users', users_1.default);
server.use('/api/sessions', session_route_1.default);
//Ajout Lou
// server.use('api/patientRouter', patientRouter.default)
//

exports.default = server;
//# sourceMappingURL=index.js.map