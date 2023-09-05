"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const user_1 = __importDefault(require("./models/user"));
const database_1 = require("./server/database");
const userId = process.argv[2];
const updatedRole = (_a = process.argv[3]) !== null && _a !== void 0 ? _a : "1";
const updateUser = async () => {
    await (0, database_1.connect)();
    const userRepository = database_1.connection.getRepository(user_1.default);
    userRepository.find({ id: userId }).then((user) => {
        if (!user.length) {
            console.error("No user exists with the given id");
            return;
        }
        const query = { id: user[0].id };
        const newValues = { user_role: updatedRole };
        userRepository
            .update(query, newValues)
            .then(() => console.log(`User updated successfully with role ${newValues.user_role}`))
            .catch((err) => console.error(`error in updating user: ${err.message}`));
    })
        .catch((err) => console.log(`error: ${err.message}`));
};
updateUser();
//# sourceMappingURL=update-role.js.map