import nock from 'nock';
import userEvent from '@testing-library/user-event';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import App from '../App';
import emptyOppgave from './testData/emptyOppgave.json';
import { mockLocation } from '../utils/testUtils';

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
                <App height={700} enhet={'0314'} />
            </div>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Vennligst vent mens oppgaven laster'));
        userEvent.click(await screen.findByRole('button', { name: 'Send til GOSYS' }));
        expect(
            await screen.findByText('Er du sikker på at du vil sende oppgaven tilbake til GOSYS?'),
        ).toBeInTheDocument();
        userEvent.click(await screen.findByRole('button', { name: 'Send til GOSYS' }));
        expect(await screen.findByText('Tilbake til GOSYS')).toBeInTheDocument();
    });
});
