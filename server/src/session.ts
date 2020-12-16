import { Config } from './config';
import redis from 'redis';
import session from 'express-session';
import { Application } from 'express';
import logger from './logging';

const SESSION_MAX_AGE_MILLISECONDS = 12 * 60 * 60 * 1000; // 12 hours

const setup = (server: Application, config: Config): Promise<null> => {
  return new Promise((resolve, reject) => {
    server.set('trust proxy', 1);

    if (process.env.NODE_ENV === 'development') {
      logger.info('Using in-memory session storage');
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
      return resolve();
    } else {
      logger.info('Using Redis for session storage');
      const RedisStore = require('connect-redis')(session);
      const client = redis.createClient(config.redis.port, config.redis.host);

      client.unref();
      client.on('error', (error) => {
        logger.error('Error connecting to Redis');
        reject(error);
      });
      client.on('connect', () => {
        logger.info('Connected to Redis');
        return resolve();
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
