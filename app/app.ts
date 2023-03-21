/* eslint-disable no-console */
import express from 'express';
import { connectToDatabase } from './database';
import passport from 'passport';
import { jwtStrategy } from './utils/jwt-strategy';
import cookieParser from 'cookie-parser';
import { middlewares } from './middlewares';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/graphql/auth', middlewares.graphql.graphQlAuthorization);
app.use(
  '/graphql',
  middlewares.passport.authenticate,
  middlewares.graphql.graphQl
);

const startServer = async () => {
  // db connect
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
