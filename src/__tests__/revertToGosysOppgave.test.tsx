import nock from 'nock';
import userEvent from '@testing-library/user-event';

import Index from '../pages/index';
import { mockLocation, render, screen, waitForElementToBeRemoved, within } from '../utils/testUtils';

import emptyOppgave from './testData/emptyOppgave.json';

describe('Load pasientinfo', () => {
    const oppgaveid = 123;
    const apiNock = nock('http://localhost');

    beforeEach(() => {
        mockLocation(oppgaveid);
        apiNock.get(`/api/backend/api/v1/oppgave/${oppgaveid}`).reply(200, emptyOppgave);
    });

    it('Should display modal when clicking "Send til GOSYS"', async () => {
        apiNock.post(`/api/backend/api/v1/oppgave/${oppgaveid}/tilgosys`).reply(200, 'OK');
        render(
            <div id="root">
                <Index />
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
