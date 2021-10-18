import * as iots from 'io-ts';

// converts string ot number
const NumberFromString = new iots.Type<number, string, unknown>(
  'StringFronProcessEnv',
  (input): input is number => typeof input === 'string' && parseInt(input) !== NaN,
  (input, context) =>
    typeof input === 'string' && parseInt(input) !== NaN ? iots.success(parseInt(input)) : iots.failure(input, context),
  (output) => output.toString(),
);

// converts string to boolean
const BooleanFromString = new iots.Type<boolean, string, unknown>(
  'BooleanFronProcessEnv',
  (input): input is boolean => typeof input === 'string' && ['true', 'false'].includes(input),
  (input, context) =>
    typeof input === 'string' && ['true', 'false'].includes(input)
      ? iots.success(input === 'true' ? true : false)
      : iots.failure(input, context),
  (output) => output.toString(),
);

const ScopesFromString = new iots.Type<string[], string, unknown>(
  'ScopesFromString',
  (input): input is string[] => typeof input === 'string' && input.split(',').length > 0,
  (input, context) =>
    typeof input === 'string' && input.split(',').length > 0
      ? iots.success(input.split(','))
      : iots.failure(input, context),
  (output) => output.toString(),
);

export const Server = iots.intersection([
  iots.type({
    host: iots.string,
    port: NumberFromString,
    sessionKey: iots.string,
    cookieName: iots.string,
  }),
  iots.partial({
    proxy: iots.string,
  }),
]);
export type Server = iots.TypeOf<typeof Server>;

export const AzureAd = iots.intersection([
  iots.type({
    discoveryUrl: iots.string,
    clientId: iots.string,
    clientSecret: iots.string,
    redirectUri: iots.string,
    tokenEndpointAuthMethod: iots.string,
    responseTypes: iots.array(iots.string),
    responseMode: iots.string,
  }),
  iots.partial({
    logoutRedirectUri: iots.string,
  }),
]);
export type AzureAd = iots.TypeOf<typeof AzureAd>;

export const Redis = iots.intersection([
  iots.type({
    host: iots.string,
    port: NumberFromString,
  }),
  iots.partial({
    password: iots.string,
  }),
]);
export type Redis = iots.TypeOf<typeof Redis>;

export const ApiReverseProxy = iots.type({
  path: iots.string,
  url: iots.string,
  scopes: ScopesFromString,
});

export type ApiReverseProxy = iots.TypeOf<typeof ApiReverseProxy>;
