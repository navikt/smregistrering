import Hjelpetekst from 'nav-frontend-hjelpetekst'
import React from 'react'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import { EtikettAdvarsel, EtikettSuksess } from 'nav-frontend-etiketter'

import { AutorisasjonValues, HelsepersonellkategoriValues, Sykmelder } from '../../../../types/Sykmelder'

import FormLabel from './FormLabel'
import Row from './Row'

interface SykmelderInformationProps {
    sykmelder: Sykmelder | null | undefined
    sykmeldersFornavn: string | null | undefined
    sykmeldersEtternavn: string | null | undefined
}

const SykmelderInformation = ({ sykmelder, sykmeldersFornavn, sykmeldersEtternavn }: SykmelderInformationProps) => {
    if (!sykmelder) {
        return null
    }

    return (
        <article className="sykmelder-information">
            <header className="sykmelder-information__header">
                <div className="form-label">
                    <Undertittel tag="h3">Informasjon om behandleren</Undertittel>
                    <Hjelpetekst className="form-label__help-text">
                        <div style={{ maxWidth: '20rem' }}>
                            Informasjon om behandler er hentet fra HPR, basert på HPR-nummeret som ble lest ut fra
                            papirsykmeldingen. Her kan det skje tolkningsfeil, pass på at informasjonen stemmer med
                            informasjonen i papirsykmeldingen.
                        </div>
                    </Hjelpetekst>
                </div>
            </header>
            <div className="sykmelder-information__content">
                <Row>
                    {sykmelder.fornavn ? (
                        <section>
                            <Element tag="h4">Navn</Element>
                            <Normaltekst>
                                {sykmelder.fornavn} {sykmelder.mellomnavn} {sykmelder.etternavn}
                            </Normaltekst>
                        </section>
                    ) : null}
                    <section>
                        <Element tag="h4">Fødselsnummer</Element>
                        <Normaltekst>{sykmelder.fnr}</Normaltekst>
                    </section>
                </Row>
                <section style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex' }}>
                        <Element tag="h4" style={{ marginRight: '0.5rem' }}>
                            Navn fra papirsykmeldingen
                        </Element>
                        <Hjelpetekst>
                            <div style={{ maxWidth: '20rem' }}>
                                Dette er informasjon lest ut fra den skannede papirsykmeldingen. Hvis navnet ikke
                                samsvarer med navnet over kan det tyde på at HPR-nummer har blitt tolket feil.
                            </div>
                        </Hjelpetekst>
                    </div>
                    <Normaltekst>
                        {sykmeldersFornavn
                            ? sykmeldersFornavn + ' ' + sykmeldersEtternavn
                            : 'Klarte ikke hente ut navn fra papirsykmelding'}
                    </Normaltekst>
                </section>

                <section>
                    <FormLabel
                        label="Autorisasjoner"
                        helpText="Viser behandlers lisenser og autorisasjoner fra Helsedirektoratet."
                    />
                    {sykmelder.godkjenninger.length > 0 ? (
                        <table className="tabell tabell--stripet">
                            <thead>
                                <tr>
                                    <th>Kategori</th>
                                    <th>Autorisasjonstype</th>
                                    <th>Autorisert</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sykmelder.godkjenninger.map((godkjenning, index) => {
                                    if (godkjenning.helsepersonellkategori?.verdi && godkjenning.autorisasjon?.verdi) {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {
                                                        HelsepersonellkategoriValues[
                                                            godkjenning.helsepersonellkategori.verdi
                                                        ]
                                                    }
                                                </td>
                                                <td>
                                                    {`${godkjenning.autorisasjon.verdi} ${
                                                        AutorisasjonValues[godkjenning.autorisasjon.verdi]
                                                    }`}
                                                </td>
                                                <td>
                                                    {godkjenning.autorisasjon.aktiv ? (
                                                        <EtikettSuksess>Ja</EtikettSuksess>
                                                    ) : (
                                                        <EtikettAdvarsel>Nei</EtikettAdvarsel>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    }
                                    return null
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <Normaltekst>Behandler mangler godkjenninger</Normaltekst>
                    )}
                </section>
            </div>
        </article>
    )
}

export default SykmelderInformation
