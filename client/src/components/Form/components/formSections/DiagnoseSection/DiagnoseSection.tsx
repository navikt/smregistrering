import React from 'react';
import { Checkbox, FeiloppsummeringFeil, Input } from 'nav-frontend-skjema';

import AnnenFraversArsak from './AnnenFraversArsak';
import Bidiagnoser from './Bidiagnoser';
import DatePicker from '../../formComponents/DatePicker';
import ExpandableField from '../../formComponents/ExpandableField';
import Hoveddiagnose from './Hoveddiagnose';
import SectionContainer from '../../SectionContainer';
import Subsection from '../../formComponents/Subsection';
import { AnnenFraverGrunn, Diagnose } from '../../../../../types/RegistrertSykmelding';
import { Diagnosekoder } from '../../../../../types/Diagnosekode';
import { SchemaType } from '../../../Form';
import { Section } from '../../../../../types/Section';

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
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
    formState: SchemaType;
    diagnosekoder: Diagnosekoder;
};

const DiagnoseSection = ({ section, setFormState, formState, errors, diagnosekoder }: DiagnoseSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Hoveddiagnose
                id="hovedDiagnose"
                setFormState={setFormState}
                formState={formState}
                diagnosekoder={diagnosekoder}
                feil={errors.get('hovedDiagnose')?.feilmelding}
            />

            <Bidiagnoser
                id="biDiagnoser"
                setFormState={setFormState}
                formState={formState}
                diagnosekoder={diagnosekoder}
                feil={errors.get('biDiagnoser')?.feilmelding}
            />

            <hr />
            <Subsection sectionIdentifier="3.3">
                <Checkbox
                    id="annenFraversArsak"
                    checked={formState.annenFraversArsak}
                    label="Annen lovfestet fraværsgrunn § 8-4, 3. ledd oppgis hvis relevant"
                    onChange={() =>
                        setFormState((formState) => ({
                            ...formState,
                            annenFraversArsak: !formState.annenFraversArsak,
                            annenFraversArsakGrunn: undefined,
                            annenFraversArsakBeskrivelse: undefined,
                        }))
                    }
                    feil={errors.get('annenFraversArsak')?.feilmelding}
                />
                <br />
                <ExpandableField show={formState.annenFraversArsak}>
                    <>
                        <AnnenFraversArsak formState={formState} setFormState={setFormState} errors={errors} />
                        <Input
                            id="annenFraversArsakBeskrivelse"
                            className="form-margin-bottom"
                            type="text"
                            value={
                                formState.annenFraversArsakBeskrivelse ? formState.annenFraversArsakBeskrivelse : undefined
                            }
                            onChange={({ target: { value } }) => {
                                setFormState((formState) => ({ ...formState, annenFraversArsakBeskrivelse: value }));
                            }}
                            label="3.3.2 Beskriv fravær (valgfritt)"
                            feil={errors.get('annenFraversArsakBeskrivelse')?.feilmelding}
                        />
                    </>
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="3.4">
                <Checkbox
                    id="svangerskap"
                    checked={formState.svangerskap}
                    label="Sykdommen er svangerskapsrelatert"
                    onChange={() =>
                        setFormState((formState) => ({ ...formState, svangerskap: !formState.svangerskap }))
                    }
                    feil={errors.get('svangerskap')?.feilmelding}
                />
            </Subsection>

            <Subsection sectionIdentifier="3.5">
                <Checkbox
                    id="yrkesskade"
                    checked={formState.yrkesskade}
                    label="Sykmeldingen kan skyldes en yrkesskade / yrkessykdom"
                    onChange={() =>
                        setFormState((formState) => ({
                            ...formState,
                            yrkesskade: !formState.yrkesskade,
                            yrkesskadeDato: undefined,
                        }))
                    }
                    feil={errors.get('yrkesskade')?.feilmelding}
                />
                <br />
                <ExpandableField show={formState.yrkesskade}>
                    <DatePicker
                        id="yrkesskadeDato"
                        label="3.6 Eventuell skadedato"
                        value={formState.yrkesskadeDato ? formState.yrkesskadeDato : undefined}
                        onChange={(newDates) => {
                            setFormState((formState) => ({ ...formState, yrkesskadeDato: newDates }));
                        }}
                    />
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="3.7" underline={false}>
                <Checkbox
                    id="skjermesForPasient"
                    checked={formState.skjermesForPasient ? formState.skjermesForPasient : undefined}
                    label="Det er påtrengende nødvendig å skjerme pasienten for medisinske opplysninger, jf. pasient- og brukerrettighetsloven §§ 3-2 og 5-1"
                    onChange={() =>
                        setFormState((formState) => ({
                            ...formState,
                            skjermesForPasient: !formState.skjermesForPasient,
                        }))
                    }
                    feil={errors.get('skjermesForPasient')?.feilmelding}
                />
            </Subsection>
        </SectionContainer>
    );
};

export default DiagnoseSection;
