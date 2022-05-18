import dayjs from 'dayjs';
import nock from 'nock';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import Index from '../pages/App';
import {
    ArbeidsrelatertArsakType,
    ArbeidsrelatertArsakTypeValues,
    MedisinskArsakType,
    MedisinskArsakTypeValues,
} from '../types/sykmelding/Periode';
import { mockBehandlerinfo, mockLocation, mockPasientinfo } from '../utils/testUtils';

import emptyOppgave from './testData/emptyOppgave.json';
import fullOppgave from './testData/fullOppgave.json';

describe('Mapping opppgave fetched from API', () => {
    const oppgaveid = 123;
    const apiNock = nock('http://localhost');

    beforeEach(() => {
        mockLocation(oppgaveid);
        mockPasientinfo(apiNock);
        mockBehandlerinfo(apiNock);
    });

    it('Should map all fields when "oppgave.papirSmRegistrering" is completely filled out', async () => {
        apiNock.get(`/backend/api/v1/oppgave/${oppgaveid}`).reply(200, fullOppgave);
        render(
            <div id="root">
                <Index height={700} enhet={'0314'} />
            </div>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Vennligst vent mens oppgaven laster'));

        await waitForElementToBeRemoved(() => screen.queryByText('Henter informasjon om pasient'));

        // 1 Pasientopplysninger
        expect(screen.getByLabelText('1.2 Fødselsnummer (11 siffer)')).toHaveDisplayValue(fullOppgave.fnr);

        // 2 Arbeidsgiver
        expect(screen.getByLabelText('2.1 Pasienten har')).toHaveDisplayValue('Én arbeidsgiver');
        expect(screen.getByLabelText('2.2 Arbeidsgiver for denne sykmeldingen')).toHaveDisplayValue(
            fullOppgave.papirSmRegistering.arbeidsgiver.navn,
        );
        expect(screen.getByLabelText('2.3 Yrke/stilling for dette arbeidsforholdet')).toHaveDisplayValue(
            fullOppgave.papirSmRegistering.arbeidsgiver.yrkesbetegnelse,
        );
        expect(screen.getByLabelText('2.4 Stillingsprosent')).toHaveDisplayValue(
            fullOppgave.papirSmRegistering.arbeidsgiver.stillingsprosent.toString(),
        );

        // 3 Diagnose
        expect(screen.getAllByDisplayValue('ICD-10')).toHaveLength(2);
        expect(screen.getAllByDisplayValue('ICPC-2')).toHaveLength(1);
        expect(
            screen.getByText(fullOppgave.papirSmRegistering.medisinskVurdering.hovedDiagnose.kode),
        ).toBeInTheDocument(); // react-select exposes the value within a div
        expect(
            screen.getByText(fullOppgave.papirSmRegistering.medisinskVurdering.biDiagnoser[0].kode),
        ).toBeInTheDocument(); // react-select exposes the value within a div
        expect(
            screen.getByText(fullOppgave.papirSmRegistering.medisinskVurdering.biDiagnoser[1].kode),
        ).toBeInTheDocument(); // react-select exposes the value within a div
        expect(
            screen.getByText(fullOppgave.papirSmRegistering.medisinskVurdering.hovedDiagnose.tekst),
        ).toBeInTheDocument();
        expect(
            screen.getByText(fullOppgave.papirSmRegistering.medisinskVurdering.biDiagnoser[0].tekst),
        ).toBeInTheDocument();
        expect(
            screen.getByText(fullOppgave.papirSmRegistering.medisinskVurdering.biDiagnoser[1].tekst),
        ).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: /Annen lovfestet fraværsgrunn/ })).toBeChecked();
        expect(screen.getByRole('checkbox', { name: /Når vedkommende er under behandling/ })).toBeChecked();
        expect(
            screen.getByRole('checkbox', { name: /Når vedkommende er til nødvendig kontrollundersøkelse/ }),
        ).toBeChecked();
        expect(screen.getByRole('checkbox', { name: /Når vedkommende er under behandling/ })).toBeChecked();
        expect(screen.getByLabelText('3.3.2 Beskriv fravær (valgfritt)')).toHaveDisplayValue(
            fullOppgave.papirSmRegistering.medisinskVurdering.annenFraversArsak.beskrivelse,
        );
        expect(screen.getByRole('checkbox', { name: /Sykdommen er svangerskapsrelatert/ })).toBeChecked();
        expect(screen.getByRole('checkbox', { name: /Sykmeldingen kan skyldes en yrkesskade/ })).toBeChecked();
        expect(
            screen.getByText(
                dayjs(fullOppgave.papirSmRegistering.medisinskVurdering.yrkesskadeDato).format('D. MMMM YYYY'),
            ),
        ).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: /nødvendig å skjerme pasienten/ })).toBeChecked();

        // 4 Mulighet for arbeid
        expect(screen.getByDisplayValue('4.1 Avventende sykmelding')).toBeInTheDocument();
        expect(
            screen.getByDisplayValue(
                dayjs(fullOppgave.papirSmRegistering.perioder[0].fom).format('DDMMYY') +
                    '-' +
                    dayjs(fullOppgave.papirSmRegistering.perioder[0].tom).format('DDMMYY'),
            ),
        ).toBeInTheDocument();
        expect(screen.getByLabelText('Andre innspill til arbeidsgiver')).toHaveDisplayValue(
            fullOppgave.papirSmRegistering.perioder[0].avventendeInnspillTilArbeidsgiver!,
        );

        expect(screen.getByDisplayValue('4.2 Gradert sykmelding')).toBeInTheDocument();
        expect(
            screen.getByDisplayValue(
                dayjs(fullOppgave.papirSmRegistering.perioder[1].fom).format('DDMMYY') +
                    '-' +
                    dayjs(fullOppgave.papirSmRegistering.perioder[1].tom).format('DDMMYY'),
            ),
        ).toBeInTheDocument();
        expect(screen.getByLabelText('Oppgi grad')).toHaveDisplayValue('80');
        expect(screen.getByRole('checkbox', { name: /Pasienten kan være delvis i arbeid/ })).not.toBeChecked();

        expect(screen.getByDisplayValue('4.3 100% sykmelding')).toBeInTheDocument();
        expect(
            screen.getByDisplayValue(
                dayjs(fullOppgave.papirSmRegistering.perioder[2].fom).format('DDMMYY') +
                    '-' +
                    dayjs(fullOppgave.papirSmRegistering.perioder[2].tom).format('DDMMYY'),
            ),
        ).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: /Det er medisinske årsaker/ })).toBeChecked();
        expect(fullOppgave.papirSmRegistering.perioder[2].aktivitetIkkeMulig?.medisinskArsak.arsak).toHaveLength(2);
        fullOppgave.papirSmRegistering.perioder[2].aktivitetIkkeMulig?.medisinskArsak.arsak.forEach((arsak) => {
            expect(
                screen.getByRole('checkbox', { name: MedisinskArsakTypeValues[arsak as MedisinskArsakType] }),
            ).toBeChecked();
        });
        expect(screen.getByDisplayValue('Dette er beskrivelsen på den medisinske årsaken')).toBeInTheDocument();
        expect(fullOppgave.papirSmRegistering.perioder[2].aktivitetIkkeMulig?.arbeidsrelatertArsak.arsak).toHaveLength(
            1,
        );
        fullOppgave.papirSmRegistering.perioder[2].aktivitetIkkeMulig?.arbeidsrelatertArsak.arsak.forEach((arsak) => {
            expect(
                screen.getByRole('checkbox', {
                    name: ArbeidsrelatertArsakTypeValues[arsak as ArbeidsrelatertArsakType],
                }),
            ).toBeChecked();
        });
        expect(screen.getByDisplayValue('Dette er beskrivelsen på den arbeidsrelaterte årsaken')).toBeInTheDocument();

        expect(screen.getByDisplayValue('4.4 Behandlingsdager')).toBeInTheDocument();
        expect(
            screen.getByDisplayValue(
                dayjs(fullOppgave.papirSmRegistering.perioder[3].fom).format('DDMMYY') +
                    '-' +
                    dayjs(fullOppgave.papirSmRegistering.perioder[3].tom).format('DDMMYY'),
            ),
        ).toBeInTheDocument();
        expect(screen.getByLabelText('Oppgi antall dager i perioden')).toHaveDisplayValue(
            `${fullOppgave.papirSmRegistering.perioder[3].behandlingsdager}`,
        );

        expect(screen.getByDisplayValue('4.5 Reisetilskudd')).toBeInTheDocument();
        expect(
            screen.getByDisplayValue(
                dayjs(fullOppgave.papirSmRegistering.perioder[4].fom).format('DDMMYY') +
                    '-' +
                    dayjs(fullOppgave.papirSmRegistering.perioder[4].tom).format('DDMMYY'),
            ),
        ).toBeInTheDocument();

        // 6 Utdypende opplysninger
        expect(screen.getByRole('checkbox', { name: /Sykmeldingen har utdypende opplysninger/ })).not.toBeChecked();

        // 8 Melding til NAV
        expect(screen.getByRole('checkbox', { name: /Ønskes bistand fra NAV nå?/ })).toBeChecked();
        expect(screen.getByLabelText('Begrunn nærmere')).toHaveDisplayValue(
            fullOppgave.papirSmRegistering.meldingTilNAV.beskrivBistand,
        );

        // 9 Melding til arbeidsgiveren
        expect(screen.getByLabelText('9.1 Andre innspill til arbeidsgiveren')).toHaveDisplayValue(
            fullOppgave.papirSmRegistering.meldingTilArbeidsgiver,
        );

        // 10 Tilbakedatering
        expect(screen.getByRole('checkbox', { name: /Er sykmeldingen tilbakedatert?/ })).toBeChecked();
        expect(screen.getByLabelText('Oppgi dato for dokumenterbar kontakt med pasienten')).toHaveDisplayValue(
            dayjs(fullOppgave.papirSmRegistering.kontaktMedPasient.kontaktDato).format('DDMMYY'),
        );
        expect(
            screen.getByRole('checkbox', { name: /Pasienten har ikke kunnet ivareta egne interesser/ }),
        ).toBeChecked();
        expect(screen.getByLabelText('Begrunn')).toHaveDisplayValue(
            fullOppgave.papirSmRegistering.kontaktMedPasient.begrunnelseIkkeKontakt,
        );

        // 12 Behandler
        expect(screen.getByLabelText('12.1 Behandletdato')).toHaveDisplayValue(
            dayjs(fullOppgave.papirSmRegistering.behandletTidspunkt).format('DDMMYY'),
        );

        expect(screen.getByDisplayValue(fullOppgave.papirSmRegistering.behandler.hpr)).toBeInTheDocument(); // Can not getByLabelText before fixing label
        expect(screen.getByLabelText('12.5 Telefon')).toHaveDisplayValue(fullOppgave.papirSmRegistering.behandler.tlf);
    });

    it('Should not map any field when "oppgave.papirSmRegistrering" is null', async () => {
        apiNock.get(`/backend/api/v1/oppgave/${oppgaveid}`).reply(200, emptyOppgave);
        render(
            <div id="root">
                <Index height={700} enhet={'0314'} />
            </div>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Vennligst vent mens oppgaven laster'));

        // 1 Pasientopplysninger
        expect(screen.getByLabelText('1.2 Fødselsnummer (11 siffer)')).toHaveDisplayValue('');

        // 2 Arbeidsgiver
        expect(screen.getByLabelText('2.1 Pasienten har')).toHaveDisplayValue('Velg');
        expect(screen.getByLabelText('2.2 Arbeidsgiver for denne sykmeldingen')).toHaveDisplayValue('');
        expect(screen.getByLabelText('2.3 Yrke/stilling for dette arbeidsforholdet')).toHaveDisplayValue('');
        expect(screen.getByLabelText('2.4 Stillingsprosent')).toHaveDisplayValue('');

        // 3 Diagnose
        expect(screen.getByLabelText('3.1.2 Kode')).toHaveDisplayValue('');
        expect(screen.queryByLabelText('3.2.2 Kode')).not.toBeInTheDocument();
        expect(
            screen.getByRole('checkbox', { name: 'Annen lovfestet fraværsgrunn § 8-4, 3. ledd oppgis hvis relevant' }),
        ).not.toBeChecked();
        expect(screen.getByRole('checkbox', { name: 'Sykdommen er svangerskapsrelatert' })).not.toBeChecked();
        expect(
            screen.getByRole('checkbox', { name: 'Sykmeldingen kan skyldes en yrkesskade / yrkessykdom' }),
        ).not.toBeChecked();
        expect(
            screen.getByRole('checkbox', {
                name: 'Det er påtrengende nødvendig å skjerme pasienten for medisinske opplysninger, jf. pasient- og brukerrettighetsloven §§ 3-2 og 5-1',
            }),
        ).not.toBeChecked();

        // 4 Mulighet for arbeid
        expect(screen.getAllByLabelText('Periodetype')).toHaveLength(1);
        expect(screen.getByLabelText('Periodetype')).toHaveDisplayValue('4.3 100% sykmelding');
        expect(
            screen.getByRole('checkbox', { name: 'Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet' }),
        ).not.toBeChecked();
        expect(
            screen.getByRole('checkbox', { name: 'Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet' }),
        ).not.toBeChecked();

        // 6 Utdypende opplysninger
        expect(screen.getByRole('checkbox', { name: 'Sykmeldingen har utdypende opplysninger' })).not.toBeChecked();

        // 8 Utdypende opplysninger
        expect(screen.getByRole('checkbox', { name: 'Ønskes bistand fra NAV nå?' })).not.toBeChecked();

        // 9 Utdypende opplysninger
        expect(screen.getByLabelText('9.1 Andre innspill til arbeidsgiveren')).toHaveDisplayValue('');

        // 10 Tilbakedatering
        expect(screen.getByRole('checkbox', { name: 'Er sykmeldingen tilbakedatert?' })).not.toBeChecked();
        expect(
            screen.getByRole('checkbox', { name: 'Pasienten har ikke kunnet ivareta egne interesser' }),
        ).not.toBeChecked();

        // 12 Behandler
        expect(screen.getByLabelText('12.1 Behandletdato')).toHaveDisplayValue('');
        expect(screen.getByRole('textbox', { name: /12.4 HPR-nummer/ })).toHaveDisplayValue('');
        expect(screen.getByLabelText('12.5 Telefon')).toHaveDisplayValue('');
    });
});
