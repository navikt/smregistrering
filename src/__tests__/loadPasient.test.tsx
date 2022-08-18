import nock from 'nock';
import userEvent from '@testing-library/user-event';

import Index from '../pages/index';
import { mockBehandlerinfo, mockLocation, render, screen, waitForElementToBeRemoved } from '../utils/testUtils';

import nullFnrOppgave from './testData/nullFnrOppgave.json';

describe('Load pasientinfo', () => {
    const oppgaveid = 123;
    const apiNock = nock('http://localhost');

    beforeEach(() => {
        mockLocation(oppgaveid);
        apiNock.get(`/api/backend/api/v1/oppgave/${oppgaveid}`).reply(200, nullFnrOppgave);
        mockBehandlerinfo(apiNock);
    });

    it('Should search for name of pasient when typing 11 digits in pasientFnr input field', async () => {
        apiNock.get('/api/backend/api/v1/pasient').reply(200, {
            fornavn: 'Per',
            mellomnavn: 'Anders',
            etternavn: 'Persson',
        });
        render(
            <div id="root">
                <Index />
            </div>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Vennligst vent mens oppgaven laster'));
        userEvent.type(await screen.findByText('1.2 Fødselsnummer (11 siffer)'), '12345678910');
        expect(await screen.findByText(/Henter informasjon/)).toBeInTheDocument();
        await waitForElementToBeRemoved(() => screen.queryByText(/Henter informasjon/));
        expect(await screen.findByText('Per Anders Persson')).toBeInTheDocument();
    });

    it('Should display error when request fails', async () => {
        apiNock.get('/api/backend/api/v1/pasient').reply(500);
        render(
            <div id="root">
                <Index />
            </div>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Vennligst vent mens oppgaven laster'));
        userEvent.type(await screen.findByText('1.2 Fødselsnummer (11 siffer)'), '12345678910');
        expect(await screen.findByText(/Henter informasjon/)).toBeInTheDocument();
        await waitForElementToBeRemoved(() => screen.queryByText(/Henter informasjon/));
        expect(
            await screen.findByText('En feil oppsto ved henting av pasientinfo. Ta kontakt dersom feilen vedvarer.'),
        ).toBeInTheDocument();
    });
});
