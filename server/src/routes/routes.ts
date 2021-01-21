import { hasValidAccessToken } from '../auth/azureUtils';
import { Config } from '../config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import passport from 'passport';
import upstreamApiReverseProxy from '../proxy/downstream-api-reverse-proxy';
import modiacontextholderReverseProxy from '../proxy/modiacontextholder-reverse-proxy';
import { Client } from 'openid-client';
import logger from '../logging';

const router = express.Router();

const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`is authenticated: ${req.isAuthenticated()} for request ${req.originalUrl}`);
  logger.info(`has valid access token: ${hasValidAccessToken(req, 'self')} for request ${req.originalUrl}`);

  if (req.isAuthenticated() && hasValidAccessToken(req, 'self')) {
    next();
  } else {
    if (req.session && req.query.oppgaveid) {
      req.session.redirectTo = req.url;
    }
    logger.info('not logged in. redirecting to /login');
    res.redirect('/login');
  }
};

const setup = (authClient: Client, config: Config) => {
  // Unprotected routes
  // Nais routes
  router.get('/is_alive', (_req, res) => res.send('Alive'));
  router.get('/is_ready', (_req, res) => res.send('Ready'));

  // Login routes
  router.get('/login', passport.authenticate('azureOidc', { failureRedirect: '/login' }));
  router.use('/callback', passport.authenticate('azureOidc', { failureRedirect: '/login' }), (req, res) => {
    if (req.session?.redirectTo) {
      logger.info(`succsessfully logged in. redirecting to ${req.session.redirectTo}`);
      res.redirect(req.session.redirectTo);
    } else {
      logger.info('succsessfully logged in. redirecting to "/"');
      res.redirect('/');
    }
  });

  // Protected routes from this point
  router.use(ensureAuthenticated);

  // Proxy for /backend/*
  upstreamApiReverseProxy.setup(router, authClient, config);
  // Proxy for /modiacontextholder/*
  modiacontextholderReverseProxy.setup(router, authClient, config);

  // Static content
  router.use('/', express.static(path.join(__dirname, '../../../client/build')));
  router.use('*', (_req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../../../client/build') });
  });

  return router;
};

export default { setup };
