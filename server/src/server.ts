import path from 'path';

import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import { z } from 'zod';

import azure from './auth/azure';
import loadConfig from './config';
import logger from './logging';
import * as routes from './routes/routes';
import session from './session';
import setupCors from './cors';

// for demo app running on nais labs
function startDemoApp() {
    const server = express();

    // Nais routes
    server.get('/is_alive', (_req, res) => res.send('Alive'));
    server.get('/is_ready', (_req, res) => res.send('Ready'));

    // Static content
    // server.use('/', express.static(path.join(__dirname, './build')));
    // server.use('*', (_req, res) => {
    //     res.sendFile('index.html', { root: path.join(__dirname, './build') });
    // });

    // start server
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
}

async function startApp() {
    try {
        const config = loadConfig();
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
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            logger.error('zod parse error. Are all required environment variables present?');
            logger.error(error);
        } else {
            logger.error('Unknown startup error');
            logger.error(error);
        }
    }
}

if (process.env.IS_NAIS_LABS_DEMO === 'true') {
    startDemoApp();
} else {
    startApp();
}
