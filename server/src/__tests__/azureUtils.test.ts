import { Request } from 'express';
import { TokenSet } from 'openid-client';

import { hasValidAccessToken } from '../auth/azureUtils';

jest.mock('../logging');

describe('azureUtils', () => {
    describe('hasValidAccessToken', () => {
        it('Returns false for missing tokenSets', () => {
            const req = { user: undefined };
            expect(hasValidAccessToken(req as Request, 'self')).toBeFalsy();
        });
        it('Returns false for missing proxy in tokenSets', () => {
            const req = { user: { tokenSets: { self: new TokenSet() } } };
            expect(hasValidAccessToken(req as unknown as Request, 'proxy')).toBeFalsy();
        });
        it('Returns false for proxy with missing self in tokenSets', () => {
            const req = { user: { tokenSets: { proxy: new TokenSet() } } };
            expect(hasValidAccessToken(req as unknown as Request, 'proxy')).toBeFalsy();
        });
        it('Returns true for self in tokenSets', () => {
            const req = { user: { tokenSets: { self: new TokenSet() } } };
            expect(hasValidAccessToken(req as unknown as Request, 'self')).toBeTruthy();
        });
        it('Returns true for proxy in tokenSets', () => {
            const req = { user: { tokenSets: { self: new TokenSet(), proxy: new TokenSet() } } };
            expect(hasValidAccessToken(req as unknown as Request, 'proxy')).toBeTruthy();
        });
    });
});
