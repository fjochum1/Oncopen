"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrepareDB = exports.connect = exports.connection = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
/* eslint-disable import/no-mutable-exports */
const typeorm_1 = require("typeorm");
const activeSession_1 = __importDefault(require("../models/activeSession"));
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const patient_1 = __importDefault(require("../models/patient"));
if (!process.env.SQLITE_PATH) {
    throw new Error('SQLITE_PATH environment variable is not set.');
}
const options = {
    type: 'sqlite',
    database: process.env.SQLITE_PATH,
    entities: [user_1.default, activeSession_1.default, role_1.defaul, patient_1.default],
    logging: true,
};
const connect = async () => {
    try {
        const conn = await (0, typeorm_1.createConnection)(options);
        exports.connection = conn;
        console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
    }
    catch (err) {
        console.error("Failed to connect to the database. Error:", err);
    }
    return undefined;
};
exports.connect = connect;
const PrepareDB = () => new sqlite3_1.default.Database(':memory:');
exports.PrepareDB = PrepareDB;
//# sourceMappingURL=database.js.map
