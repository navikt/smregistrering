import * as https from 'https';
import { RequestOptions } from 'https';
import { Readable } from 'stream';

import { NextApiRequest, NextApiResponse } from 'next';

import logger from '../utils/logger';
import { getAzureAdAccessToken } from '../auth/azureTokens';

import { stream2buffer } from './stream2buffer';

interface Options {
    req: NextApiRequest;
    res: NextApiResponse;
    allowedAPIs: string[];
    backend: string;
    backendHostname: string;
    backendClientId: string;
}

export async function proxyRequest(options: Options): Promise<void> {
    const rewrittenPath = options.req.url!.replace(`/api/${options.backend}`, '');
    const api = `${options.req.method} ${rewrittenPath}`;
    if (!options.allowedAPIs.includes(cleanPath(api))) {
        logger.warn(`404 Unknown API: ${api}, clean path: ${cleanPath(api)}`);
        options.res.status(404);
        options.res.send(null);
        return;
    }

    const subjectToken = options.req.headers.authorization!.split(' ')[1];
    const bearerToken = await getAzureAdAccessToken(subjectToken, options.backendClientId);

    const requestOptions: RequestOptions = {
        hostname: options.backendHostname,
        port: 443,
        path: rewrittenPath,
        method: options.req.method,
        headers: {},
    };

    const headersToSkip = ['host', 'cookie', 'authorization'];
    for (const headersKey in options.req.headers) {
        if (!headersToSkip.includes(headersKey.toLowerCase())) {
            requestOptions.headers![headersKey] = options.req.headers[headersKey];
        }
    }
    requestOptions.headers!['Authorization'] = `Bearer ${bearerToken}`;

    const stream = Readable.from(options.req);
    const bodyin = await stream2buffer(stream);
    const backendReq = https.request(requestOptions, (proxyRequestResponse) => {
        if (proxyRequestResponse.statusCode != null) {
            options.res.status(proxyRequestResponse.statusCode);
        }
        for (const headersKey in proxyRequestResponse.headers) {
            options.res.setHeader(headersKey, proxyRequestResponse.headers[headersKey]!);
        }

        proxyRequestResponse.on('data', (data: unknown) => {
            options.res.write(data);
        });
        proxyRequestResponse.on('error', (err) => {
            logger.error(`Proxy error: ${err.message}, ${err.stack}`);
        });
        proxyRequestResponse.on('end', () => {
            options.res.end();
        });
    });

    backendReq.write(bodyin);
    backendReq.end();
}

const UUID = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;
const OPPGAVE_OR_HPR = /[0-9]{7,9}/;

export function cleanPath(value: string): string {
    return value?.replace(UUID, '[uuid]').replace(OPPGAVE_OR_HPR, '[id|hpr]');
}
