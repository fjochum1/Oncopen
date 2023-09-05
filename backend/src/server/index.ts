import 'dotenv/config';

import compression from 'compression';
import cors from 'cors';
/*

Copyright (c) 2019 - present AppSeed.us

*/
import express from 'express';
import passport from 'passport';

import initPassport from '../config/passport';
import routes from '../routes/users';
import patientRoute from '../routes/patients';
import sessionRoute from '../routes/session.route'
import { connect } from './database';

// Instantiate express
const server = express();
server.use(compression());

// Passport Config
initPassport(passport);
server.use(passport.initialize());

// Connect to sqlite
if (process.env.NODE_ENV !== 'test') {
  connect();
}

server.use(cors());
server.use(express.json());

// Initialize routes middleware
server.use('/api/users', routes);
server.use('/api/patients', patientRoute);
server.use('/api/sessions', sessionRoute)

export default server;
