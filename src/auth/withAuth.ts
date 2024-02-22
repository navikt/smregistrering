import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiRequest, NextApiResponse } from 'next'
import { logger } from '@navikt/next-logger'
import { getToken, validateToken } from '@navikt/oasis'

import { isLocalOrDemo } from '../utils/env'
import { PageSsrResult } from '../pages/_app'

type ApiHandler = (req: NextApiRequest, res: NextApiResponse, accessToken: string) => void | Promise<unknown>
type PageHandler = (
    context: GetServerSidePropsContext,
    accessToken: string,
) => Promise<GetServerSidePropsResult<PageSsrResult>>

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
            return handler(context, 'fake-local-token')
        }

        const token = getToken(context.req)
        if (!token) {
            logger.info('Could not find any bearer token on the request. Redirecting to login.')
            return {
                redirect: { destination: `/oauth2/login?redirect=${context.resolvedUrl}`, permanent: false },
            }
        }

        const validationResult = await validateToken(token)
        if (!validationResult.ok) {
            if (validationResult.errorType !== 'token expired') {
                logger.error(`Invalid JWT token found (${validationResult.error.message}), redirecting to login.`)
            }

            return {
                redirect: { destination: `/oauth2/login?redirect=${context.resolvedUrl}`, permanent: false },
            }
        }

        return handler(context, token)
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
            return handler(req, res, 'fake-local-token')
        }

        const token = getToken(req)
        if (token == null) {
            res.status(401).json({ message: 'Access denied' })
            return
        }

        const validationResult = await validateToken(token)
        if (!validationResult.ok) {
            if (validationResult.errorType !== 'token expired') {
                logger.error(`Invalid JWT token found (${validationResult.error.message}), denying access.`)
            }
            res.status(401).json({ message: 'Access denied' })
            return
        }

        return handler(req, res, token)
    }
}
