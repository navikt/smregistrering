import { hasValidAccessToken } from '../auth/azureUtils';
import { Config } from '../config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import passport from 'passport';
import upstreamApiReverseProxy from '../proxy/downstream-api-reverse-proxy';
import modiacontextholderReverseProxy from '../proxy/modiacontextholder-reverse-proxy';
import { Client } from 'openid-client';

const router = express.Router();

const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && hasValidAccessToken(req, 'self')) {
    next();
  } else {
    if (req.session && req.query.oppgaveid) {
      req.session.redirectTo = req.url;
    }
    res.redirect('/login');
  }
};

const setup = (authClient: Client, config: Config) => {
  // Unprotected
  router.get('/is_alive', (_req, res) => res.send('Alive'));
  router.get('/is_ready', (_req, res) => res.send('Ready'));

  router.get('/login', passport.authenticate('azureOidc', { failureRedirect: '/login' }));
  router.use('/callback', passport.authenticate('azureOidc', { failureRedirect: '/login' }), (req, res) => {
    if (req.session?.redirectTo) {
      res.redirect(req.session.redirectTo);
    } else {
      res.redirect('/');
    }
  });

  // Protected routes
  router.use(ensureAuthenticated);

  // Static page
  router.use('/', express.static(path.join(__dirname, '../../../client/build')));

  upstreamApiReverseProxy.setup(router, authClient, config);
  modiacontextholderReverseProxy.setup(router, authClient, config);

  router.use('/*', (req, res) => {
    res.status(404).send('Not found');
  });

  return router;
};

export default { setup };
