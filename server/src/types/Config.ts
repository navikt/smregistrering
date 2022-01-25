import { z } from 'zod';

const NumberString = z
    .string()
    .refine((arg) => typeof arg === 'string' && !isNaN(parseInt(arg)), 'Property needs to be a valid number')
    .transform((arg) => parseInt(arg));

const ScopeString = z
    .string()
    .refine((arg) => typeof arg === 'string' && arg.split(',').length > 0, 'String needs to be a valid list')
    .transform((arg) => arg.split(','));

export const ServerSchema = z.intersection(
    z.object({
        host: z.string(),
        port: NumberString,
        sessionKey: z.string(),
        cookieName: z.string(),
    }),
    z.object({
        proxy: z.string().optional(),
    }),
);

export type Server = z.infer<typeof ServerSchema>;

export const AzureAdSchema = z.intersection(
    z.object({
        discoveryUrl: z.string(),
        clientId: z.string(),
        clientSecret: z.string(),
        redirectUri: z.string(),
        tokenEndpointAuthMethod: z.string(),
        responseTypes: z.array(z.string()),
        responseMode: z.string(),
    }),
    z.object({
        logoutRedirectUri: z.string().optional(),
    }),
);

export type AzureAd = z.infer<typeof AzureAdSchema>;

export const RedisSchema = z.intersection(
    z.object({
        host: z.string(),
        port: NumberString,
    }),
    z.object({
        password: z.string().optional(),
    }),
);
export type Redis = z.infer<typeof RedisSchema>;

export const ApiReverseProxySchema = z.object({
    path: z.string(),
    url: z.string(),
    scopes: ScopeString,
});

export type ApiReverseProxy = z.infer<typeof ApiReverseProxySchema>;
