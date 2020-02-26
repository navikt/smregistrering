import './Form.less';

import React, { useState } from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';

import Column from './components/formComponents/Column';
import Columns from './components/formComponents/Columns';
import FormHeader from './components/FormHeader';
import IntroSection from './components/formComponents/IntroSection';
import Panel from '../Panel/Panel';
import SectionContainer from './components/SectionContainer';
import { SectionTitle, Sections } from '../../App';

type FormProps = {
    sections: Sections;
};

type ExpandableSections =
    | SectionTitle.MULIGHET_FOR_ARBEID
    | SectionTitle.ARBEIDSEVNE
    | SectionTitle.TIL_NAV
    | SectionTitle.TIL_ARBEIDSGIVER;

const Form = ({ sections }: FormProps) => {
    const [expanded, setExpanded] = useState<{ [key in ExpandableSections]: boolean }>({
        [SectionTitle.MULIGHET_FOR_ARBEID]: true,
        [SectionTitle.ARBEIDSEVNE]: true,
        [SectionTitle.TIL_NAV]: true,
        [SectionTitle.TIL_ARBEIDSGIVER]: true,
    });

    const expandSection = (name: ExpandableSections) => {
        setExpanded(state => ({
            ...state,
            [name]: !state[name],
        }));
    };

    return (
        <Panel>
            <FormHeader />
            <IntroSection>
                <Columns>
                    <Column>
                        <Input className="form-field" label={<EtikettLiten>Fødselsdato (11 siffer)</EtikettLiten>} />
                        <Input label={<EtikettLiten>Startdato for legemeldt fravær</EtikettLiten>} />
                    </Column>
                    <Column />
                </Columns>
            </IntroSection>
            <SectionContainer section={sections[SectionTitle.PASIENTOPPLYSNINGER]}>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.ARBEIDSGIVER]}>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.DIAGNOSE]}>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
            </SectionContainer>
            <SectionContainer
                section={sections[SectionTitle.MULIGHET_FOR_ARBEID]}
                expanded={expanded[SectionTitle.MULIGHET_FOR_ARBEID]}
                setExpanded={() => expandSection(SectionTitle.MULIGHET_FOR_ARBEID)}
            >
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.FRISKMELDING_PROGNOSE]}>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
            </SectionContainer>
            <SectionContainer
                section={sections[SectionTitle.ARBEIDSEVNE]}
                expanded={expanded[SectionTitle.ARBEIDSEVNE]}
                setExpanded={() => expandSection(SectionTitle.ARBEIDSEVNE)}
            >
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
            </SectionContainer>
            <SectionContainer
                section={sections[SectionTitle.TIL_NAV]}
                expanded={expanded[SectionTitle.TIL_NAV]}
                setExpanded={() => expandSection(SectionTitle.TIL_NAV)}
            >
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
            </SectionContainer>
            <SectionContainer
                section={sections[SectionTitle.TIL_ARBEIDSGIVER]}
                expanded={expanded[SectionTitle.TIL_ARBEIDSGIVER]}
                setExpanded={() => expandSection(SectionTitle.TIL_ARBEIDSGIVER)}
            >
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.TILBAKEDATERING]}>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.BEKREFTELSE]}>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
            </SectionContainer>
        </Panel>
    );
};

export default Form;
