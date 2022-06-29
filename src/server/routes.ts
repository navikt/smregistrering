import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Client } from 'openid-client';

import logger from '../utils/logger';

import { hasValidAccessToken } from './auth/azureUtils';
import { Config } from './config';
import * as upstreamApiReverseProxy from './proxy/downstream-api-reverse-proxy';
import * as modiacontextholderReverseProxy from './proxy/modiacontextholder-reverse-proxy';

const router = express.Router();

const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated() && hasValidAccessToken(req, 'self')) {
        next();
    } else {
        if (req.session && (req.query.oppgaveid || req.query.sykmeldingid)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore . express-session spec allows setting session variables
            req.session.redirectTo = req.url;
        }

        logger.info('not logged in. redirecting to /login');
        logger.info(`is authenticated: ${req.isAuthenticated()} for request ${req.originalUrl}`);
        logger.info(`has valid access token: ${hasValidAccessToken(req, 'self')} for request ${req.originalUrl}`);

        res.redirect('/login');
    }
};

export function setup(authClient: Client, config: Config): express.Router {
    // Login routes
    router.get('/login', passport.authenticate('azureOidc', { failureRedirect: '/login' }));
    router.use('/callback', passport.authenticate('azureOidc', { failureRedirect: '/login' }), (req, res) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const redirectUrl = req.session?.redirectTo;
        if (redirectUrl) {
            logger.info(`succsessfully logged in. redirecting to ${redirectUrl}`);
            res.redirect(redirectUrl);
        } else {
            logger.info('succsessfully logged in, but no redirect url was present for the session. redirecting to "/"');
            res.redirect('/');
        }
    });

    router.use(ensureAuthenticated);

    // Proxy for /backend/*
    upstreamApiReverseProxy.setup(router, authClient, config);
    // Proxy for /modiacontextholder/*
    modiacontextholderReverseProxy.setup(router, authClient, config);

    return router;
}
