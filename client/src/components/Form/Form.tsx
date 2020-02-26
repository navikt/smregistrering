import React, { useState } from 'react';

import FormHeader from './components/FormHeader';
import Panel from '../Panel/Panel';
import SectionContainer from './components/SectionContainer';
import { SectionTitle, Sections } from '../../App';

type FormProps = {
    sections: Sections;
};

const Form = ({ sections }: FormProps) => {
    const [expanded, setExpanded] = useState({
        [SectionTitle.MULIGHET_FOR_ARBEID]: true,
        [SectionTitle.ARBEIDSEVNE]: true,
        [SectionTitle.TIL_NAV]: true,
        [SectionTitle.TIL_ARBEIDSGIVER]: true,
    });

    return (
        <>
            <FormHeader />
            <Panel>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
                <p>filler</p>
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
                    setExpanded={() =>
                        setExpanded(state => ({
                            ...state,
                            [SectionTitle.MULIGHET_FOR_ARBEID]: !state[SectionTitle.MULIGHET_FOR_ARBEID],
                        }))
                    }
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
                    setExpanded={() =>
                        setExpanded(state => ({
                            ...state,
                            [SectionTitle.ARBEIDSEVNE]: !state[SectionTitle.ARBEIDSEVNE],
                        }))
                    }
                >
                    <p>filler</p>
                    <p>filler</p>
                    <p>filler</p>
                </SectionContainer>
                <SectionContainer
                    section={sections[SectionTitle.TIL_NAV]}
                    expanded={expanded[SectionTitle.TIL_NAV]}
                    setExpanded={() =>
                        setExpanded(state => ({
                            ...state,
                            [SectionTitle.TIL_NAV]: !state[SectionTitle.TIL_NAV],
                        }))
                    }
                >
                    <p>filler</p>
                    <p>filler</p>
                    <p>filler</p>
                </SectionContainer>
                <SectionContainer
                    section={sections[SectionTitle.TIL_ARBEIDSGIVER]}
                    expanded={expanded[SectionTitle.TIL_ARBEIDSGIVER]}
                    setExpanded={() =>
                        setExpanded(state => ({
                            ...state,
                            [SectionTitle.TIL_ARBEIDSGIVER]: !state[SectionTitle.TIL_ARBEIDSGIVER],
                        }))
                    }
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
        </>
    );
};

export default Form;
