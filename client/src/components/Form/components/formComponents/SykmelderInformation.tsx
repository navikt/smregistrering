import 'nav-frontend-tabell-style';

import './SykmelderInformation.less';

import React from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { Helsepersonellkategori, Sykmelder, autorisasjon } from '../../../../types/Sykmelder';

interface SykmelderInformationProps {
    sykmelder: Sykmelder | null | undefined;
}

const SykmelderInformation = ({ sykmelder }: SykmelderInformationProps) => {
    if (!sykmelder) {
        return null;
    }

    return (
        <article className="sykmelder-information">
            <header>
                <Undertittel tag="h3">Informasjon om behandler</Undertittel>
            </header>
            <div className="sykmelder-information__content">
                <div className="sykmelder-information__col">
                    {sykmelder.fornavn ? (
                        <section>
                            <Element tag="h4">Navn:</Element>
                            <Normaltekst>
                                {sykmelder.fornavn} {sykmelder.mellomnavn} {sykmelder.etternavn}
                            </Normaltekst>
                        </section>
                    ) : null}
                    <section>
                        <Element tag="h4">Fødselsnummer:</Element>
                        <Normaltekst>{sykmelder.fnr}</Normaltekst>
                    </section>
                </div>
                <section className="sykmelder-information__col">
                    <Element tag="h4">Godkjenninger:</Element>
                    {sykmelder.godkjenninger.length > 0 ? (
                        <table className="tabell">
                            <thead>
                                <tr>
                                    <th>Kategori</th>
                                    <th>Autorisasjonstype</th>
                                    <th>Autorisert</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sykmelder.godkjenninger.map((godkjenning) => {
                                    if (godkjenning.helsepersonellkategori?.verdi && godkjenning.autorisasjon?.verdi) {
                                        return (
                                            <>
                                                <tr>
                                                    <td>
                                                        {
                                                            Helsepersonellkategori[
                                                                godkjenning.helsepersonellkategori.verdi
                                                            ]
                                                        }
                                                    </td>
                                                    <td>{autorisasjon[godkjenning.autorisasjon?.verdi]}</td>
                                                    <td>{godkjenning.autorisasjon.aktiv ? 'Ja' : 'Nei'}</td>
                                                </tr>
                                            </>
                                        );
                                    }
                                    return null;
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <Normaltekst>Behandler mangler godkjenninger</Normaltekst>
                    )}
                </section>
            </div>
        </article>
    );
};

export default SykmelderInformation;
