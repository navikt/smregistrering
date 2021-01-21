import { getOnBehalfOfAccessToken } from '../auth/azureUtils';
import { Config } from '../config';
import proxy, { ProxyOptions } from 'express-http-proxy';
import { URL } from 'url';
import { Router, Request, Response } from 'express';
import { RequestOptions } from 'http';
import { Client } from 'openid-client';
import { ApiReverseProxy } from '../types/Config';
import logger from '../logging';

const proxyPath = '/backend';

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
      const requestUrl = new URL(req.originalUrl);
      const newPath = requestUrl.pathname.replace(proxyPath, '') + requestUrl.search;

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
  logger.info(`Setting up proxy for ${proxyPath}`);
  router.use(`${proxyPath}*`, proxy(url, options(config.downstreamApiReverseProxy, authClient)));
}

export default { setup };
