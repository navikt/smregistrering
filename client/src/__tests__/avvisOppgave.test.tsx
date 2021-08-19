import nock from 'nock';
import userEvent from '@testing-library/user-event';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import App from '../App';
import fullOppgave from './testData/fullOppgave.json';

describe('Avvis oppgave', () => {
    const oppgaveid = 123;
    const apiNock = nock('http://localhost');

    beforeEach(() => {
        apiNock.get(`/backend/api/v1/oppgave/${oppgaveid}`).reply(200, fullOppgave);

        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            value: {
                href: `http://localhost/?oppgaveid=${oppgaveid}`,
                search: '?oppgaveid=123',
            },
        });
    });

    it('Should display modal with confirmation when clicking "avvis sykmeldingen"', async () => {
        apiNock.post(`/backend/api/v1/oppgave/${oppgaveid}/avvis`).reply(200, 'OK');
        render(
            <div id="root">
                <App height={700} enhet={'0314'} />
            </div>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Vennligst vent mens oppgaven laster'));
        userEvent.click(await screen.findByRole('button', { name: 'Avvis sykmeldingen' }));
        expect(await screen.findByText('Er du sikker på at du vil avvise sykmeldingen?')).toBeInTheDocument();
        userEvent.click(await screen.findByRole('button', { name: 'AVVIS SYKMELDING' }));
        expect(await screen.findByText('Tilbake til GOSYS')).toBeInTheDocument();
    });
});
