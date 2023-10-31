import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'

import { mockBehandlerinfo, mockPasientinfo, render, screen } from '../utils/testUtils'
import { server } from '../mocks/server'
import { apiUrl } from '../utils/fetchUtils'
import FormView from '../components/FormView'
import { Oppgave } from '../types/oppgave/Oppgave'
import { getDiagnosekoder } from '../utils/dataUtils'

import fullOppgaveWithoutPeriods from './testData/fullOppgaveWithoutPeriods.json'

describe('Mulighet for arbeid section', async () => {
    const diagnosekoder = await getDiagnosekoder()

    beforeEach(() => {
        mockBehandlerinfo()
        mockPasientinfo()
    })

    it('Should be able to delete periode without messing up other periods', async () => {
        let invokedBody: any | null = null
        server.use(
            rest.post(apiUrl(`/v1/oppgave/${fullOppgaveWithoutPeriods.oppgaveid}/send`), async (req, res, ctx) => {
                invokedBody = await req.json()
                return res(ctx.status(204))
            }),
        )

        render(
            <FormView
                sykmeldingId="test-id"
                aktivEnhet="test-enhet"
                oppgave={fullOppgaveWithoutPeriods as Oppgave}
                diagnosekoder={diagnosekoder}
                isFerdigstilt={false}
            />,
        )

        expect(
            await screen.findByRole('heading', { name: 'Vennligst legg inn opplysningene fra papirsykmeldingen' }),
        ).toBeInTheDocument()

        // Add avventende periode
        await userEvent.selectOptions(await screen.findByRole('combobox', { name: 'Periodetype' }), 'avventende')
        await userEvent.type(screen.getByPlaceholderText('DDMMÅÅ-DDMMÅÅ'), '010120-030120{enter}')
        await userEvent.type(screen.getByText('Andre innspill til arbeidsgiver'), 'Innspill til arbeidsgiver')

        // Add gradert periode
        await userEvent.click(screen.getByText('Legg til periode'))
        await userEvent.selectOptions(screen.getAllByRole('combobox', { name: 'Periodetype' })[1], 'gradert')
        await userEvent.type(screen.getAllByPlaceholderText('DDMMÅÅ-DDMMÅÅ')[1], '010220-030220{enter}')
        await userEvent.type(screen.getByText('Oppgi grad'), '80')

        // Add gradert periode
        await userEvent.click(screen.getByText('Legg til periode'))
        await userEvent.selectOptions(screen.getAllByRole('combobox', { name: 'Periodetype' })[2], 'fullsykmelding')
        await userEvent.type(screen.getAllByPlaceholderText('DDMMÅÅ-DDMMÅÅ')[2], '010320-030320{enter}')
        await userEvent.click(screen.getByText(/Det er medisinske årsaker/))
        await userEvent.click(screen.getByText(/Helsetilstanden hindrer pasienten/))
        await userEvent.type(screen.getByText('Beskrivelse'), 'Medisinsk beskrivelse')
        await userEvent.click(screen.getByText(/Forhold på arbeidsplassen vanskeliggjør/))
        await userEvent.click(screen.getByText(/Manglende tilrettelegging/))
        await userEvent.type(screen.getAllByText('Beskrivelse')[1], 'Arbeidsrelatert beskrivelse')

        await userEvent.click(screen.getAllByRole('button', { name: 'Slett periode' })[1])
        expect(screen.getAllByText('Periodetype')).toHaveLength(2)

        await userEvent.click(screen.getByText(/Feltene stemmer overens/))
        await userEvent.click(screen.getByRole('button', { name: 'Registrer sykmeldingen' }))

        expect(invokedBody.perioder).toEqual([
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
        ])
    })
})
