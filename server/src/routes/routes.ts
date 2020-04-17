import authUtils from '../auth/utils';
import config from '../config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import passport from 'passport';
import reverseProxy from '../proxy/reverse-proxy';
import { decode } from 'jsonwebtoken';
import { Client } from 'openid-client';

const router = express.Router();

const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && authUtils.hasValidAccessToken(req)) {
    next();
  } else {
    if (req.session && req.query.oppgaveid) {
      req.session.redirectTo = req.url;
    }
    res.redirect('/login');
  }
};

const setup = (authClient: Client) => {
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

  // Static page
  router.use('/', express.static(path.join(__dirname, '../../../client/build')));

  router.use(ensureAuthenticated);

  // Protected routes
  router.get('/user', (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('Did not find user object attached to request');
      } else {
        const accessToken = req.user.tokenSets?.self.access_token;
        if (!accessToken) {
          throw new Error('Did not find token object attached to request');
        } else {
          const decodedToken = decode(accessToken, { complete: true });
          if (!decodedToken) {
            throw new Error('Could not decode token to get user information');
          } else {
            res.status(200).send((decodedToken as any).payload.name); // TODO: er det verdt å type opp denne responsen?
          }
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });

  router.get('/logout', (req: Request, res: Response) => {
    req.logOut();
    req.session?.destroy((error) => {
      if (!error) {
        if (config.azureAd.logoutRedirectUri) {
          res.status(200).send('logged out').redirect(config.azureAd.logoutRedirectUri);
        } else {
          res.status(200).send('logged out');
        }
      } else {
        res.status(500).send('Could not log out due to a server error');
      }
    });
  });

  reverseProxy.setup(router, authClient);

  router.use('/*', (req, res) => {
    res.status(404).send('Not found');
  });

  return router;
};

export default { setup };
