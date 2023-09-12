import express from 'express';
import { connection } from '../server/database';
import User from '../models/user';
import { checkToken } from '../config/safeRoutes';

const router = express.Router();

router.get('/', checkToken, async (req, res) => {
    const userID = req.body.userID;

    if (!userID) {
        return res.status(401).json({
            success: false,
            msg: 'No valid token provided.',
        });
    }

    try {
		const userRepository = connection!.getRepository(User);
        const user = await userRepository.findOne({ id: userID });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User not found',
            });
        }

        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, msg: 'An error occurred while processing the request.' });
    }
});

export default router;
