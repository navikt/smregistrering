import React from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { Sykmelder } from '../../../../types/Sykmelder';

interface SykmelderInformationProps {
    sykmelder: Sykmelder | null | undefined;
}

const SykmelderInformation = ({ sykmelder }: SykmelderInformationProps) => {
    if (!sykmelder) {
        return null;
    }

    return (
        <article style={{ marginBottom: '0rem' }}>
            <header style={{ marginBottom: '0.5rem' }}>
                <Undertittel tag="h3">Informasjon on sykmelder</Undertittel>
            </header>
            <section style={{ marginBottom: '0.5rem' }}>
                <Element tag="h4">Fødselsnummer:</Element>
                <Normaltekst>{sykmelder.fnr}</Normaltekst>
            </section>
            <section style={{ marginBottom: '0.5rem' }}>
                <Element tag="h4">Aktør ID</Element>
                <Normaltekst>{sykmelder.aktorId}</Normaltekst>
            </section>
            {sykmelder.fornavn ? (
                <section style={{ marginBottom: '0.5rem' }}>
                    <Element tag="h4">Navn:</Element>
                    <Normaltekst>
                        {sykmelder.fornavn} {sykmelder.mellomnavn} {sykmelder.etternavn}
                    </Normaltekst>
                </section>
            ) : null}
        </article>
    );
};

export default SykmelderInformation;
