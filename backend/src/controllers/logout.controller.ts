import ActiveSession from '../models/activeSession';
import { connection } from '../server/database';

export const logoutUser = (req: any, res: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, msg: 'No token provided' });
    }

    // Extract the token from the header.
    // This assumes the header format is 'Bearer TOKEN_VALUE'.
    const token = authHeader.split(' ')[1];

    const activeSessionRepository = connection!.getRepository(ActiveSession);

    activeSessionRepository.delete({ token })
      .then(() => res.json({ success: true }))
      .catch(() => {
        res.json({ success: false, msg: 'Token revoked' });
      });
}
