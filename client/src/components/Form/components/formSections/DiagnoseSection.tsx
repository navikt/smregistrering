import React from 'react';
import { Checkbox, Input, Select, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import DatePicker from '../formComponents/DatePicker';
import FormLabel from '../formComponents/FormLabel';
import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { Arbeidsevne, InnspillNav, TilretteleggingArbeidsplass, TiltakNav } from './ArbeidsevneSection';
import { Arbeidsgiver } from './ArbeidsgiverSection';
import {
    AvventendeSykmelding,
    Behandling,
    FullSykmelding,
    GradertSykmelding,
    Reisetilskudd,
} from './MulighetForArbeidSection';
import { Bekreftelse } from './BekreftelseSection';
import { FieldValues } from '../../Form';
import { Friskmelding } from './FriskmeldingSection';
import { MeldingTilNav } from './MeldingTilNavSection';
import { Metadata } from './PasientopplysningerSection';
import { Section } from '../../../../App';
import { Tilbakedatering } from './TilbakedateringSection';

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
    setSchema: (
        value: React.SetStateAction<
            Partial<
                Metadata &
                    Arbeidsgiver &
                    Arbeidsevne &
                    MedisinskVurdering &
                    AvventendeSykmelding &
                    GradertSykmelding &
                    FullSykmelding &
                    Behandling &
                    Reisetilskudd &
                    Friskmelding &
                    TilretteleggingArbeidsplass &
                    TiltakNav &
                    InnspillNav &
                    MeldingTilNav &
                    Tilbakedatering &
                    Bekreftelse &
                    FieldValues
            >
        >,
    ) => void;
    schema: Partial<
        Metadata &
            Arbeidsgiver &
            Arbeidsevne &
            MedisinskVurdering &
            AvventendeSykmelding &
            GradertSykmelding &
            FullSykmelding &
            Behandling &
            Reisetilskudd &
            Friskmelding &
            TilretteleggingArbeidsplass &
            TiltakNav &
            InnspillNav &
            MeldingTilNav &
            Tilbakedatering &
            Bekreftelse &
            FieldValues
    >;
};

const DiagnoseSection = ({ section, setSchema, schema }: DiagnoseSectionProps) => {
    return (
        <SectionContainer section={section}>
            <FormLabel label="3.1 Hoveddiagnose" />
            <Row>
                <Select className="form-margin-bottom" label={<Element>3.1.1 Kodesystem</Element>}>
                    <option value="system1">ICPC-2</option>
                    <option value="system2">ICD-10</option>
                </Select>
                <Input className="form-margin-bottom" label={<Element>3.1.2 Kode</Element>} />
                <Input className="form-margin-bottom" label={<Element>3.1.3 Kode</Element>} />
            </Row>
            <FormLabel label="3.2 Bidiagnose" />
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
