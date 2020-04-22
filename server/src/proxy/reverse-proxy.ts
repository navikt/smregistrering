import { getOnBehalfOfAccessToken } from '../auth/azureUtils';
import { Config } from '../config';
import proxy, { ProxyOptions } from 'express-http-proxy';
import url from 'url';
import { Router, Request } from 'express';
import { RequestOptions } from 'http';
import { Client } from 'openid-client';
import { ReverseProxy } from '../types/Config';

const options = (api: ReverseProxy, authClient: Client): ProxyOptions => ({
  parseReqBody: true,
  proxyReqOptDecorator: (proxyReqOpts: RequestOptions, req: Request) => {
    return new Promise<RequestOptions>((resolve, reject) =>
      getOnBehalfOfAccessToken(authClient, req, api).then(
        (access_token) => {
          console.log('FROM OPTIONS: access_token: ' + access_token);
          if (proxyReqOpts && proxyReqOpts.headers) {
            proxyReqOpts.headers['Authorization'] = `Bearer ${access_token}`;
            return resolve(proxyReqOpts);
          } else {
            throw new Error('Could not set Authorization header for proxy request');
          }
        },
        (error) => reject(error),
      ),
    );
  },
  proxyReqPathResolver: (req: Request) => {
    const urlFromApi = url.parse(api.url);
    const pathFromApi = urlFromApi.pathname === '/' ? '' : urlFromApi.pathname;

    const urlFromRequest = url.parse(req.originalUrl);

    let pathFromRequest;
    if (urlFromRequest.pathname) {
      pathFromRequest = urlFromRequest.pathname.replace(`/${api.path}/`, '/');
    } else {
      console.error('Error replacing downstream proxy prefix to "/"');
    }

    const queryString = urlFromRequest.query;
    const newPath =
      (pathFromApi ? pathFromApi : '') +
      (pathFromRequest ? pathFromRequest : '') +
      (queryString ? '?' + queryString : '');

    console.log(`Proxying request from '${req.originalUrl}' to '${stripTrailingSlash(urlFromApi.href)}${newPath}'`);
    return newPath;
  },
});

const stripTrailingSlash = (str: string): string => (str.endsWith('/') ? str.slice(0, -1) : str);

const setup = (router: Router, authClient: Client, config: Config) => {
  const { path, url } = config.reverseProxy;

  router.use(`/${path}/*`, proxy(url, options(config.reverseProxy, authClient)));
};

export default { setup };
