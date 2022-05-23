import { IncomingMessage } from 'http';
import * as os from 'os';

import { z } from 'zod';

import logger from '../utils/logger';
import { isLocalOrDemo } from '../utils/env';
export interface ModiaContext {
    navn: string;
    ident: string;
    aktivEnhet: string | null;
    enheter: { enhetId: string; navn: string }[];
}

export async function getModiaContext(req: IncomingMessage): Promise<ModiaContext> {
    if (isLocalOrDemo) {
        logger.warn('Using mocked modia context for local development (or demo)');
        return {
            navn: 'Johan J. Johansson',
            ident: '0129381203',
            enheter: [
                { enhetId: '0312', navn: 'NAV Sagene' },
                { enhetId: '0314', navn: 'NAV Fagene' },
            ],
            aktivEnhet: '0314',
        };
    }

    const veileder = await getVeileder(req);
    const aktivEnhet = await getAktivEnhet(req);

    return {
        aktivEnhet: aktivEnhet.aktivEnhet,
        navn: veileder.navn,
        ident: veileder.ident,
        enheter: veileder.enheter,
    };
}

function reqToFetchHeaders(req: IncomingMessage) {
    const headers = new Headers();
    Object.entries(req.headers).forEach(([name, value]) => {
        if (value) headers.append(name, Array.isArray(value) ? value.join(', ') : value);
    });
    return headers;
}

async function getVeileder(req: IncomingMessage): Promise<Veileder> {
    const url = `http://${os.hostname()}:${process.env.PORT ?? 3000}/${
        process.env['MODIACONTEXTHOLDER_PATH']
    }/decorator/v2`;

    logger.info(`Fetching veileder from Modia, url: ${url}`);

    const response = await fetch(url, { headers: reqToFetchHeaders(req) });

    if (!response.ok) {
        const errorMessage = `Modia context responded with ${response.status} ${
            response.statusText
        }, body: ${await response.text()}`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }

    const maybeVeileder = Veileder.safeParse(await response.json());

    if (maybeVeileder.success) {
        return maybeVeileder.data;
    } else {
        const errorMessage = `Unable to parse modia context response: ${maybeVeileder.error.message}`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }
}

async function getAktivEnhet(req: IncomingMessage): Promise<AktivEnhet> {
    const url = `http://${os.hostname()}:${process.env.PORT ?? 3000}/${
        process.env['MODIACONTEXTHOLDER_PATH']
    }/context/aktivenhet`;

    logger.info(`Fetching aktiv enhet from Modia, url: ${url}`);

    const response = await fetch(url, { headers: reqToFetchHeaders(req) });

    if (!response.ok) {
        throw new Error(`Modia aktiv enhet responded with ${response.status} ${response.statusText}`);
    }

    const maybeAktivEnhet = AktivEnhet.safeParse(await response.json());

    if (maybeAktivEnhet.success) {
        return maybeAktivEnhet.data;
    } else {
        throw new Error(`Unable to parse modia aktiv enhet response: ${maybeAktivEnhet.error.message}`);
    }
}

const Veileder = z.object({
    ident: z.string(),
    navn: z.string(),
    enheter: z.array(
        z.object({
            enhetId: z.string(),
            navn: z.string(),
        }),
    ),
});

const AktivEnhet = z.object({
    aktivEnhet: z.string().nullable(),
});

type Veileder = z.infer<typeof Veileder>;
type AktivEnhet = z.infer<typeof AktivEnhet>;
