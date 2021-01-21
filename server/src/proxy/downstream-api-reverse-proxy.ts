import { getOnBehalfOfAccessToken } from '../auth/azureUtils';
import { Config } from '../config';
import proxy, { ProxyOptions } from 'express-http-proxy';
import url from 'url';
import { Router, Request, Response, NextFunction } from 'express';
import { RequestOptions } from 'http';
import { Client } from 'openid-client';
import { ApiReverseProxy } from '../types/Config';
import logger from '../logging';

const options = (api: ApiReverseProxy, authClient: Client): ProxyOptions => ({
  parseReqBody: true,
  proxyReqOptDecorator: async (proxyReqOpts: RequestOptions, req: Request) => {
    const oboAccessToken = await getOnBehalfOfAccessToken(authClient, req, api, 'proxy');

    if (oboAccessToken) {
      if (proxyReqOpts && proxyReqOpts.headers) {
        logger.info(`Setting access_token as Authorization header for request to ${req.originalUrl}`);
        proxyReqOpts.headers['Authorization'] = `Bearer ${oboAccessToken}`;
      } else {
        throw new Error('Could not set Authorization header for downstream api proxy request');
      }
    } else {
      logger.error(`Could not get access token for request to ${req.originalUrl}.`);
    }

    return proxyReqOpts;
  },
  proxyReqPathResolver: (req: Request) => {
    const urlFromApi = url.parse(api.url);
    const pathFromApi = urlFromApi.pathname === '/' ? '' : urlFromApi.pathname;

    const urlFromRequest = url.parse(req.originalUrl);

    let pathFromRequest;
    if (urlFromRequest.pathname) {
      pathFromRequest = urlFromRequest.pathname.replace(`/${api.path}/`, '/');
    } else {
      logger.error('Error replacing downstream proxy prefix to "/"');
    }

    const queryString = urlFromRequest.query;
    const newPath =
      (pathFromApi ? pathFromApi : '') +
      (pathFromRequest ? pathFromRequest : '') +
      (queryString ? '?' + queryString : '');

    logger.info(`Proxying request from ${req.originalUrl} to ${newPath}`);
    return newPath;
  },
  userResDecorator: (proxyRes: Response, proxyResData: any, userReq: Request, _userRes: Response) => {
    logger.info(
      `Received response with statuscode: ${proxyRes.statusCode} from proxied request to ${userReq.method} ${userReq.originalUrl}`,
    );
    return proxyResData;
  },
});

const authHeaderCheckMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  if (authHeader?.length) {
    logger.info(`Authorization header is set for request to ${req.originalUrl}`);
  }
  next();
};

const setup = (router: Router, authClient: Client, config: Config) => {
  const { path, url } = config.downstreamApiReverseProxy;
  logger.info(`Setting up proxy for '${path}'`);
  router.use(
    `/${path}/*`,
    proxy(url, options(config.downstreamApiReverseProxy, authClient)),
    authHeaderCheckMiddleware,
  );
};

export default { setup };
