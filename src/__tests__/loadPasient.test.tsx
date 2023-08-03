import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'

import { mockBehandlerinfo, render, screen } from '../utils/testUtils'
import { server } from '../mocks/server'
import { apiUrl } from '../utils/fetchUtils'
import FormView from '../components/FormView'
import { Oppgave } from '../types/oppgave/Oppgave'
import { getDiagnosekoder } from '../utils/dataUtils'

import nullFnrOppgave from './testData/nullFnrOppgave.json'

describe('Load pasientinfo', async () => {
    const diagnosekoder = await getDiagnosekoder()

    beforeEach(() => {
        mockBehandlerinfo()
    })

    it('Should search for name of pasient when typing 11 digits in pasientFnr input field', async () => {
        server.use(
            rest.get(apiUrl('/v1/pasient'), (req, res, ctx) =>
                res(
                    ctx.json({
                        fornavn: 'Per',
                        mellomnavn: 'Anders',
                        etternavn: 'Persson',
                    }),
                ),
            ),
        )

        render(
            <FormView
                sykmeldingId="test-id"
                aktivEnhet="test-enhet"
                oppgave={nullFnrOppgave as Oppgave}
                diagnosekoder={diagnosekoder}
                isFerdigstilt={false}
            />,
        )

        expect(
            await screen.findByRole('heading', { name: 'Vennligst legg inn opplysningene fra papirsykmeldingen' }),
        ).toBeInTheDocument()
        await userEvent.type(await screen.findByText('1.2 Fødselsnummer (11 siffer)'), '12345678910')
        expect(await screen.findByText('Per Anders Persson')).toBeInTheDocument()
    })

    it('Should display error when request fails', async () => {
        server.use(rest.get(apiUrl('/v1/pasient'), (req, res, ctx) => res(ctx.status(500))))
        render(
            <FormView
                sykmeldingId="test-id"
                aktivEnhet="test-enhet"
                oppgave={nullFnrOppgave as Oppgave}
                diagnosekoder={diagnosekoder}
                isFerdigstilt={false}
            />,
        )

        expect(
            await screen.findByRole('heading', { name: 'Vennligst legg inn opplysningene fra papirsykmeldingen' }),
        ).toBeInTheDocument()
        await userEvent.type(await screen.findByText('1.2 Fødselsnummer (11 siffer)'), '12345678910')
        expect(
            await screen.findByText('En feil oppsto ved henting av pasientinfo. Ta kontakt dersom feilen vedvarer.'),
        ).toBeInTheDocument()
    })
})
