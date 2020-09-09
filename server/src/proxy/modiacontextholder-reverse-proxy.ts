import proxy, { ProxyOptions } from 'express-http-proxy';
import { ModiacontextholderReverseProxy } from '../types/Config';
import { Router } from 'express';
import { Config } from '../config';

const options = (api: ModiacontextholderReverseProxy): ProxyOptions => ({
  parseReqBody: true,
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    if (proxyReqOpts && proxyReqOpts.headers && srcReq.user?.tokenSets.self) {
      proxyReqOpts.headers['Authorization'] = `Bearer ${srcReq.user?.tokenSets.self}`;
      return proxyReqOpts;
    } else {
      throw new Error('Could not set Authorization header for modiacontextholder-proxy request');
    }
  },
});

const setup = (router: Router, config: Config) => {
  const { path, url } = config.downstreamApiReverseProxy;
  router.use(`/${path}/*`, proxy(url, options(config.modiacontextReverseProxy)));
};

export default { setup };