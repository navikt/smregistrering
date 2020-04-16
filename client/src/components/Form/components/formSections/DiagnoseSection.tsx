import React from 'react';
import { Checkbox, Input, Select, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import DatePicker from '../formComponents/DatePicker';
import FormLabel from '../formComponents/FormLabel';
import Row from '../formComponents/Row';
import SearchableInput from '../formComponents/SearchableInput';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { Diagnosekoder } from '../../../../types/Diagnosekode';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export enum MedisinskVurderingField {
    HOVEDDIAGNOSE = 'hoveddiagnose',
    BIDIAGNOSER = 'bidiagnoser',
    ANNEN_FRAVAERSARSAK = 'annenFravaersArsak',
    LOVFESTET_FRAVAERSGRUNN = 'lovfestetFravaersgrunn',
    BESKRIV_FRAVAER = 'beskrivFravaeret',
    SVANGERSKAP = 'svangerskap',
    YRKESSKADE = 'yrkesskade',
    YRKESSKADE_DATO = 'yrkesskadeDato',
    SKJERMET_FRA_PASIENT = 'skjermetFraPasient',
}

type Diagnose = {
    system?: string;
    kode?: string;
    tekst?: string;
};

export type MedisinskVurdering = {
    [MedisinskVurderingField.HOVEDDIAGNOSE]: Diagnose;
    [MedisinskVurderingField.BIDIAGNOSER]: Diagnose[];
    [MedisinskVurderingField.ANNEN_FRAVAERSARSAK]?: boolean;
    [MedisinskVurderingField.LOVFESTET_FRAVAERSGRUNN]?: string;
    [MedisinskVurderingField.BESKRIV_FRAVAER]?: string;
    [MedisinskVurderingField.SVANGERSKAP]?: boolean;
    [MedisinskVurderingField.YRKESSKADE]?: boolean;
    [MedisinskVurderingField.YRKESSKADE_DATO]?: Date;
    [MedisinskVurderingField.SKJERMET_FRA_PASIENT]?: boolean;
};

type DiagnoseSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    diagnosekoder: Diagnosekoder;
};

const DiagnoseSection = ({ section, setSchema, schema, diagnosekoder }: DiagnoseSectionProps) => {
    console.log(diagnosekoder);

    return (
        <SectionContainer section={section}>
            <FormLabel label="3.1 Hoveddiagnose" />
            <Row>
                <Select className="form-margin-bottom" label={<Element>3.1.1 Kodesystem</Element>}>
                    <option value="icpc2">ICPC-2</option>
                    <option value="icd10">ICD-10</option>
                </Select>
                <SearchableInput system={'icd10'} diagnosekoder={diagnosekoder} label={<Element>3.1.2 Kode</Element>} />
                <Input className="form-margin-bottom" label={<Element>3.1.3 Tekst</Element>} />
            </Row>
            <FormLabel label="3.2 Bidiagnose" />
            <Row>
                <Select className="form-margin-bottom" label={<Element>3.2.1 Kodesystem</Element>}>
                    <option value="icpc2">ICPC-2</option>
                    <option value="icd10">ICD-10</option>
                </Select>
                <Input className="form-margin-bottom" label={<Element>3.2.2 Kode</Element>} />
                <Input className="form-margin-bottom" label={<Element>3.2.3 Tekst</Element>} />
            </Row>
            <hr />
            <Subsection sectionIdentifier="3.3">
                <Checkbox
                    checked={schema[MedisinskVurderingField.ANNEN_FRAVAERSARSAK]}
                    label="Annen lovfestet fraværsgrunn § 8-4, 3. ledd oppgis hvis relevant"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [MedisinskVurderingField.ANNEN_FRAVAERSARSAK]: !state[
                                MedisinskVurderingField.ANNEN_FRAVAERSARSAK
                            ],
                        }))
                    }
                />
                <br />
                {schema[MedisinskVurderingField.ANNEN_FRAVAERSARSAK] && (
                    <>
                        <Input
                            className="form-margin-bottom half"
                            onChange={({ target: { value } }) =>
                                setSchema(state => ({
                                    ...state,
                                    [MedisinskVurderingField.LOVFESTET_FRAVAERSGRUNN]: value,
                                }))
                            }
                            label={<Element>3.3.1 Lovfestet fraværsgrunn</Element>}
                        />
                        <Textarea
                            maxLength={0}
                            value={schema[MedisinskVurderingField.BESKRIV_FRAVAER] || ''}
                            onChange={({ target: { value } }) =>
                                setSchema(state => ({
                                    ...state,
                                    [MedisinskVurderingField.BESKRIV_FRAVAER]: value,
                                }))
                            }
                            label={<Element>3.3.2 Beskriv fravær (valgfritt)</Element>}
                        />
                    </>
                )}
            </Subsection>

            <Subsection sectionIdentifier="3.4">
                <Checkbox
                    checked={schema[MedisinskVurderingField.SVANGERSKAP]}
                    label="Sykdommen er svangerskapsrelatert"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [MedisinskVurderingField.SVANGERSKAP]: !state[MedisinskVurderingField.SVANGERSKAP],
                        }))
                    }
                />
            </Subsection>

            <Subsection sectionIdentifier="3.5">
                <Checkbox
                    checked={schema[MedisinskVurderingField.YRKESSKADE]}
                    label="Sykmeldingen kan skyldes en yrkesskade / yrkessykdom"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [MedisinskVurderingField.YRKESSKADE]: !state[MedisinskVurderingField.YRKESSKADE],
                        }))
                    }
                />
                <br />
                {schema[MedisinskVurderingField.YRKESSKADE] && (
                    <DatePicker
                        label="3.6 Eventuell skadedato"
                        value={schema[MedisinskVurderingField.YRKESSKADE_DATO]}
                        onChange={newDates =>
                            setSchema(state => ({
                                ...state,
                                [MedisinskVurderingField.YRKESSKADE_DATO]: newDates,
                            }))
                        }
                    />
                )}
            </Subsection>

            <Subsection sectionIdentifier="3.7" underline={false}>
                <Checkbox
                    checked={schema[MedisinskVurderingField.SKJERMET_FRA_PASIENT]}
                    label="Det er påtrengende nødvendig å skjerme pasienten for medisinske opplysninger, jf. pasient- og brukerrettighetsloven §§ 3-2 og 5-1"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [MedisinskVurderingField.SKJERMET_FRA_PASIENT]: !state[
                                MedisinskVurderingField.SKJERMET_FRA_PASIENT
                            ],
                        }))
                    }
                />
            </Subsection>
        </SectionContainer>
    );
};

export default DiagnoseSection;
