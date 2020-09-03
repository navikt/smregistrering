import React from 'react';
import { Checkbox, Input } from 'nav-frontend-skjema';

import AnnenFraversArsak from './AnnenFraversArsak';
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
    biDiagnoser: Partial<Diagnose>[];
    yrkesskade: boolean;
    yrkesskadeDato?: Date | null;
    svangerskap: boolean;
    annenFraversArsak: boolean;
    annenFraversArsakGrunn?: (keyof typeof AnnenFraverGrunn)[];
    annenFraversArsakBeskrivelse?: string | null;
    skjermesForPasient?: boolean | null; // TODO: burde kanskje flyttes
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
                id="hovedDiagnose"
                setSchema={setSchema}
                validate={validate}
                schema={schema}
                diagnosekoder={diagnosekoder}
                feil={errors.hovedDiagnose}
            />

            <Bidiagnoser
                id="biDiagnoser"
                setSchema={setSchema}
                schema={schema}
                validate={validate}
                diagnosekoder={diagnosekoder}
                feil={errors.biDiagnoser}
            />

            <hr />
            <Subsection sectionIdentifier="3.3">
                <Checkbox
                    id="annenFraversArsak"
                    checked={schema.annenFraversArsak}
                    label="Annen lovfestet fraværsgrunn § 8-4, 3. ledd oppgis hvis relevant"
                    onChange={() =>
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    annenFraversArsak: !state.annenFraversArsak,
                                    annenFraversArsakGrunn: undefined,
                                    annenFraversArsakBeskrivelse: undefined,
                                };
                                validate('annenFraversArsak', updatedSchema);
                                validate('annenFraversArsakGrunn', updatedSchema);
                                validate('annenFraversArsakBeskrivelse', updatedSchema);
                                return updatedSchema;
                            },
                        )
                    }
                    feil={errors.annenFraversArsak}
                />
                <br />
                <ExpandableField show={schema.annenFraversArsak}>
                    <>
                        <AnnenFraversArsak schema={schema} setSchema={setSchema} errors={errors} validate={validate} />
                        <Input
                            id="annenFraversArsakBeskrivelse"
                            className="form-margin-bottom"
                            type="text"
                            value={
                                schema.annenFraversArsakBeskrivelse ? schema.annenFraversArsakBeskrivelse : undefined
                            }
                            onChange={({ target: { value } }) => {
                                setSchema(
                                    (state): SchemaType => {
                                        const updatedSchema = {
                                            ...state,
                                            annenFraversArsakBeskrivelse: value,
                                        };
                                        validate('annenFraversArsakBeskrivelse', updatedSchema);
                                        return updatedSchema;
                                    },
                                );
                            }}
                            label="3.3.2 Beskriv fravær (valgfritt)"
                            feil={errors.annenFraversArsakBeskrivelse}
                        />
                    </>
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="3.4">
                <Checkbox
                    id="svangerskap"
                    checked={schema.svangerskap}
                    label="Sykdommen er svangerskapsrelatert"
                    onChange={() =>
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    svangerskap: !state.svangerskap,
                                };
                                validate('svangerskap', updatedSchema);
                                return updatedSchema;
                            },
                        )
                    }
                    feil={errors.svangerskap}
                />
            </Subsection>

            <Subsection sectionIdentifier="3.5">
                <Checkbox
                    id="yrkesskade"
                    checked={schema.yrkesskade}
                    label="Sykmeldingen kan skyldes en yrkesskade / yrkessykdom"
                    onChange={() =>
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    yrkesskade: !state.yrkesskade,
                                    yrkesskadeDato: undefined,
                                };
                                validate('yrkesskade', updatedSchema);
                                validate('yrkesskadeDato', updatedSchema);
                                return updatedSchema;
                            },
                        )
                    }
                    feil={errors.yrkesskade}
                />
                <br />
                <ExpandableField show={schema.yrkesskade}>
                    <DatePicker
                        id="yrkesskadeDato"
                        label="3.6 Eventuell skadedato"
                        value={schema.yrkesskadeDato ? schema.yrkesskadeDato : undefined}
                        onChange={(newDates) => {
                            setSchema(
                                (state): SchemaType => {
                                    const updatedSchema = {
                                        ...state,
                                        yrkesskadeDato: newDates,
                                    };
                                    validate('yrkesskadeDato', updatedSchema);
                                    return updatedSchema;
                                },
                            );
                        }}
                    />
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="3.7" underline={false}>
                <Checkbox
                    id="skjermesForPasient"
                    checked={schema.skjermesForPasient ? schema.skjermesForPasient : undefined}
                    label="Det er påtrengende nødvendig å skjerme pasienten for medisinske opplysninger, jf. pasient- og brukerrettighetsloven §§ 3-2 og 5-1"
                    onChange={() =>
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    skjermesForPasient: !state.skjermesForPasient,
                                };
                                validate('skjermesForPasient', updatedSchema);
                                return updatedSchema;
                            },
                        )
                    }
                    feil={errors.skjermesForPasient}
                />
            </Subsection>
        </SectionContainer>
    );
};

export default DiagnoseSection;
