import express from 'express';
import config from './config';
import setupLogging from './logging';
import cors from './cors';
import helmet from 'helmet';
import passport from 'passport';
import azure from './auth/azure';
import routes from './routes/routes';
import session from './session';

const server = express();
const PORT = config.server.port;

async function startApp() {
  try {
    setupLogging(server);

    // setup session
    await session.setup(server);

    // parse http body as json an attach to req object
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    // deafults for headers
    server.use(helmet());

    // cors policy
    server.use(cors);

    // setup passport and restore session if it exists
    server.use(passport.initialize());
    server.use(passport.session());

    // initialize azure client and azure passport strategy
    const azureAuthClient = await azure.client();
    const azureOidcStrategy = azure.strategy(azureAuthClient);
    passport.use('azureOidc', azureOidcStrategy);

    // serialize the req.user, and save to session
    passport.serializeUser((user, done) => done(null, user));
    // attach user object from session to req.user object
    passport.deserializeUser((user, done) => done(null, user));

    // setup routes
    server.use('/', routes.setup(azureAuthClient));

    // start server
    server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.error('Error during startup', error);
  }
}

startApp().catch(error => console.error(error));
