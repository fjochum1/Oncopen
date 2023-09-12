import { NextFunction, Request, Response } from 'express';
import ActiveSession from '../models/activeSession';
import { connection } from '../server/database';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const activeSessionRepository = connection!.getRepository(ActiveSession);
  activeSessionRepository.find({ token }).then((session) => {
    if (session.length === 1) {
	  req.body.userID = session[0].userId;
      return next();
    }
    return res.json({ success: false, msg: 'User is not logged on' });
  });
};
