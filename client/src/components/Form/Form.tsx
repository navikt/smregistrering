import './Form.less';

import React, { useState } from 'react';
import { Checkbox, Input, Select, Textarea, TextareaControlled } from 'nav-frontend-skjema';
import { Element, EtikettLiten } from 'nav-frontend-typografi';

import Column from './components/formComponents/Column';
import Columns from './components/formComponents/Columns';
import FormHeader from './components/FormHeader';
import IntroSection from './components/formComponents/IntroSection';
import Panel from '../Panel/Panel';
import SectionContainer from './components/SectionContainer';
import Subsection from './components/formComponents/Subsection';
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
                        <Input
                            className="form-margin-bottom"
                            label={<EtikettLiten>Fødselsdato (11 siffer)</EtikettLiten>}
                        />
                        <Input label={<EtikettLiten>Startdato for legemeldt fravær</EtikettLiten>} />
                    </Column>
                    <Column />
                </Columns>
            </IntroSection>
            <SectionContainer section={sections[SectionTitle.PASIENTOPPLYSNINGER]}>
                <Columns>
                    <Column>
                        <Input className="form-margin-bottom" label={<Element>1.1.1 Etternavn</Element>} />

                        <Input className="form-margin-bottom" label={<Element>1.3 Telefon</Element>} />
                    </Column>
                    <Column>
                        <Input className="form-margin-bottom" label={<Element>1.1.2 Fornavn</Element>} />
                    </Column>
                </Columns>

                <Input className="form-margin-bottom" label={<Element>1.4 Navn på pasientens fastlege</Element>} />
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.ARBEIDSGIVER]}>
                <Select className="form-margin-bottom" label={<Element>2.1 Pasienten har</Element>}>
                    <option value="0">Velg</option>
                    <option value="1">En arbeidsgiver</option>
                    <option value="2">Flere arbeidsgivere</option>
                    <option value="3">Ingen arbeidsgiver</option>
                </Select>
                <Input
                    className="form-margin-bottom"
                    label={<Element>2.2 Arbeidsgiver for denne sykmeldingen</Element>}
                />
                <Input
                    className="form-margin-bottom"
                    label={<Element>2.3 Yrke/stilling for dette arbeidsforholdet</Element>}
                />
                <Input className="form-margin-bottom half" label={<Element>2.4 Stillingsprosent</Element>} />
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.DIAGNOSE]}>
                <Element className="form-margin-bottom">3.1 Hoveddiagnose</Element>
                <Columns>
                    <Column>
                        <Select className="form-margin-bottom" label={<Element>3.1.1 Kodesystem</Element>}>
                            <option value="system1">ICPC-2</option>
                            <option value="system2">ICD-10</option>
                        </Select>
                    </Column>
                    <Column>
                        <Input className="form-margin-bottom" label={<Element>3.1.2 Kode</Element>} />
                    </Column>
                    <Column>
                        <Input className="form-margin-bottom" label={<Element>3.1.3 Kode</Element>} />
                    </Column>
                </Columns>
                <Element className="form-margin-bottom">3.2 Bidiagnose</Element>
                <Columns>
                    <Column>
                        <Select className="form-margin-bottom" label={<Element>3.2.1 Kodesystem</Element>}>
                            <option value="system1">ICPC-2</option>
                            <option value="system2">ICD-10</option>
                        </Select>
                    </Column>
                    <Column>
                        <Input className="form-margin-bottom" label={<Element>3.2.2 Kode</Element>} />
                    </Column>
                    <Column>
                        <Input className="form-margin-bottom" label={<Element>3.2.3 Kode</Element>} />
                    </Column>
                </Columns>
                <hr />
                <Subsection sectionIdentifier="3.3">
                    <Checkbox
                        checked={true}
                        label="Annen lovfestet fraværsgrunn § 8-4, 3. ledd oppgis hvis relevant"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && (
                        <>
                            <Input
                                className="form-margin-bottom half"
                                label={<Element>3.3.1 Lovfestet fraværsgrunn</Element>}
                            />
                            <Textarea
                                maxLength={0}
                                value=""
                                onChange={() => console.log('textarea')}
                                label={<Element>3.3.2 Beskriv fravær (valgfritt)</Element>}
                            />
                        </>
                    )}
                </Subsection>

                <Subsection sectionIdentifier="3.4">
                    <Checkbox
                        checked={false}
                        label="Sykdommen er svangerskapsrelatert"
                        onChange={() => console.log('checkbox')}
                    />
                </Subsection>

                <Subsection sectionIdentifier="3.5">
                    <Checkbox
                        checked={true}
                        label="Sykmeldingen kan skyldes en yrkesskade / yrkessykdom"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && (
                        <Input className="form-margin-bottom half" label={<Element>3.6 Eventuell skadedato</Element>} />
                    )}
                </Subsection>

                <Subsection sectionIdentifier="3.7" underline={false}>
                    <Checkbox
                        checked={false}
                        label="Det er påtrengende nødvendig å skjerme pasienten for medisinske opplysninger, jf. pasient- og brukerrettighetsloven §§ 3-2 og 5-1"
                        onChange={() => console.log('checkbox')}
                    />
                </Subsection>
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
