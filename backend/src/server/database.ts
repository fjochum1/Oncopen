import sqlite3 from 'sqlite3';
/* eslint-disable import/no-mutable-exports */
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import ActiveSession from '../models/activeSession';
import User from '../models/user';
import Role from '../models/role';
import Patient from '../models/patient';
import Consultation from '../models/consultation';

if (!process.env.SQLITE_PATH) {
  throw new Error('SQLITE_PATH environment variable is not set.');
}

const options: ConnectionOptions = {
  type: 'sqlite',
  database: process.env.SQLITE_PATH,
  entities: [User, ActiveSession, Role, Patient, Consultation],
  logging: true
};

export let connection : Connection | undefined;

export const connect = async (): Promise<Connection | undefined> => {
  try {
    const conn = await createConnection(options);
    connection = conn;
    console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
  } catch (err) {
    console.error("Failed to connect to the database. Error:", err);
  }
  return undefined;
};

export const PrepareDB = () => new sqlite3.Database(':memory:');
