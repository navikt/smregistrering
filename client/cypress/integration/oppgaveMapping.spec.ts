import dayjs from 'dayjs';

/// <reference types="cypress" />
import { Oppgave } from '../../src/types/Oppgave';

context('Oppgave mapping', () => {
    beforeEach(() => {
        // Cypress does not support stubbing of window.fetch
        // Fetch is polyfilled in /client/src/index.ts
        // Must delete window.fetch for the polyfill to work
        cy.on('window:before:load', (win) => {
            win.fetch = null;
        });

        cy.server(); // enable response stubbing
    });

    it('Should map all fields when "oppgave.papirSmRegistrering" is completely filled out', () => {
        cy.route({
            method: 'GET',
            url: '/backend/api/v1/oppgave/123',
            response: 'fixture:fullOppgave.json', // Gets the response from ../fixtures/fullOppgave.json
        });
        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.fixture('fullOppgave').then((oppgave: Oppgave) => {
            cy.get('#pasientFnr').should('have.value', oppgave.fnr);
            cy.get('#harArbeidsgiver')
                .should('have.value', oppgave.papirSmRegistering.arbeidsgiver.harArbeidsgiver)
                .and('be.visible');
            cy.get('#arbeidsgiverNavn').should('have.value', oppgave.papirSmRegistering.arbeidsgiver.navn);
            cy.get('#yrkesbetegnelse').should('have.value', oppgave.papirSmRegistering.arbeidsgiver.yrkesbetegnelse);
            cy.get('#stillingsprosent').should('have.value', oppgave.papirSmRegistering.arbeidsgiver.stillingsprosent);

            cy.get('#hovedDiagnose').within(() => {
                cy.get('#hovedDiagnose-system').should(
                    'have.value',
                    oppgave.papirSmRegistering.medisinskVurdering.hovedDiagnose.system,
                );
                cy.contains(oppgave.papirSmRegistering.medisinskVurdering.hovedDiagnose.kode);
                cy.get('#hovedDiagnose-tekst').contains(
                    oppgave.papirSmRegistering.medisinskVurdering.hovedDiagnose.tekst,
                );
            });

            cy.get('#biDiagnoser').within(() => {
                oppgave.papirSmRegistering.medisinskVurdering.biDiagnoser.forEach((bidiagnose, index) => {
                    cy.get(`#bidiagnose-${index}-system`).should('have.value', bidiagnose.system);
                    cy.contains(bidiagnose.kode);
                    cy.get(`#bidiagnose-${index}-tekst`).contains(bidiagnose.tekst);
                });
            });

            cy.get('#annenFraversArsak').should('be.checked');
            cy.get('#annenFraversArsakGrunn').within(() => {
                oppgave.papirSmRegistering.medisinskVurdering.annenFraversArsak.grunn.forEach((grunn) => {
                    cy.get('#' + grunn).should('be.checked');
                });
            });
            cy.get('#annenFraversArsakBeskrivelse').should(
                'have.value',
                oppgave.papirSmRegistering.medisinskVurdering.annenFraversArsak.beskrivelse,
            );

            cy.get('#svangerskap').should('be.checked');
            cy.get('#yrkesskade').should('be.checked');
            cy.get('#yrkesskadeDato').should(
                'have.value',
                dayjs(oppgave.papirSmRegistering.medisinskVurdering.yrkesskadeDato).format('DD.MM.YYYY'),
            );
            cy.get('#skjermesForPasient').should('be.checked');

            //
            // Mulighet for arbeid
            //
            // TODO: Make generic so that it doesn't rely on a specific count/order of periods

            cy.get(`#mulighetForArbeid`).within(() => {
                // Avventende
                cy.get(`#mulighetForArbeid-selector-0`).should('have.value', 'avventende');
                cy.get('#avventendePeriode-0').should(
                    'have.value',
                    dayjs(oppgave.papirSmRegistering.perioder[0].fom).format('DD.MM.YYYY') +
                        ' - ' +
                        dayjs(oppgave.papirSmRegistering.perioder[0].tom).format('DD.MM.YYYY'),
                );
                cy.get('#avventendeInnspillTilArbeidsgiver-0').should('have.value', 'Må avvente');

                // Gradert
                cy.get(`#mulighetForArbeid-selector-1`).should('have.value', 'gradert');
                cy.get('#gradertGrad-1').should('have.value', '80');
                cy.get('#gradertPeriode-1').should(
                    'have.value',
                    dayjs(oppgave.papirSmRegistering.perioder[1].fom).format('DD.MM.YYYY') +
                        ' - ' +
                        dayjs(oppgave.papirSmRegistering.perioder[1].tom).format('DD.MM.YYYY'),
                );
                cy.get('#gradertReisetilskudd-1').should('not.be.checked');

                // Aktivitet ikke mulig
                cy.get(`#mulighetForArbeid-selector-2`).should('have.value', 'fullsykmelding');
                cy.get('#aktivitetIkkeMuligPeriode-2').should(
                    'have.value',
                    dayjs(oppgave.papirSmRegistering.perioder[2].fom).format('DD.MM.YYYY') +
                        ' - ' +
                        dayjs(oppgave.papirSmRegistering.perioder[2].tom).format('DD.MM.YYYY'),
                );
                cy.get('#aktivitetIkkeMuligMedisinskArsak-2').should('be.checked');
                cy.get('#aktivitetIkkeMuligMedisinskArsakType-2').within(() => {
                    oppgave.papirSmRegistering.perioder[2].aktivitetIkkeMulig.medisinskArsak.arsak.forEach((arsak) => {
                        cy.get('#' + arsak + '-medisinsk-2').should('be.checked');
                    });
                });
                cy.get('#aktivitetIkkeMuligMedisinskArsakBeskrivelse-2').should(
                    'have.value',
                    oppgave.papirSmRegistering.perioder[2].aktivitetIkkeMulig.medisinskArsak.beskrivelse,
                );
                cy.get('#aktivitetIkkeMuligArbeidsrelatertArsak-2').should('be.checked');
                cy.get('#aktivitetIkkeMuligArbeidsrelatertArsakType-2').within(() => {
                    oppgave.papirSmRegistering.perioder[2].aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.forEach(
                        (arsak) => {
                            cy.get('#' + arsak + '-arbeidsrelatert-2').should('be.checked');
                        },
                    );
                });
                cy.get('#aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse-2').should(
                    'have.value',
                    oppgave.papirSmRegistering.perioder[2].aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse,
                );

                // Behandlingsdager
                cy.get(`#mulighetForArbeid-selector-3`).should('have.value', 'behandlingsdager');
                cy.get('#behandlingsdagerPeriode-3').should(
                    'have.value',
                    dayjs(oppgave.papirSmRegistering.perioder[3].fom).format('DD.MM.YYYY') +
                        ' - ' +
                        dayjs(oppgave.papirSmRegistering.perioder[3].tom).format('DD.MM.YYYY'),
                );
                cy.get('#behandlingsdagerAntall-3').should(
                    'have.value',
                    oppgave.papirSmRegistering.perioder[3].behandlingsdager,
                );

                // Reisetilskudd
                cy.get(`#mulighetForArbeid-selector-4`).should('have.value', 'reisetilskudd');
                cy.get('#reisetilskuddPeriode-4').should(
                    'have.value',
                    dayjs(oppgave.papirSmRegistering.perioder[4].fom).format('DD.MM.YYYY') +
                        ' - ' +
                        dayjs(oppgave.papirSmRegistering.perioder[4].tom).format('DD.MM.YYYY'),
                );
            });

            //
            // END - Mulighet for arbeid
            //

            cy.get('#arbeidsfoerEtterPeriode').should('be.checked');
            cy.get('#hensynArbeidsplassen').should(
                'have.value',
                oppgave.papirSmRegistering.prognose.hensynArbeidsplassen,
            );

            cy.get('#erIArbeid').should('be.checked');
            cy.get('#egetArbeidPaSikt').should('be.checked');
            cy.get('#arbeidFOM').should(
                'have.value',
                dayjs(oppgave.papirSmRegistering.prognose.erIArbeid.arbeidFOM).format('DD.MM.YYYY'),
            );
            cy.get('#annetArbeidPaSikt').should('be.checked');
            cy.get('#vurderingsDatoIArbeid').should(
                'have.value',
                dayjs(oppgave.papirSmRegistering.prognose.erIArbeid.vurderingsdato).format('DD.MM.YYYY'),
            );
            cy.get('#erIkkeIArbeid').should('be.checked');
            cy.get('#arbeidsforPaSikt').should('be.checked');
            cy.get('#arbeidsforFOM').should(
                'have.value',
                dayjs(oppgave.papirSmRegistering.prognose.erIkkeIArbeid.arbeidsforFOM).format('DD.MM.YYYY'),
            );
            cy.get('#vurderingsDatoUtenArbeid').should(
                'have.value',
                dayjs(oppgave.papirSmRegistering.prognose.erIkkeIArbeid.vurderingsdato).format('DD.MM.YYYY'),
            );

            cy.get('#harUtdypendeOpplysninger').should('not.be.checked');

            cy.get('#tiltakArbeidsplassen').should('have.value', oppgave.papirSmRegistering.tiltakArbeidsplassen);
            cy.get('#tiltakNav').should('have.value', oppgave.papirSmRegistering.tiltakNAV);
            cy.get('#andreTiltak').should('have.value', oppgave.papirSmRegistering.andreTiltak);

            cy.get('#meldingTilNavBistand').should('be.checked');
            cy.get('#meldingTilNavBegrunn').should(
                'have.value',
                oppgave.papirSmRegistering.meldingTilNAV.beskrivBistand,
            );

            cy.get('#meldingTilArbeidsgiverBeskriv').should(
                'have.value',
                oppgave.papirSmRegistering.meldingTilArbeidsgiver,
            );

            cy.get('#erTilbakedatert').should('be.checked');
            cy.get('#kontaktDato').should(
                'have.value',
                dayjs(oppgave.papirSmRegistering.kontaktMedPasient.kontaktDato).format('DD.MM.YYYY'),
            );
            cy.get('#kunneIkkeIvaretaEgneInteresser').should('be.checked');
            cy.get('#begrunnelseIkkeKontakt').should(
                'have.value',
                oppgave.papirSmRegistering.kontaktMedPasient.begrunnelseIkkeKontakt,
            );

            cy.get('#behandletDato').should(
                'have.value',
                dayjs(oppgave.papirSmRegistering.behandletTidspunkt).format('DD.MM.YYYY'),
            );
            cy.get('#hpr').should('have.value', oppgave.papirSmRegistering.behandler.hpr);
            cy.get('#sykmelderTelefon').should('have.value', oppgave.papirSmRegistering.behandler.tlf);
        });
    });

    it('Should not map any field when "oppgave.papirSmRegistrering" is null', () => {
        cy.route({
            method: 'GET',
            url: '/backend/api/v1/oppgave/123',
            response: 'fixture:emptyOppgave.json', // Gets the response from ../fixtures/emptyOppgave.json
        });
        cy.visit('/?oppgaveid=123'); // Baseurl comes from cypress.json

        cy.get('#pasientFnr').should('not.have.value');
        cy.get('#harArbeidsgiver').should('not.have.value');
        cy.get('#arbeidsgiverNavn').should('not.have.value');
        cy.get('#yrkesbetegnelse').should('not.have.value');
        cy.get('#stillingsprosent').should('not.have.value');

        cy.get('#hovedDiagnose').within(() => {
            cy.get('#hovedDiagnose-system').should('not.have.value');
            cy.get('#hovedDiagnose-tekst').should('not.contain.text');
        });

        cy.get('#biDiagnoser').within(() => {
            cy.get(`#bidiagnose-0-system`).should('not.exist');
            cy.get(`#bidiagnose-0-kode`).should('not.exist');
            cy.get(`#bidiagnose-0-tekst`).should('not.exist');
        });

        cy.get('#annenFraversArsak').should('not.be.checked');
        cy.get('#annenFraversArsakGrunn').should('not.exist');
        cy.get('#annenFraversArsakBeskrivelse').should('not.exist');

        cy.get('#svangerskap').should('not.be.checked');
        cy.get('#yrkesskade').should('not.be.checked');
        cy.get('#yrkesskadeDato').should('not.exist');
        cy.get('#skjermesForPasient').should('not.be.checked');

        cy.get('#avventendeSykmelding').should('not.be.checked');
        cy.get('#avventendePeriode').should('not.exist');
        cy.get('#avventendeInnspillTilArbeidsgiver').should('not.exist');

        cy.get('#gradertSykmelding').should('not.be.checked');
        cy.get('#gradertPeriode').should('not.exist');
        cy.get('#gradertGrad').should('not.exist');
        cy.get('#gradertReisetilskudd').should('not.be.checked');

        cy.get('#aktivitetIkkeMuligSykmelding').should('not.be.checked');
        cy.get('#aktivitetIkkeMuligPeriode').should('not.exist');
        cy.get('#aktivitetIkkeMuligMedisinskArsak').should('not.exist');
        cy.get('#aktivitetIkkeMuligMedisinskArsakType').should('not.exist');
        cy.get('#aktivitetIkkeMuligMedisinskArsakBeskrivelse').should('not.exist');
        cy.get('#aktivitetIkkeMuligArbeidsrelatertArsak').should('not.exist');
        cy.get('#aktivitetIkkeMuligArbeidsrelatertArsakType').should('not.exist');
        cy.get('#aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse').should('not.exist');

        cy.get('#behandlingsdagerSykmelding').should('not.be.checked');
        cy.get('#behandlingsdagerPeriode').should('not.exist');
        cy.get('#behandlingsdagerAntall').should('not.exist');

        cy.get('#reisetilskuddSykmelding').should('not.be.checked');
        cy.get('#reisetilskuddPeriode').should('not.exist');

        cy.get('#arbeidsfoerEtterPeriode').should('not.be.checked');
        cy.get('#hensynArbeidsplassen').should('not.exist');

        cy.get('#erIArbeid').should('not.be.checked');
        cy.get('#egetArbeidPaSikt').should('not.exist');
        cy.get('#arbeidFOM').should('not.exist');
        cy.get('#annetArbeidPaSikt').should('not.exist');
        cy.get('#vurderingsDatoIArbeid').should('not.exist');
        cy.get('#erIkkeIArbeid').should('not.be.checked');
        cy.get('#arbeidsforPaSikt').should('not.exist');
        cy.get('#arbeidsforFOM').should('not.exist');
        cy.get('#vurderingsDatoUtenArbeid').should('not.exist');

        cy.get('#harUtdypendeOpplysninger').should('not.be.checked');

        cy.get('#tiltakArbeidsplassen').should('not.have.value');
        cy.get('#tiltakNav').should('not.have.value');
        cy.get('#andreTiltak').should('not.have.value');

        cy.get('#meldingTilNavBistand').should('not.be.checked');
        cy.get('#meldingTilNavBegrunn').should('not.exist');

        cy.get('#meldingTilArbeidsgiverBeskriv').should('not.have.value');

        cy.get('#erTilbakedatert').should('not.be.checked');
        cy.get('#kontaktDato').should('not.exist');

        cy.get('#kunneIkkeIvaretaEgneInteresser').should('not.be.checked');
        cy.get('#begrunnelseIkkeKontakt').should('not.exist');

        cy.get('#behandletDato').should('not.have.value');
        cy.get('#hpr').should('not.have.value');
        cy.get('#sykmelderTelefon').should('not.have.value');
    });
});
