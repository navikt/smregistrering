import React from 'react';
import { Checkbox, Input, Select } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import DatePicker from '../formComponents/DatePicker';
import FormLabel from '../formComponents/FormLabel';
import Row from '../formComponents/Row';
import SearchableInput from '../formComponents/SearchableInput';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { AnnenFraverGrunn } from '../../../../types/RegistrertSykmelding';
import { Diagnosekoder } from '../../../../types/Diagnosekode';
import { ErrorSchemaType, SchemaType, Validate } from '../../Form';
import { Section } from '../../../../types/Section';

export type Diagnose = {
    system?: string;
    kode?: string;
    tekst?: string;
};

export type MedisinskVurdering = {
    hovedDiagnose?: Diagnose;
    biDiagnoser?: Diagnose[];
    yrkesskade: boolean;
    yrkesskadeDato?: Date;
    svangerskap?: boolean;
    annenFraversArsak: boolean;
    annenFraversArsakGrunn?: AnnenFraverGrunn[];
    annenFraversArsakBeskrivelse?: string;
    skjermesForPasient?: boolean; // burde kanskje flyttes
};

type DiagnoseSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
    schema: SchemaType;
    diagnosekoder: Diagnosekoder;
};

const DiagnoseSection = ({ section, setSchema, schema, errors, validate, diagnosekoder }: DiagnoseSectionProps) => {
    const hoveddiagnose = schema.hovedDiagnose;
    const hoveddiagnoseSystem: keyof Diagnosekoder | undefined =
        hoveddiagnose && (hoveddiagnose.system as keyof Diagnosekoder);

    const bidiagnoser = schema.biDiagnoser;
    const bidiagnose = bidiagnoser && bidiagnoser.length === 1 ? bidiagnoser[0] : undefined;
    const bidiagnoseSystem: keyof Diagnosekoder | undefined = bidiagnose && (bidiagnose.system as keyof Diagnosekoder);

    return (
        <SectionContainer section={section}>
            <FormLabel label="3.1 Hoveddiagnose" />
            <Row>
                <Select
                    className="form-margin-bottom"
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            hovedDiagnose: {
                                system: value,
                                kode: '',
                                tekst: '',
                            },
                        }));
                        validate('hovedDiagnose', value);
                    }}
                    label={<Element>3.1.1 Kodesystem</Element>}
                    feil={errors.hovedDiagnose}
                >
                    <option value={undefined}>Velg kodesystem</option>
                    <option value="icpc2">ICPC-2</option>
                    <option value="icd10">ICD-10</option>
                </Select>
                <SearchableInput
                    value={hoveddiagnose && hoveddiagnose.kode}
                    system={hoveddiagnoseSystem}
                    diagnosekoder={diagnosekoder}
                    label={<Element>3.1.2 Kode</Element>}
                    onChange={(kode: string, tekst: string) => {
                        setSchema(state => ({
                            ...state,
                            hovedDiagnose: {
                                ...state.hovedDiagnose,
                                kode,
                                tekst,
                            },
                        }));
                        validate('hovedDiagnose', {
                            system: hoveddiagnoseSystem,
                            kode,
                            tekst,
                        });
                    }}
                />
                <div>
                    <Element>3.1.3 Tekst</Element>
                    <Normaltekst style={{ marginTop: '8px' }}>
                        {hoveddiagnose && hoveddiagnose.tekst ? hoveddiagnose.tekst : '-'}
                    </Normaltekst>
                </div>
            </Row>
            <FormLabel label="3.2 Bidiagnose" />
            <Row>
                <Select
                    className="form-margin-bottom"
                    onChange={({ target: { value } }) =>
                        setSchema(state => ({
                            ...state,
                            biDiagnoser: [
                                {
                                    system: value,
                                    kode: '',
                                    tekst: '',
                                },
                            ],
                        }))
                    }
                    label={<Element>3.2.1 Kodesystem</Element>}
                >
                    <option value={undefined}>Velg kodesystem</option>
                    <option value="icpc2">ICPC-2</option>
                    <option value="icd10">ICD-10</option>
                </Select>
                <SearchableInput
                    value={bidiagnose && bidiagnose.kode}
                    system={bidiagnoseSystem}
                    diagnosekoder={diagnosekoder}
                    label={<Element>3.2.2 Kode</Element>}
                    onChange={(code: string, text: string) =>
                        setSchema(state => ({
                            ...state,
                            biDiagnoser: [
                                {
                                    system: bidiagnoseSystem,
                                    kode: code,
                                    tekst: text,
                                },
                            ],
                        }))
                    }
                />
                <div>
                    <Element>3.2.3 Tekst</Element>
                    <Normaltekst style={{ marginTop: '8px' }}>
                        {bidiagnose && bidiagnose.tekst ? bidiagnose.tekst : '-'}
                    </Normaltekst>
                </div>
            </Row>
            <hr />
            <Subsection sectionIdentifier="3.3">
                <Checkbox
                    checked={schema.annenFraversArsak}
                    label="Annen lovfestet fraværsgrunn § 8-4, 3. ledd oppgis hvis relevant"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            annenFraversArsak: !state.annenFraversArsak,
                        }))
                    }
                />
                <br />
                {schema.annenFraversArsak && (
                    <>
                        <Select
                            onChange={({ target: { value } }) => {
                                if (value === '0') {
                                    setSchema(state => ({
                                        ...state,
                                        annenFraversArsakGrunn: undefined,
                                    }));
                                } else {
                                    setSchema(state => ({
                                        ...state,
                                        annenFraversArsakGrunn: [value] as AnnenFraverGrunn[],
                                    }));
                                }
                                validate('annenFraversArsakGrunn', value);
                            }}
                            className="form-margin-bottom"
                            label={<Element>3.3.1 Lovfestet fraværsgrunn</Element>}
                            feil={errors.annenFraversArsakGrunn}
                        >
                            <option value="0">Velg</option>
                            {Object.entries(AnnenFraverGrunn).map(([key, value]) => {
                                return (
                                    <option key={key} value={value}>
                                        {value}
                                    </option>
                                );
                            })}
                        </Select>
                        <Input
                            className="form-margin-bottom"
                            type="text"
                            onChange={({ target: { value } }) => {
                                setSchema(state => ({
                                    ...state,
                                    annenFraversArsakBeskrivelse: value,
                                }));
                                validate('annenFraversArsakBeskrivelse', value);
                            }}
                            label={<Element>3.3.2 Beskriv fravær (valgfritt)</Element>}
                            feil={errors.annenFraversArsakBeskrivelse}
                        />
                    </>
                )}
            </Subsection>

            <Subsection sectionIdentifier="3.4">
                <Checkbox
                    checked={schema.svangerskap}
                    label="Sykdommen er svangerskapsrelatert"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            svangerskap: !state.svangerskap,
                        }))
                    }
                />
            </Subsection>

            <Subsection sectionIdentifier="3.5">
                <Checkbox
                    checked={schema.yrkesskade}
                    label="Sykmeldingen kan skyldes en yrkesskade / yrkessykdom"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            yrkesskade: !state.yrkesskade,
                        }))
                    }
                />
                <br />
                {schema.yrkesskade && (
                    <DatePicker
                        label="3.6 Eventuell skadedato"
                        value={schema.yrkesskadeDato}
                        onChange={newDates =>
                            setSchema(state => ({
                                ...state,
                                yrkesskadeDato: newDates,
                            }))
                        }
                    />
                )}
            </Subsection>

            <Subsection sectionIdentifier="3.7" underline={false}>
                <Checkbox
                    checked={schema.skjermesForPasient}
                    label="Det er påtrengende nødvendig å skjerme pasienten for medisinske opplysninger, jf. pasient- og brukerrettighetsloven §§ 3-2 og 5-1"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            skjermesForPasient: !state.skjermesForPasient,
                        }))
                    }
                />
            </Subsection>
        </SectionContainer>
    );
};

export default DiagnoseSection;
