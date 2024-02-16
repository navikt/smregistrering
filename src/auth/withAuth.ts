import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiRequest, NextApiResponse } from 'next'
import { logger } from '@navikt/next-logger'
import { makeSession, SessionWithOboProvider } from '@navikt/oasis'
import { azure } from '@navikt/oasis/identity-providers'
import { azure as azureOboProvider, withInMemoryCache } from '@navikt/oasis/obo-providers'

import { isLocalOrDemo } from '../utils/env'
import { PageSsrResult } from '../pages/_app'

type ApiHandler = (
    req: NextApiRequest,
    res: NextApiResponse,
    session: SessionWithOboProvider,
) => void | Promise<unknown>
type PageHandler = (
    context: GetServerSidePropsContext,
    session: SessionWithOboProvider,
) => Promise<GetServerSidePropsResult<PageSsrResult>>

export const getSession = makeSession({
    identityProvider: azure,
    oboProvider: withInMemoryCache(azureOboProvider),
})

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/azure-ad/sidecar/). Will automatically redirect to login if
 * Wonderwall-cookie is missing.
 *
 */
export function withAuthenticatedPage(handler: PageHandler) {
    return async function withBearerTokenHandler(
        context: GetServerSidePropsContext,
    ): Promise<ReturnType<NonNullable<typeof handler>>> {
        if (isLocalOrDemo) {
            logger.info('Is running locally or in demo, skipping authentication for page')
            return handler(context, { token: 'fake-local-token', expiresIn: 6900, apiToken: async () => 'fake' })
        }

        const session = await getSession(context.req)
        if (!session) {
            logger.info('Could not find any bearer token on the request. Redirecting to login.')
            return {
                redirect: { destination: `/oauth2/login?redirect=${context.resolvedUrl}`, permanent: false },
            }
        }

        return handler(context, session)
    }
}

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/). Will deny requests if Wonderwall cookie is missing.
 */
export function withAuthenticatedApi(handler: ApiHandler): ApiHandler {
    return async function withBearerTokenHandler(req, res) {
        if (isLocalOrDemo) {
            logger.info('Is running locally or in demo, skipping authentication for API')
            return handler(req, res, { token: 'fake-local-token', expiresIn: 6900, apiToken: async () => 'fake' })
        }

        try {
            const session = await getSession(req)
            if (!session) {
                res.status(401).json({ message: 'Access denied' })
                return
            }
            return handler(req, res, session)
        } catch (e) {
            logger.error(new Error('Unable to validate session for API', { cause: e }))
            res.status(401).json({ message: 'Access denied' })
            return
        }
    }
}
