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

            cy.get('#avventendeSykmelding').should('be.checked');
            const avventendePeriode = oppgave.papirSmRegistering.perioder.filter(
                (periode) => !!periode.avventendeInnspillTilArbeidsgiver,
            )[0];
            cy.get('#avventendePeriode').should(
                'have.value',
                dayjs(avventendePeriode.fom).format('DD.MM.YYYY') +
                    ' - ' +
                    dayjs(avventendePeriode.tom).format('DD.MM.YYYY'),
            );
            cy.get('#avventendeInnspillTilArbeidsgiver').should(
                'have.value',
                avventendePeriode.avventendeInnspillTilArbeidsgiver,
            );

            cy.get('#gradertSykmelding').should('be.checked');
            const gradertPeriode = oppgave.papirSmRegistering.perioder.filter((periode) => !!periode.gradert)[0];
            cy.get('#gradertPeriode').should(
                'have.value',
                dayjs(gradertPeriode.fom).format('DD.MM.YYYY') + ' - ' + dayjs(gradertPeriode.tom).format('DD.MM.YYYY'),
            );
            cy.get('#gradertGrad').should('have.value', gradertPeriode.gradert.grad);
            cy.get('#gradertReisetilskudd').should('be.checked');

            cy.get('#aktivitetIkkeMuligSykmelding').should('be.checked');
            const aktivitetIkkeMuligPeriode = oppgave.papirSmRegistering.perioder.filter(
                (periode) => !!periode.aktivitetIkkeMulig,
            )[0];
            cy.get('#aktivitetIkkeMuligPeriode').should(
                'have.value',
                dayjs(aktivitetIkkeMuligPeriode.fom).format('DD.MM.YYYY') +
                    ' - ' +
                    dayjs(aktivitetIkkeMuligPeriode.tom).format('DD.MM.YYYY'),
            );
            cy.get('#aktivitetIkkeMuligMedisinskArsak').should('be.checked');
            cy.get('#aktivitetIkkeMuligMedisinskArsakType').within(() => {
                aktivitetIkkeMuligPeriode.aktivitetIkkeMulig.medisinskArsak.arsak.forEach((arsak) => {
                    cy.get('#' + arsak + '-medisinsk').should('be.checked');
                });
            });
            cy.get('#aktivitetIkkeMuligMedisinskArsakBeskrivelse').should(
                'have.value',
                aktivitetIkkeMuligPeriode.aktivitetIkkeMulig.medisinskArsak.beskrivelse,
            );
            cy.get('#aktivitetIkkeMuligArbeidsrelatertArsak').should('be.checked');
            cy.get('#aktivitetIkkeMuligArbeidsrelatertArsakType').within(() => {
                aktivitetIkkeMuligPeriode.aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.forEach((arsak) => {
                    cy.get('#' + arsak + '-arbeidsrelatert').should('be.checked');
                });
            });
            cy.get('#aktivitetIkkeMuligArbeidsrelatertArsakBeskrivelse').should(
                'have.value',
                aktivitetIkkeMuligPeriode.aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse,
            );

            cy.get('#behandlingsdagerSykmelding').should('be.checked');
            const behandlingsdagerSykmelding = oppgave.papirSmRegistering.perioder.filter(
                (periode) => !!periode.behandlingsdager,
            )[0];
            cy.get('#behandlingsdagerPeriode').should(
                'have.value',
                dayjs(behandlingsdagerSykmelding.fom).format('DD.MM.YYYY') +
                    ' - ' +
                    dayjs(behandlingsdagerSykmelding.tom).format('DD.MM.YYYY'),
            );
            cy.get('#behandlingsdagerAntall').should('have.value', behandlingsdagerSykmelding.behandlingsdager);

            cy.get('#reisetilskuddSykmelding').should('be.checked');
            const reisetilskuddSykmelding = oppgave.papirSmRegistering.perioder.filter(
                (periode) => !!periode.reisetilskudd,
            )[0];
            cy.get('#reisetilskuddPeriode').should(
                'have.value',
                dayjs(reisetilskuddSykmelding.fom).format('DD.MM.YYYY') +
                    ' - ' +
                    dayjs(reisetilskuddSykmelding.tom).format('DD.MM.YYYY'),
            );

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

            cy.get('#utdypende611').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.1']['6.1.1'].svar,
            );
            cy.get('#utdypende612').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.1']['6.1.2'].svar,
            );
            cy.get('#utdypende613').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.1']['6.1.3'].svar,
            );
            cy.get('#utdypende614').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.1']['6.1.4'].svar,
            );
            cy.get('#utdypende615').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.1']['6.1.5'].svar,
            );
            cy.get('#utdypende621').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.2']['6.2.1'].svar,
            );
            cy.get('#utdypende622').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.2']['6.2.2'].svar,
            );
            cy.get('#utdypende623').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.2']['6.2.3'].svar,
            );
            cy.get('#utdypende624').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.2']['6.2.4'].svar,
            );
            cy.get('#utdypende631').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.3']['6.3.1'].svar,
            );
            cy.get('#utdypende632').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.3']['6.3.2'].svar,
            );
            cy.get('#utdypende641').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.4']['6.4.1'].svar,
            );
            cy.get('#utdypende642').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.4']['6.4.2'].svar,
            );
            cy.get('#utdypende643').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.4']['6.4.3'].svar,
            );
            cy.get('#utdypende651').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.5']['6.5.1'].svar,
            );
            cy.get('#utdypende652').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.5']['6.5.2'].svar,
            );
            cy.get('#utdypende653').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.5']['6.5.3'].svar,
            );
            cy.get('#utdypende654').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.5']['6.5.4'].svar,
            );
            cy.get('#utdypende661').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.6']['6.6.1'].svar,
            );
            cy.get('#utdypende662').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.6']['6.6.2'].svar,
            );
            cy.get('#utdypende663').should(
                'have.value',
                oppgave.papirSmRegistering.utdypendeOpplysninger['6.6']['6.6.3'].svar,
            );

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

        cy.get('#utdypende611').should('not.exist');
        cy.get('#utdypende612').should('not.exist');
        cy.get('#utdypende613').should('not.exist');
        cy.get('#utdypende614').should('not.exist');
        cy.get('#utdypende615').should('not.exist');
        cy.get('#utdypende621').should('not.exist');
        cy.get('#utdypende622').should('not.exist');
        cy.get('#utdypende623').should('not.exist');
        cy.get('#utdypende624').should('not.exist');
        cy.get('#utdypende631').should('not.exist');
        cy.get('#utdypende632').should('not.exist');
        cy.get('#utdypende641').should('not.exist');
        cy.get('#utdypende642').should('not.exist');
        cy.get('#utdypende643').should('not.exist');
        cy.get('#utdypende651').should('not.exist');
        cy.get('#utdypende652').should('not.exist');
        cy.get('#utdypende653').should('not.exist');
        cy.get('#utdypende654').should('not.exist');
        cy.get('#utdypende661').should('not.exist');
        cy.get('#utdypende662').should('not.exist');
        cy.get('#utdypende663').should('not.exist');

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
