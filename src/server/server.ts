import express from 'express';
import next from 'next';
import passport from 'passport';
import helmet from 'helmet';
import { z } from 'zod';

import logger from '../utils/logger';

import loadConfig from './config';
import setupCors from './cors';
import * as session from './session';
import * as routes from './routes';
import * as azure from './auth/azure';

const port = parseInt(process.env.PORT ?? '3000', 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    const server = express();

    // Nais routes
    server.get('/internal/is_alive', (_req, res) => res.send('Alive'));
    server.get('/internal/is_ready', (_req, res) => res.send('Ready'));

    if (process.env.NODE_ENV === 'production' && process.env.IS_NAIS_LABS_DEMO !== 'true') {
        await setupApp(server);
    }

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});

async function setupApp(server: express.Express) {
    try {
        const config = loadConfig();

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
