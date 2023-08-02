import { z } from 'zod'
import { logger } from '@navikt/next-logger'
import { grantAzureOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall'

import { getServerEnv, isLocalOrDemo } from '../utils/env'

export interface ClientError<T> {
    errorType: T
    message: string
}

export interface ModiaContext {
    navn: string
    ident: string
    aktivEnhet: string | null
    enheter: { enhetId: string; navn: string }[]
}

export type ModiaContextError = ClientError<'MODIA_ERROR' | 'PARSE_ERROR' | 'FETCH_ERROR'>

export async function getModiaContext(userAccessToken: string): Promise<ModiaContext | ModiaContextError> {
    if (isLocalOrDemo) {
        logger.warn('Using mocked modia context for local development (or demo)')
        return {
            navn: 'Johan J. Johansson',
            ident: '0129381203',
            enheter: [
                { enhetId: '0312', navn: 'NAV Sagene' },
                { enhetId: '0314', navn: 'NAV Fagene' },
            ],
            aktivEnhet: '0314',
        }
    }

    const modiaOboToken = await grantAzureOboToken(userAccessToken, getServerEnv().MODIACONTEXTHOLDER_SCOPE)
    if (isInvalidTokenSet(modiaOboToken)) {
        throw new Error(`Unable to get modia obo token: ${modiaOboToken.errorType} ${modiaOboToken.message}`, {
            cause: modiaOboToken.error instanceof Error ? modiaOboToken.error : undefined,
        })
    }

    const [veileder, aktivEnhet] = await Promise.allSettled([getVeileder(modiaOboToken), getAktivEnhet(modiaOboToken)])

    if (veileder.status === 'rejected' || aktivEnhet.status === 'rejected') {
        if (veileder.status === 'rejected') {
            logger.error(veileder.reason)
        }
        if (aktivEnhet.status === 'rejected') {
            logger.error(aktivEnhet.reason)
        }

        return {
            errorType: 'FETCH_ERROR',
            message: 'Henting av veileder eller aktiv enhet feilet',
        }
    }

    if ('errorType' in aktivEnhet.value) {
        return aktivEnhet.value
    } else if ('errorType' in veileder.value) {
        return veileder.value
    }

    return {
        aktivEnhet: aktivEnhet.value.aktivEnhet,
        navn: veileder.value.navn,
        ident: veileder.value.ident,
        enheter: veileder.value.enheter,
    }
}

async function getVeileder(accessToken: string): Promise<Veileder | ModiaContextError> {
    const url = `https://${getServerEnv().MODIACONTEXTHOLDER_HOST}/modiacontextholder/api/decorator/v2`

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            logger.error(
                `Modia context responded with ${response.status} ${
                    response.statusText
                }, body: ${await response.text()}`,
            )
            return {
                errorType: 'MODIA_ERROR',
                message: `Klarte ikke å hente veileder`,
            }
        }

        const maybeVeileder = Veileder.safeParse(await response.json())

        if (maybeVeileder.success) {
            return maybeVeileder.data
        } else {
            const errorMessage = `Unable to parse modia context response: ${maybeVeileder.error.message}`
            logger.error(errorMessage)
            return {
                errorType: 'PARSE_ERROR',
                message: `Klarte ikke å hente veileder`,
            }
        }
    } catch (e) {
        logger.error('Unknown modia error: Unable to get veileder from modia context')
        throw e
    }
}

async function getAktivEnhet(oboToken: string): Promise<AktivEnhet | ModiaContextError> {
    const url = `https://${getServerEnv().MODIACONTEXTHOLDER_HOST}/modiacontextholder/api/context/aktivenhet`

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${oboToken}`,
            },
        })

        if (!response.ok) {
            logger.error(
                `Modia aktiv enhet responded with ${response.status} ${
                    response.statusText
                }, body: ${await response.text()}`,
            )
            return {
                errorType: 'MODIA_ERROR',
                message: `Klarte ikke å hente aktiv enhet`,
            }
        }

        const maybeAktivEnhet = AktivEnhet.safeParse(await response.json())

        if (maybeAktivEnhet.success) {
            return maybeAktivEnhet.data
        } else {
            logger.error(`Unable to parse modia aktiv enhet response: ${maybeAktivEnhet.error.message}`)
            return {
                errorType: 'PARSE_ERROR',
                message: `Klarte ikke å hente aktiv enhet`,
            }
        }
    } catch (e) {
        logger.error('Unable to get aktiv enhet from modia context')
        throw e
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
})

const AktivEnhet = z.object({
    aktivEnhet: z.string().nullable(),
})

type Veileder = z.infer<typeof Veileder>
type AktivEnhet = z.infer<typeof AktivEnhet>
