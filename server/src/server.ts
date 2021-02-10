import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import azure from './auth/azure';
import routes from './routes/routes';
import session from './session';
import loadConfig from './config';
import setupCors from './cors';
import * as iotsPromise from 'io-ts-promise';
import logger from './logging';
import path from 'path';

// for demo app running on nais labs
function startDemoApp() {
  const server = express();

  // Nais routes
  server.get('/is_alive', (_req, res) => res.send('Alive'));
  server.get('/is_ready', (_req, res) => res.send('Ready'));

  // Static content
  server.use('/', express.static(path.join(__dirname, '../../client/build')));
  server.use('*', (_req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../../client/build') });
  });

  // start server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
}

async function startApp() {
  try {
    const config = await loadConfig();

    const server = express();

    // parse http body as json an attach to req object
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    // deafults for headers
    server.use(
      helmet({
        contentSecurityPolicy: false,
      }),
    );

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
    passport.deserializeUser((user, done) => done(null, user as Express.User));

    // setup routes
    server.use('/', routes.setup(azureAuthClient, config));

    // start server
    const PORT = config.server.port;
    server.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
  } catch (error) {
    if (iotsPromise.isDecodeError(error)) {
      logger.error('io-ts decode error. Are all required environment variables present?');
    } else if (error.code === 'ETIMEDOUT') {
      logger.error('ETIMEDOUT: Request timed out');
    } else {
      logger.error('Error during startup', error.message);
    }
  }
}

if (process.env.IS_NAIS_LABS_DEMO === 'true') {
  startDemoApp();
} else {
  startApp();
}
