import { TokenSet, Client, GrantBody } from 'openid-client';
import { Request } from 'express';
import { ReverseProxy } from '../types/Config';

export const getOnBehalfOfAccessToken = (authClient: Client, req: Request, api: ReverseProxy): Promise<string> => {
  return new Promise((resolve, reject) => {
    // check if request has has valid api access token
    if (hasValidAccessToken(req, 'proxy')) {
      resolve(req.user?.tokenSets.proxy?.access_token);
    } else {
      console.error('The request does not contain a valid access token for API requests');
    }

    // request new access token
    console.log('hasValidAccessToken: ' + hasValidAccessToken(req, 'self'));
    if (hasValidAccessToken(req, 'self')) {
      const grantBody: GrantBody = {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        requested_token_use: 'on_behalf_of',
        scope: createOnBehalfOfScope(api),
        assertion: req.user?.tokenSets.self.access_token,
      };
      console.log('grantbody: ');
      console.log(grantBody);
      authClient
        .grant(grantBody)
        .then((tokenSet) => {
          console.log('received Tokenset:');
          console.log(tokenSet);
          if (req.user) {
            console.log('user object found');
            req.user.tokenSets.proxy = tokenSet;
            resolve(tokenSet.access_token);
          } else {
            console.log('user object not found');
          }
        })
        .catch((err) => {
          console.log('Error getting api token');
          console.error(err);
          reject(err);
        });
    } else {
      const error = new Error('The request does not contain a valid access token');
      console.error(error);
      reject(error);
    }
  });
};

export const appendDefaultScope = (scope: string): string => `${scope}/.default`;

const formatClientIdScopeForV2Clients = (clientId: string): string => appendDefaultScope(`api://${clientId}`);

const createOnBehalfOfScope = (api: ReverseProxy): string => {
  if (api.scopes) {
    return `${api.scopes.join(' ')}`;
  }
  return `${formatClientIdScopeForV2Clients(api.clientId)}`;
};

export const hasValidAccessToken = (req: Request, key: 'self' | 'proxy') => {
  const tokenSets = req.user?.tokenSets;
  if (!tokenSets) {
    return false;
  }
  if (!tokenSets.self) {
    return false;
  }
  return new TokenSet(tokenSets[key]).expired() === false;
};
