import express from 'express';
import setupLogging from './logging';
import helmet from 'helmet';
import passport from 'passport';
import azure from './auth/azure';
import routes from './routes/routes';
import session from './session';
import loadConfig from './config';
import setupCors from './cors';
import * as iotsPromise from 'io-ts-promise';
import { User } from './types/User';
import logger from './logging';

async function startApp() {
  try {
    const config = await loadConfig();

    const server = express();

    // parse http body as json an attach to req object
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    // deafults for headers
    server.use(helmet());

    // cors policy
    setupCors(server, config);

    // setup session
    await session.setup(server, config);

    // setup passport and restore session if it exists
    server.use(passport.initialize());
    server.use(passport.session());

    // initialize azure client and azure passport strategy
    const azureAuthClient = await azure.client(config);
    const azureOidcStrategy = azure.strategy(azureAuthClient, config);
    passport.use('azureOidc', azureOidcStrategy);

    // serialize the req.user, and save to session
    passport.serializeUser((user, done) => done(null, user));
    // type check the user object returned from session storage
    // attach user object from session to req.user object
    passport.deserializeUser((user, done) => {
      iotsPromise.decode(User, user).then((user) => done(null, user));
    });

    // setup routes
    server.use('/', routes.setup(azureAuthClient, config));

    // start server
    const PORT = config.server.port;
    server.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
  } catch (error) {
    if (iotsPromise.isDecodeError(error)) {
      logger.error('io-ts decode error. Are all required environment variables present?');
    } else {
      logger.error('Error during startup', error);
    }
  }
}

startApp();
