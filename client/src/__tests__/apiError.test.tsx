import nock from 'nock';
import userEvent from '@testing-library/user-event';

import Index from '../pages/index';
import {
    mockBehandlerinfo,
    mockLocation,
    mockPasientinfo,
    render,
    screen,
    waitForElementToBeRemoved,
} from '../utils/testUtils';

import fullOppgave from './testData/fullOppgave.json';

describe('Registration api errors', () => {
    const oppgaveid = 123;
    const apiNock = nock('http://localhost');

    beforeEach(() => {
        mockLocation(oppgaveid);
        mockPasientinfo(apiNock);
        mockBehandlerinfo(apiNock);
        apiNock.get(`/backend/api/v1/oppgave/${oppgaveid}`).reply(200, fullOppgave);
    });

    it('Should show received body error message when status code is 400', async () => {
        apiNock.post(`/backend/api/v1/oppgave/${oppgaveid}/send`).reply(400, 'This is an error');
        render(
            <div id="root">
                <Index />
            </div>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Vennligst vent mens oppgaven laster'));

        userEvent.click(await screen.findByText(/Feltene stemmer overens/));

        const registerButton = await screen.findByRole('button', { name: 'Registrer sykmeldingen' });
        expect(registerButton).not.toBeDisabled();
        userEvent.click(registerButton);

        expect(await screen.findByText('This is an error')).toBeInTheDocument();
    });

    it('Should show generic error message when status code is 500', async () => {
        apiNock.post(`/backend/api/v1/oppgave/${oppgaveid}/send`).reply(500, 'This is an error');
        render(
            <div id="root">
                <Index />
            </div>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Vennligst vent mens oppgaven laster'));

        userEvent.click(await screen.findByText(/Feltene stemmer overens/));

        const registerButton = await screen.findByRole('button', { name: 'Registrer sykmeldingen' });
        expect(registerButton).not.toBeDisabled();
        userEvent.click(registerButton);

        expect(
            await screen.findByText('Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere'),
        ).toBeInTheDocument();
    });

    it('Should show list of validation rulehits when content-type is application/json and status code is 400', async () => {
        apiNock.post(`/backend/api/v1/oppgave/${oppgaveid}/send`).reply(
            400,
            {
                status: 'INVALID',
                ruleHits: [
                    {
                        ruleName: 'RULE_NUMBER_ONE',
                        ruleStatus: 'INVALID',
                        messageForSender: 'Dont break the rules, please',
                        messageForUser: 'message for user',
                    },
                ],
            },
            { 'Content-Type': 'application/json' },
        );
        render(
            <div id="root">
                <Index />
            </div>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Vennligst vent mens oppgaven laster'));

        userEvent.click(await screen.findByText(/Feltene stemmer overens/));

        const registerButton = await screen.findByRole('button', { name: 'Registrer sykmeldingen' });
        expect(registerButton).not.toBeDisabled();
        userEvent.click(registerButton);

        expect(await screen.findByText(/Baksystemet fant ytterligere feil som må behandles/)).toBeInTheDocument();
        expect(await screen.findByText('Dont break the rules, please')).toBeInTheDocument();
    });

    it('Should show validation error when receiving wrongly structured json and status code is 400', async () => {
        apiNock.post(`/backend/api/v1/oppgave/${oppgaveid}/send`).reply(400, { wrong: 'prop' });
        render(
            <div id="root">
                <Index />
            </div>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Vennligst vent mens oppgaven laster'));

        userEvent.click(await screen.findByText(/Feltene stemmer overens/));

        const registerButton = await screen.findByRole('button', { name: 'Registrer sykmeldingen' });
        expect(registerButton).not.toBeDisabled();
        userEvent.click(registerButton);

        expect(
            await screen.findByText(/Det oppsto en valideringsfeil ved registrering av oppgave med id: 123/),
        ).toBeInTheDocument();
    });
});
