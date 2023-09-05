"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
/*

Copyright (c) 2019 - present AppSeed.us

*/
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const safeRoutes_1 = require("../config/safeRoutes");
const activeSession_1 = __importDefault(require("../models/activeSession"));
const user_1 = __importDefault(require("../models/user"));
const database_1 = require("../server/database");
const logout_controller_1 = require("../controllers/logout.controller");
// eslint-disable-next-line new-cap
const router = express_1.default.Router();
// Route: <HOST>:PORT/api/users/
const userSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().alphanum().min(4).max(15)
        .optional(),
    password: joi_1.default.string().required(),
});
router.post('/register', (req, res) => {
    // Joy Validation
    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }
    const { username, email, password } = req.body;
    const userRepository = database_1.connection.getRepository(user_1.default);
    userRepository.findOne({ email }).then((user) => {
        if (user) {
            res.json({ success: false, msg: 'Email already exists' });
        }
        else {
            bcrypt_1.default.genSalt(10, (_err, salt) => {
                bcrypt_1.default.hash(password, salt).then((hash) => {
                    const query = {
                        username,
                        email,
                        password: hash,
                    };
                    userRepository.save(query).then((u) => {
                        res.json({ success: true, userID: u.id, msg: 'The user was successfully registered' });
                    });
                });
            });
        }
    });
});
router.post('/login', (req, res) => {
    // Joy Validation
    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }
    const { email } = req.body;
    const { password } = req.body;
    const userRepository = database_1.connection.getRepository(user_1.default);
    const activeSessionRepository = database_1.connection.getRepository(activeSession_1.default);
    userRepository.findOne({ email }).then((user) => {
        if (!user) {
            return res.json({ success: false, msg: 'Wrong credentials' });
        }
        if (!user.password) {
            return res.json({ success: false, msg: 'No password' });
        }
        bcrypt_1.default.compare(password, user.password, (_err2, isMatch) => {
            if (isMatch) {
                if (!process.env.SECRET) {
                    throw new Error('SECRET not provided');
                }
                const token = jsonwebtoken_1.default.sign({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                }, process.env.SECRET, {
                    expiresIn: 86400, // 1 week
                });
                const query = { userId: user.id, token };
                activeSessionRepository.save(query);
                // Delete the password (hash)
                user.password = undefined;
                return res.json({
                    success: true,
                    token,
                    user,
                });
            }
            return res.json({ success: false, msg: 'Wrong credentials' });
        });
    });
});
router.post('/logout', safeRoutes_1.checkToken, logout_controller_1.logoutUser);
router.post('/checkSession', safeRoutes_1.checkToken, (_req, res) => {
    res.json({ success: true });
});
router.post('/all', safeRoutes_1.checkToken, (_req, res) => {
    const userRepository = database_1.connection.getRepository(user_1.default);
    userRepository.find({}).then((users) => {
        users = users.map((item) => {
            const x = item;
            x.password = undefined;
            return x;
        });
        res.json({ success: true, users });
    }).catch(() => res.json({ success: false }));
});
router.post('/edit', safeRoutes_1.checkToken, (req, res) => {
    const { userID, username, email } = req.body;
    const userRepository = database_1.connection.getRepository(user_1.default);
    userRepository.find({ id: userID }).then((user) => {
        if (user.length === 1) {
            const query = { id: user[0].id };
            const newvalues = { username, email };
            userRepository.update(query, newvalues).then(() => {
                res.json({ success: true });
            }).catch(() => {
                res.json({ success: false, msg: 'There was an error. Please contract the administrator' });
            });
        }
        else {
            res.json({ success: false, msg: 'Error updating user' });
        }
    });
});
// Used for tests (nothing functional)
router.get('/testme', (_req, res) => {
    res.status(200).json({ success: true, msg: 'all good' });
});
exports.default = router;
//# sourceMappingURL=users.js.map