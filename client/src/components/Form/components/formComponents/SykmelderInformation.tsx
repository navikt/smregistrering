import './SykmelderInformation.less';

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
        <article className="sykmelder-information">
            <header>
                <Undertittel tag="h3">Informasjon on sykmelder</Undertittel>
            </header>
            <section>
                <Element tag="h4">Fødselsnummer:</Element>
                <Normaltekst>{sykmelder.fnr}</Normaltekst>
            </section>
            <section>
                <Element tag="h4">Aktør ID</Element>
                <Normaltekst>{sykmelder.aktorId}</Normaltekst>
            </section>
            {sykmelder.fornavn ? (
                <section>
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
