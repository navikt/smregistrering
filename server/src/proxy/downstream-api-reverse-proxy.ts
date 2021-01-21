import { getOnBehalfOfAccessToken } from '../auth/azureUtils';
import { Config } from '../config';
import proxy, { ProxyOptions } from 'express-http-proxy';
import url from 'url';
import { Router, Request, Response } from 'express';
import { RequestOptions } from 'http';
import { Client } from 'openid-client';
import { ApiReverseProxy } from '../types/Config';
import logger from '../logging';

function options(api: ApiReverseProxy, authClient: Client): ProxyOptions {
  return {
    parseReqBody: true,
    proxyReqOptDecorator: async (proxyReqOpts: RequestOptions, req: Request) => {
      const oboAccessToken = await getOnBehalfOfAccessToken(authClient, req, api, 'proxy');

      if (oboAccessToken === undefined) {
        logger.error(`on-behalf-of access token is undefined for request to ${req.originalUrl}`);
      } else if (oboAccessToken.length === 0) {
        logger.error(`on-behalf-of access token length is "0" for request to ${req.originalUrl}`);
      } else if (!proxyReqOpts.headers) {
        logger.error(`Could not set Authorization header for request to ${req.originalUrl}`);
      } else {
        logger.info(`Setting access_token as Authorization header for request to ${req.originalUrl}`);
        proxyReqOpts.headers['Authorization'] = `Bearer ${oboAccessToken}`;
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
  };
}

function setup(router: Router, authClient: Client, config: Config) {
  const { url } = config.downstreamApiReverseProxy;
  logger.info(`Setting up proxy for '/backend/'`);
  router.use(`/backend/*`, proxy(url, options(config.downstreamApiReverseProxy, authClient)));
}

export default { setup };
