import { Scope } from 'nock';

import pasientNavn from '../mock/pasientNavn.json';
import sykmelder from '../mock/sykmelder.json';

export function mockLocation(oppgaveid: string | number): void {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
        value: {
            href: `http://localhost/?oppgaveid=${oppgaveid}`,
            search: `?oppgaveid=${oppgaveid}`,
        },
    });
}

export function mockBehandlerinfo(nock: Scope): void {
    nock.get(/\/backend\/api\/v1\/sykmelder\/(.*)/).reply(200, sykmelder);
}

export function mockPasientinfo(nock: Scope): void {
    nock.get('/backend/api/v1/pasient').reply(200, pasientNavn);
}
