import React from 'react';

import FormHeader from './components/FormHeader';
import Panel from '../Panel/Panel';
import SectionHeader from './components/SectionHeader';
import { SectionTitle, Sections } from '../../App';

type FormProps = {
    sections: Sections;
};

const Form = ({ sections }: FormProps) => {
    return (
        <>
            <FormHeader />
            <Panel>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <SectionHeader section={sections[SectionTitle.PASIENTOPPLYSNINGER]} />
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <SectionHeader section={sections[SectionTitle.ARBEIDSGIVER]} />
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <SectionHeader section={sections[SectionTitle.DIAGNOSE]} />
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <SectionHeader section={sections[SectionTitle.MULIGHET_FOR_ARBEID]} />
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <SectionHeader section={sections[SectionTitle.FRISKMELDING_PROGNOSE]} />
                <SectionHeader section={sections[SectionTitle.ARBEIDSEVNE]} />
                <SectionHeader section={sections[SectionTitle.TIL_NAV]} />
                <SectionHeader section={sections[SectionTitle.TIL_ARBEIDSGIVER]} />
                <SectionHeader section={sections[SectionTitle.TILBAKEDATERING]} />
                <SectionHeader section={sections[SectionTitle.BEKREFTELSE]} />
                <SectionHeader section={sections[SectionTitle.REGISTRER_SYKMELDINGEN]} />
            </Panel>
        </>
    );
};

export default Form;
