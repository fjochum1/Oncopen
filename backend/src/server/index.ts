import 'dotenv/config';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import passport from 'passport';

import initPassport from '../config/passport';
import routes from '../routes/users';
import sessionRoute from '../routes/session.route'
import patientRoute from '../routes/patient';
import patientGetRoute from '../routes/patientGet';
import patientDelete from '../routes/patientDelete';
import userGetRoute from '../routes/userGet';
import patientGetIdRoute from '../routes/patientGetId';
import medicalHistory from '../routes/medicalHistory'; 
import patientUpdate from '../routes/patientUpdate'

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

//const allowedOrigins = ['http://example.com'];

//const corsOptions: cors.CorsOptions = {
//  origin: (origin, callback) => {
//    if (!origin || allowedOrigins.includes(origin)) {
//      callback(null, true);
//    } else {
//      callback(new Error('Not allowed by CORS'));
//    }
//  },
//};

//server.use(cors(corsOptions));

server.use(cors());
server.use(express.json());

// Initialize routes middleware
server.use('/api/users', routes);
server.use('/api/sessions', sessionRoute)
server.use('/api/patient', patientRoute);
server.use('/api/patientGet', patientGetRoute);
server.use('/api/userGet', userGetRoute);
server.use('/api/patientGetId', patientGetIdRoute);
server.use('/api/medicalHistory', medicalHistory);
server.use('/api/patientDelete', patientDelete)
server.use('/api/patientUpdate', patientUpdate)



export default server;
