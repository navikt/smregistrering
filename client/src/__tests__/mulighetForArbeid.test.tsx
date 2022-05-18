import nock from 'nock';
import userEvent from '@testing-library/user-event';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import Index from '../pages/App';
import { mockBehandlerinfo, mockLocation, mockPasientinfo } from '../utils/testUtils';

import fullOppgaveWithoutPeriods from './testData/fullOppgaveWithoutPeriods.json';

describe('Mulighet for arbeid section', () => {
    const oppgaveid = 123;
    const apiNock = nock('http://localhost');

    beforeEach(() => {
        mockLocation(oppgaveid);
        apiNock.get(`/backend/api/v1/oppgave/${oppgaveid}`).reply(200, fullOppgaveWithoutPeriods);
        mockBehandlerinfo(apiNock);
        mockPasientinfo(apiNock);
    });

    it('Should be able to delete periode without messing up other periods', async () => {
        apiNock
            .post(`/backend/api/v1/oppgave/${oppgaveid}/send`, (body) => {
                expect(body.perioder).toEqual([
                    {
                        fom: '2020-01-01',
                        tom: '2020-01-03',
                        reisetilskudd: false,
                        avventendeInnspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                        aktivitetIkkeMulig: null,
                        gradert: null,
                        behandlingsdager: null,
                    },
                    {
                        fom: '2020-03-01',
                        tom: '2020-03-03',
                        reisetilskudd: false,
                        behandlingsdager: null,
                        gradert: null,
                        avventendeInnspillTilArbeidsgiver: null,
                        aktivitetIkkeMulig: {
                            medisinskArsak: {
                                arsak: ['TILSTAND_HINDRER_AKTIVITET'],
                                beskrivelse: 'Medisinsk beskrivelse',
                            },
                            arbeidsrelatertArsak: {
                                arsak: ['MANGLENDE_TILRETTELEGGING'],
                                beskrivelse: 'Arbeidsrelatert beskrivelse',
                            },
                        },
                    },
                ]);
                return true;
            })
            .reply(204);

        render(
            <div id="root">
                <Index height={700} enhet={'0314'} />
            </div>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Vennligst vent mens oppgaven laster'));

        // Add avventende periode
        userEvent.selectOptions(screen.getByRole('combobox', { name: 'Periodetype' }), 'avventende');
        userEvent.type(screen.getByPlaceholderText('DDMMÅÅ-DDMMÅÅ'), '010120-030120{enter}');
        userEvent.type(screen.getByText('Andre innspill til arbeidsgiver'), 'Innspill til arbeidsgiver');

        // Add gradert periode
        userEvent.click(screen.getByText('Legg til periode'));
        userEvent.selectOptions(screen.getAllByRole('combobox', { name: 'Periodetype' })[1], 'gradert');
        userEvent.type(screen.getAllByPlaceholderText('DDMMÅÅ-DDMMÅÅ')[1], '010220-030220{enter}');
        userEvent.type(screen.getByText('Oppgi grad'), '80');

        // Add gradert periode
        userEvent.click(screen.getByText('Legg til periode'));
        userEvent.selectOptions(screen.getAllByRole('combobox', { name: 'Periodetype' })[2], 'fullsykmelding');
        userEvent.type(screen.getAllByPlaceholderText('DDMMÅÅ-DDMMÅÅ')[2], '010320-030320{enter}');
        userEvent.click(screen.getByText(/Det er medisinske årsaker/));
        userEvent.click(screen.getByText(/Helsetilstanden hindrer pasienten/));
        userEvent.type(screen.getByText('Beskrivelse'), 'Medisinsk beskrivelse');
        userEvent.click(screen.getByText(/Forhold på arbeidsplassen vanskeliggjør/));
        userEvent.click(screen.getByText(/Manglende tilrettelegging/));
        userEvent.type(screen.getAllByText('Beskrivelse')[1], 'Arbeidsrelatert beskrivelse');

        userEvent.click(screen.getAllByRole('button', { name: 'Slett periode' })[1]);
        expect(screen.getAllByText('Periodetype')).toHaveLength(2);

        userEvent.click(screen.getByText(/Feltene stemmer overens/));
        userEvent.click(screen.getByRole('button', { name: 'Registrer sykmeldingen' }));
    });
});
