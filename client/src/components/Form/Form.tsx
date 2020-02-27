import './Form.less';

import React, { useState } from 'react';
import { Checkbox, Input, Select, Textarea } from 'nav-frontend-skjema';
import { Element, EtikettLiten } from 'nav-frontend-typografi';

import FormHeader from './components/FormHeader';
import Panel from '../Panel/Panel';
import Row from './components/formComponents/Row';
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
            <div className="form-margin-bottom section-content">
                <Input
                    className="form-margin-bottom half"
                    label={<EtikettLiten>Fødselsdato (11 siffer)</EtikettLiten>}
                />
                <Input
                    className="form-margin-bottom half"
                    label={<EtikettLiten>Startdato for legemeldt fravær</EtikettLiten>}
                />
            </div>
            <SectionContainer section={sections[SectionTitle.PASIENTOPPLYSNINGER]}>
                <Row>
                    <Input label={<Element>1.1.1 Etternavn</Element>} />
                    <Input label={<Element>1.1.2 Fornavn</Element>} />
                </Row>

                <Input className="form-margin-bottom half" label={<Element>1.3 Telefon</Element>} />

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
                <Row>
                    <Select className="form-margin-bottom" label={<Element>3.1.1 Kodesystem</Element>}>
                        <option value="system1">ICPC-2</option>
                        <option value="system2">ICD-10</option>
                    </Select>
                    <Input className="form-margin-bottom" label={<Element>3.1.2 Kode</Element>} />
                    <Input className="form-margin-bottom" label={<Element>3.1.3 Kode</Element>} />
                </Row>
                <Element className="form-margin-bottom">3.2 Bidiagnose</Element>
                <Row>
                    <Select className="form-margin-bottom" label={<Element>3.2.1 Kodesystem</Element>}>
                        <option value="system1">ICPC-2</option>
                        <option value="system2">ICD-10</option>
                    </Select>
                    <Input className="form-margin-bottom" label={<Element>3.2.2 Kode</Element>} />
                    <Input className="form-margin-bottom" label={<Element>3.2.3 Kode</Element>} />
                </Row>
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
                <Subsection sectionIdentifier="4.1">
                    <Checkbox
                        checked={true}
                        label="Pasienten kan benytte avventende sykmelding"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && (
                        <>
                            <div>"periodevalg 4.1.1 f.o.m., 4.1.2 t.o.m."</div>
                            <Textarea
                                maxLength={0}
                                value=""
                                onChange={() => console.log('textarea')}
                                label={<Element>4.1.3 Innspill til arbeidsgiver om tilrettelegging</Element>}
                            />
                        </>
                    )}
                </Subsection>
                <Subsection sectionIdentifier="4.2">
                    <Checkbox
                        checked={true}
                        label="Pasienten kan være delvis i arbeid (gradert sykmelding)"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && (
                        <>
                            <div>"periodevalg 4.2.1 f.o.m., 4.2.2 t.o.m."</div>
                            <Input
                                className="form-margin-bottom half"
                                label={<Element>4.2.3 Oppgi grad for sykmelding</Element>}
                            />
                        </>
                    )}

                    <Element>4.2.4</Element>
                    <Checkbox
                        checked={false}
                        label="Pasienten kan være delvis i arbeid ved bruk av reisetilskudd"
                        onChange={() => console.log('checkbox')}
                    />
                </Subsection>

                <Subsection sectionIdentifier="4.3">
                    <Checkbox
                        checked={true}
                        label="Pasienten kan ikke være i arbeid (100 prosent sykmelding)"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && (
                        <>
                            <div>"periodevalg 4.3.1 f.o.m., 4.3.2 t.o.m."</div>
                            <Element>4.3.3</Element>
                            <Checkbox
                                checked={false}
                                label="Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet"
                                onChange={() => console.log('checkbox')}
                            />
                            <Element>4.3.4</Element>
                            <Checkbox
                                checked={false}
                                label="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                                onChange={() => console.log('checkbox')}
                            />
                        </>
                    )}
                </Subsection>

                <Subsection sectionIdentifier="4.4">
                    <Checkbox
                        checked={true}
                        label="Pasienten kan ikke være i arbeid på behandlingsdager"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && (
                        <>
                            <div>"periodevalg 4.4.1 f.o.m., 4.4.2 t.o.m."</div>

                            <Input
                                className="form-margin-bottom half"
                                label={<Element>4.4.3 Oppgi antall dager i perioden</Element>}
                            />
                        </>
                    )}
                </Subsection>

                <Subsection sectionIdentifier="4.5" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Pasienten kan være i fullt arbeid ved bruk av reisetilskudd"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && <div>"periodevalg 4.4.1 f.o.m., 4.4.2 t.o.m."</div>}
                </Subsection>
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.FRISKMELDING_PROGNOSE]}>
                <Subsection sectionIdentifier="5.1" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Pasienten er 100 prosent arbeidsfør etter denne perioden"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>5.1.1 Beskrive eventuelle hensyn som må tas på arbeidsplassen</Element>}
                        />
                    )}
                </Subsection>
            </SectionContainer>
            <SectionContainer
                section={sections[SectionTitle.ARBEIDSEVNE]}
                expanded={expanded[SectionTitle.ARBEIDSEVNE]}
                setExpanded={() => expandSection(SectionTitle.ARBEIDSEVNE)}
            >
                <Subsection sectionIdentifier="7.1">
                    <Checkbox
                        checked={true}
                        label="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>Beskriv</Element>}
                        />
                    )}
                </Subsection>

                <Subsection sectionIdentifier="7.2">
                    <Checkbox checked={true} label="Tiltak i regi av NAV" onChange={() => console.log('checkbox')} />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>Beskriv. (Hvis det er behov for bistand fra NAV nå, bruk felt 8.)</Element>}
                        />
                    )}
                </Subsection>

                <Subsection sectionIdentifier="7.3" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Eventuelle andre innspill til NAV"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>Beskriv</Element>}
                        />
                    )}
                </Subsection>
            </SectionContainer>
            <SectionContainer
                section={sections[SectionTitle.TIL_NAV]}
                expanded={expanded[SectionTitle.TIL_NAV]}
                setExpanded={() => expandSection(SectionTitle.TIL_NAV)}
            >
                <Subsection sectionIdentifier="8.1" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Ønskes bistand fra NAV nå?"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>Begrunn nærmere</Element>}
                        />
                    )}
                </Subsection>
            </SectionContainer>
            <SectionContainer
                section={sections[SectionTitle.TIL_ARBEIDSGIVER]}
                expanded={expanded[SectionTitle.TIL_ARBEIDSGIVER]}
                setExpanded={() => expandSection(SectionTitle.TIL_ARBEIDSGIVER)}
            >
                <Subsection sectionIdentifier="9.1" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Andre innspill til arbeidsgiver"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>Andre innspill til arbeidsgiver</Element>}
                        />
                    )}
                </Subsection>
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.TILBAKEDATERING]}>
                <Subsection sectionIdentifier="11.1" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Er sykmelding tilbakedatert?"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && <div>"datovalg Oppgi dato for dokumenterbar kontakt med pasienten"</div>}
                </Subsection>

                <Subsection sectionIdentifier="11.2" underline={false}>
                    <Checkbox
                        checked={true}
                        label="Pasienten har ikke kunnet ivareta egne interesser"
                        onChange={() => console.log('checkbox')}
                    />
                    {true && (
                        <Textarea
                            maxLength={0}
                            value=""
                            onChange={() => console.log('textarea')}
                            label={<Element>Begrunn</Element>}
                        />
                    )}
                </Subsection>
            </SectionContainer>
            <SectionContainer section={sections[SectionTitle.BEKREFTELSE]}>
                <Subsection sectionIdentifier="12.1" underline={false}>
                    <Checkbox
                        checked={false}
                        label="Pasienten er kjent eller har vist legitimasjon"
                        onChange={() => console.log('checkbox')}
                    />
                </Subsection>

                <Input className="form-margin-bottom" label={<Element>12.2 Sykmelders navn</Element>} />

                <Row>
                    <Input className="form-margin-bottom" label={<Element>12.4 HPR-nummer</Element>} />
                    <Input className="form-margin-bottom" label={<Element>12.5 Telefon</Element>} />
                </Row>

                <Input className="form-margin-bottom" label={<Element>12.6 Adresse</Element>} />
            </SectionContainer>
        </Panel>
    );
};

export default Form;
