import url from 'url';
import { IncomingMessage, RequestOptions } from 'http';

import proxy, { ProxyOptions } from 'express-http-proxy';
import { Router, Request } from 'express';
import { Client } from 'openid-client';

import { Config } from '../config';
import { getOnBehalfOfAccessToken } from '../auth/azureUtils';
import { ApiReverseProxy } from '../types/Config';
import logger from '../logging';

const options = (api: ApiReverseProxy, authClient: Client): ProxyOptions => ({
    parseReqBody: true,
    proxyReqOptDecorator: async (proxyReqOpts: RequestOptions, req: Request) => {
        const oboAccessToken = await getOnBehalfOfAccessToken(authClient, req, api, 'proxy');

        if (oboAccessToken) {
            if (proxyReqOpts && proxyReqOpts.headers) {
                logger.info(
                    `on-behalf-of access_token has length: ${oboAccessToken.length} for request to ${req.originalUrl}`,
                );
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userResDecorator: (proxyRes: IncomingMessage, proxyResData: any, userReq: Request) => {
        logger.info(
            `Received response with statuscode: ${proxyRes.statusCode} from proxied request to ${userReq.method} ${userReq.originalUrl}`,
        );
        return proxyResData;
    },
    userResHeaderDecorator: (headers, _userReq, _userRes, proxyReq) => {
        const authHeader: number | string | string[] = proxyReq.getHeader('Authorization');
        if (authHeader === undefined) {
            logger.error(`Authorization header is undefined for request to ${proxyReq.path}`);
        } else if ((typeof authHeader === 'string' || typeof authHeader === 'object') && authHeader.length > 0) {
            logger.info(`Request has Authorization header for request to ${proxyReq.path}`);
        } else {
            logger.error(`Request does not have Authorization header for request to ${proxyReq.path}`);
        }
        return headers;
    },
});

export function setup(router: Router, authClient: Client, config: Config) {
    const { path, url } = config.downstreamApiReverseProxy;
    logger.info(`Setting up proxy for '${path}'`);
    router.use(`/${path}/*`, proxy(url, options(config.downstreamApiReverseProxy, authClient)));
}
