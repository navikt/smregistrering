import { RequestOptions } from 'http';

import proxy, { ProxyOptions } from 'express-http-proxy';
import { Router } from 'express';
import { Client } from 'openid-client';

import { ApiReverseProxy } from '../types/Config';
import { Config } from '../config';
import logger from '../../utils/logger';
import { getOnBehalfOfAccessToken } from '../auth/azureUtils';

const options = (api: ApiReverseProxy, authClient: Client): ProxyOptions => ({
    parseReqBody: true,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        return new Promise<RequestOptions>((resolve, reject) => {
            getOnBehalfOfAccessToken(authClient, srcReq, api, 'graph').then(
                (access_token) => {
                    if (proxyReqOpts && proxyReqOpts.headers && srcReq.user?.tokenSets.self.access_token) {
                        // Need to set self-token as Authorization header and graph-token as isso-accesstoken cookie
                        // for modicontextholder to work
                        proxyReqOpts.headers['Authorization'] = `Bearer ${srcReq.user?.tokenSets.self.access_token}`;
                        proxyReqOpts.headers['Cookie'] = `isso-accesstoken=${access_token}`;
                        return resolve(proxyReqOpts);
                    } else {
                        throw new Error(
                            'Could not set Authorization header and Cookie for modiacontextholder proxy request',
                        );
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

export function setup(router: Router, authClient: Client, config: Config) {
    const { path, url } = config.modiacontextReverseProxy;
    logger.info(`Setting up proxy for '${path}'`);
    router.use(`/${path}/*`, proxy(url, options(config.modiacontextReverseProxy, authClient)));
}
