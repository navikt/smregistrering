import React from 'react';
import { Checkbox, Input, Select } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import Bidiagnoser from './Bidiagnoser';
import DatePicker from '../../formComponents/DatePicker';
import ExpandableField from '../../formComponents/ExpandableField';
import Hoveddiagnose from './Hoveddiagnose';
import SectionContainer from '../../SectionContainer';
import Subsection from '../../formComponents/Subsection';
import { AnnenFraverGrunn, Diagnose } from '../../../../../types/RegistrertSykmelding';
import { Diagnosekoder } from '../../../../../types/Diagnosekode';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Section } from '../../../../../types/Section';
import { Validate } from '../../../validation';

export type MedisinskVurdering = {
    hovedDiagnose?: Partial<Diagnose>;
    biDiagnoser?: Diagnose[];
    yrkesskade: boolean;
    yrkesskadeDato?: Date;
    svangerskap: boolean;
    annenFraversArsak: boolean;
    annenFraversArsakGrunn?: AnnenFraverGrunn[];
    annenFraversArsakBeskrivelse?: string;
    skjermesForPasient?: boolean; // TODO: burde kanskje flyttes
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
    return (
        <SectionContainer section={section}>
            <Hoveddiagnose
                setSchema={setSchema}
                validate={validate}
                schema={schema}
                diagnosekoder={diagnosekoder}
                feil={errors.hovedDiagnose}
            />

            <Bidiagnoser
                setSchema={setSchema}
                schema={schema}
                validate={validate}
                diagnosekoder={diagnosekoder}
                feil={errors.biDiagnoser}
            />

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
                    feil={errors.annenFraversArsak}
                />
                <br />
                <ExpandableField show={schema.annenFraversArsak}>
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
                            value={schema.annenFraversArsakBeskrivelse}
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
                </ExpandableField>
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
                    feil={errors.svangerskap}
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
                    feil={errors.yrkesskade}
                />
                <br />
                <ExpandableField show={schema.yrkesskade}>
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
                </ExpandableField>
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
                    feil={errors.skjermesForPasient}
                />
            </Subsection>
        </SectionContainer>
    );
};

export default DiagnoseSection;