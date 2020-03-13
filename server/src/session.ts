import config from './config';
import redis from 'redis';
import session from 'express-session';
import { Application } from 'express';

const SESSION_MAX_AGE_MILLISECONDS = 60 * 60 * 1000;

const setup = (server: Application) => {
  return new Promise((resolve, reject) => {
    server.set('trust proxy', 1);
    if (process.env.NODE_ENV === 'development') {
      server.use(
        session({
          cookie: {
            maxAge: SESSION_MAX_AGE_MILLISECONDS,
            sameSite: 'lax',
          },
          secret: config.server.sessionKey,
          name: config.server.cookieName,
          resave: false,
          saveUninitialized: true,
        }),
      );
      resolve();
    } else {
      const RedisStore = require('connect-redis')(session);
      const client = redis.createClient(config.redis.port, config.redis.host);

      client.unref();
      client.on('error', () => {
        reject();
      });
      client.on('ready', () => {
        resolve();
      });

      const store = new RedisStore({
        client: client,
        disableTouch: true,
      });

      server.use(
        session({
          cookie: {
            maxAge: SESSION_MAX_AGE_MILLISECONDS,
            secure: true,
            httpOnly: true,
            sameSite: 'lax',
          },
          name: config.server.cookieName,
          saveUninitialized: true,
          secret: config.server.sessionKey,
          store: store,
          resave: false,
        }),
      );
    }
  });
};

export default { setup };
