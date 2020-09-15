import proxy, { ProxyOptions } from 'express-http-proxy';
import { ApiReverseProxy } from '../types/Config';
import { Router } from 'express';
import { Config } from '../config';
import logger from '../logging';
import { RequestOptions } from 'http';
import { getOnBehalfOfAccessToken } from '../auth/azureUtils';
import { Client } from 'openid-client';

const options = (api: ApiReverseProxy, authClient: Client): ProxyOptions => ({
  parseReqBody: true,
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    return new Promise<RequestOptions>((reject, resolve) => {
      getOnBehalfOfAccessToken(authClient, srcReq, api, 'graph').then(
        (access_token) => {
          if (proxyReqOpts && proxyReqOpts.headers) {
            proxyReqOpts.headers['Cookie'] = `isso-accesstoken=${access_token}`;
            return resolve(proxyReqOpts);
          } else {
            throw new Error('Could not set Authorization header for modiacontextholder proxy request');
          }
        },
        (error) => reject(error),
      );
    });
  },
  proxyReqPathResolver: (srcReq) => {
    logger.info(`Proxying request from '${srcReq.originalUrl} to '${api.url + srcReq.originalUrl}'`);
    return srcReq.originalUrl;
  },
});

const setup = (router: Router, authClient: Client, config: Config) => {
  const { path, url } = config.modiacontextReverseProxy;
  logger.info(`Setting up proxy for '${path}'`);
  router.use(`/${path}/*`, proxy(url, options(config.modiacontextReverseProxy, authClient)));
};

export default { setup };
