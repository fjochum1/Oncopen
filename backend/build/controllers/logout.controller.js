"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = void 0;
const activeSession_1 = __importDefault(require("../models/activeSession"));
const database_1 = require("../server/database");
const logoutUser = (req, res) => {
    const { token } = req.body;
    const activeSessionRepository = database_1.connection.getRepository(activeSession_1.default);
    activeSessionRepository.delete({ token })
        .then(() => res.json({ success: true }))
        .catch(() => {
        res.json({ success: false, msg: 'Token revoked' });
    });
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=logout.controller.js.map