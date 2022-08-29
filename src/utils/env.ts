export const isLocalOrDemo = process.env.NODE_ENV !== 'production' || process.env.IS_NAIS_LABS_DEMO === 'true';

type AvailableEnv =
    // provided by nais.yml
    | 'RUNTIME_ENVIRONMENT'
    | 'SMREGISTRERING_BACKEND_SCOPE'
    | 'SMREGISTRERING_BACKEND_HOST'
    | 'MODIACONTEXTHOLDER_SCOPE'
    | 'MODIACONTEXTHOLDER_HOST'
    // nais injected variables
    | 'AZURE_APP_CLIENT_ID'
    | 'AZURE_APP_CLIENT_SECRET'
    | 'AZURE_OPENID_CONFIG_TOKEN_ENDPOINT'
    | 'AZURE_APP_WELL_KNOWN_URL'
    | 'AZURE_APP_PRE_AUTHORIZED_APPS';

export function getServerEnv(name: AvailableEnv): string {
    if (typeof window !== 'undefined') {
        throw new Error(`Illegal isomorphic access: Tried to access environment with name "${name}" on client side`);
    }

    const envVar = process.env[name];
    if (envVar == null) {
        throw new Error(`No key with name "${name}" found in environment`);
    }
    return envVar;
}
