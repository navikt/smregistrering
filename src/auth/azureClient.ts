import { Client, ClientMetadata, Issuer, ResponseType } from 'openid-client';

import { getServerEnv } from '../utils/env';

let client: Client | null = null;

export interface AzureConfig {
    discoveryUrl: string;
    clientId: string;
    clientSecret: string;
    responseTypes: ResponseType[];
    tokenEndpointAuthMethod:
        | 'client_secret_post'
        | 'client_secret_basic'
        | 'client_secret_jwt'
        | 'private_key_jwt'
        | 'tls_client_auth'
        | 'self_signed_tls_client_auth'
        | 'none'
        | undefined;
    responseMode: string;
}

function getAzureConfig(): AzureConfig {
    return {
        discoveryUrl: getServerEnv('AZURE_APP_WELL_KNOWN_URL'),
        clientId: getServerEnv('AZURE_APP_CLIENT_ID'),
        clientSecret: getServerEnv('AZURE_APP_CLIENT_SECRET'),
        tokenEndpointAuthMethod: 'client_secret_post',
        responseTypes: ['code'],
        responseMode: 'query',
    };
}

export async function getAzureAuthClient(): Promise<Client> {
    if (client) {
        return client;
    }

    const azureConfig = getAzureConfig();
    const metadata: ClientMetadata = {
        client_id: azureConfig.clientId,
        client_secret: azureConfig.clientSecret,
        token_endpoint_auth_method: azureConfig.tokenEndpointAuthMethod,
        response_types: azureConfig.responseTypes,
        response_mode: azureConfig.responseMode,
    };

    const issuer = await Issuer.discover(azureConfig.discoveryUrl);
    client = new issuer.Client(metadata);
    return client;
}
