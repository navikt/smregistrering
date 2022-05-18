import nock from 'nock';
import userEvent from '@testing-library/user-event';
import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';

import Index from '../pages/App';
import { mockLocation } from '../utils/testUtils';

import emptyOppgave from './testData/emptyOppgave.json';

describe('Load pasientinfo', () => {
    const oppgaveid = 123;
    const apiNock = nock('http://localhost');

    beforeEach(() => {
        mockLocation(oppgaveid);
        apiNock.get(`/backend/api/v1/oppgave/${oppgaveid}`).reply(200, emptyOppgave);
    });

    it('Should display modal when clicking "Send til GOSYS"', async () => {
        apiNock.post(`/backend/api/v1/oppgave/${oppgaveid}/tilgosys`).reply(200, 'OK');
        render(
            <div id="root">
                <Index height={700} enhet={'0314'} />
            </div>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Vennligst vent mens oppgaven laster'));
        userEvent.click(await screen.findByRole('button', { name: 'Dette er ikke en sykmelding' }));
        expect(await screen.findByText('Send til GOSYS?')).toBeInTheDocument();
        userEvent.click(await screen.findByRole('button', { name: 'Send til GOSYS' }));

        const dialog = within(await screen.findByRole('dialog', { name: 'Oppgaven ble sendt tilbake til GOSYS.' }));
        expect(dialog.getByRole('link', { name: 'Tilbake til GOSYS' })).toBeInTheDocument();
    });
});
