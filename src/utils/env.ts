import { z, ZodError } from 'zod'

export type PublicEnv = z.infer<typeof publicEnvSchema>
const publicEnvSchema = z.object({
    NEXT_PUBLIC_ENVIRONMENT: z.union([
        z.literal('local'),
        z.literal('test'),
        z.literal('dev'),
        z.literal('demo'),
        z.literal('production'),
    ]),
    NEXT_PUBLIC_GOSYS_URL: z.string(),
    NEXT_PUBLIC_MODIA_URL: z.string(),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>
export const serverEnvSchema = z.object({
    // provided by nais.yml
    SMREGISTRERING_BACKEND_SCOPE: z.string(),
    SMREGISTRERING_BACKEND_HOST: z.string(),
    MODIACONTEXTHOLDER_SCOPE: z.string(),
    MODIACONTEXTHOLDER_HOST: z.string(),
    // Provided my nais
    AZURE_APP_CLIENT_ID: z.string(),
    AZURE_APP_CLIENT_SECRET: z.string(),
    AZURE_OPENID_CONFIG_TOKEN_ENDPOINT: z.string(),
    AZURE_APP_WELL_KNOWN_URL: z.string(),
    AZURE_APP_PRE_AUTHORIZED_APPS: z.string(),
})

export const browserEnv = publicEnvSchema.parse({
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    NEXT_PUBLIC_GOSYS_URL: process.env.NEXT_PUBLIC_GOSYS_URL,
    NEXT_PUBLIC_MODIA_URL: process.env.NEXT_PUBLIC_MODIA_URL,
} satisfies Record<keyof PublicEnv, string | undefined>)

const getRawServerConfig = (): Partial<unknown> =>
    ({
        // Provided by nais-*.yml
        SMREGISTRERING_BACKEND_SCOPE: process.env.SMREGISTRERING_BACKEND_SCOPE,
        SMREGISTRERING_BACKEND_HOST: process.env.SMREGISTRERING_BACKEND_HOST,
        MODIACONTEXTHOLDER_SCOPE: process.env.MODIACONTEXTHOLDER_SCOPE,
        MODIACONTEXTHOLDER_HOST: process.env.MODIACONTEXTHOLDER_HOST,
        // Provided by nais
        AZURE_APP_CLIENT_ID: process.env.AZURE_APP_CLIENT_ID,
        AZURE_APP_CLIENT_SECRET: process.env.AZURE_APP_CLIENT_SECRET,
        AZURE_OPENID_CONFIG_TOKEN_ENDPOINT: process.env.AZURE_OPENID_CONFIG_TOKEN_ENDPOINT,
        AZURE_APP_WELL_KNOWN_URL: process.env.AZURE_APP_WELL_KNOWN_URL,
        AZURE_APP_PRE_AUTHORIZED_APPS: process.env.AZURE_APP_PRE_AUTHORIZED_APPS,
    }) satisfies Record<keyof ServerEnv, string | undefined>

/**
 * Server envs are lazy loaded and verified using Zod.
 */
export function getServerEnv(): ServerEnv & PublicEnv {
    try {
        return { ...serverEnvSchema.parse(getRawServerConfig()), ...publicEnvSchema.parse(browserEnv) }
    } catch (e) {
        if (e instanceof ZodError) {
            throw new Error(
                `The following envs are missing: ${
                    e.errors
                        .filter((it) => it.message === 'Required')
                        .map((it) => it.path.join('.'))
                        .join(', ') || 'None are missing, but zod is not happy. Look at cause'
                }`,
                { cause: e },
            )
        } else {
            throw e
        }
    }
}

export const isLocalOrDemo = process.env.NODE_ENV !== 'production' || browserEnv.NEXT_PUBLIC_ENVIRONMENT === 'demo'
