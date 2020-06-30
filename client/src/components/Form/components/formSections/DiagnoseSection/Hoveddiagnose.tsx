import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Select } from 'nav-frontend-skjema';

import FormLabel from '../../formComponents/FormLabel';
import Row from '../../formComponents/Row';
import SearchableInput from '../../formComponents/SearchableInput';
import { DiagnosekodeSystem, Diagnosekoder } from '../../../../../types/Diagnosekode';
import { SchemaType } from '../../../Form';
import { Validate } from '../../../validation';

type HoveddiagnoseProps = {
    id?: string;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    validate: Validate;
    schema: SchemaType;
    diagnosekoder: Diagnosekoder;
    feil?: string;
};

const Hoveddiagnose = ({ id, setSchema, validate, schema, diagnosekoder, feil }: HoveddiagnoseProps) => {
    const hoveddiagnose = schema.hovedDiagnose;
    const hoveddiagnoseSystem: keyof Diagnosekoder | undefined =
        hoveddiagnose && (hoveddiagnose.system as keyof Diagnosekoder);

    return (
        <div id={id}>
            <FormLabel label="3.1 Hoveddiagnose" />
            <Row>
                <Select
                    className="form-margin-bottom"
                    value={hoveddiagnoseSystem}
                    onChange={({ target: { value } }) => {
                        const system = value === 'undefined' ? undefined : (value as keyof Diagnosekoder);
                        const updatedDiagnose = {
                            system,
                            kode: '',
                            tekst: '',
                        };
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    hovedDiagnose: updatedDiagnose,
                                };
                                validate('hovedDiagnose', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    label={<Element>3.1.1 Kodesystem</Element>}
                >
                    <option value="undefined">Velg kodesystem</option>
                    <option value={DiagnosekodeSystem.ICD10}>ICD-10</option>
                    <option value={DiagnosekodeSystem.ICPC2}>ICPC-2</option>
                </Select>
                <SearchableInput
                    system={hoveddiagnoseSystem}
                    diagnosekoder={diagnosekoder}
                    label={<Element>3.1.2 Kode</Element>}
                    onChange={(kode?: string, tekst?: string) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    hovedDiagnose: {
                                        ...state.hovedDiagnose,
                                        kode,
                                        tekst,
                                    },
                                };
                                validate('hovedDiagnose', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    value={hoveddiagnose}
                />
                <div>
                    <Element>3.1.3 Tekst</Element>
                    <Normaltekst style={{ marginTop: '8px' }}>
                        {hoveddiagnose && hoveddiagnose.tekst ? hoveddiagnose.tekst : '-'}
                    </Normaltekst>
                </div>
            </Row>
            {feil ? (
                <p style={{ position: 'relative', top: '-1.5rem' }} className="typo-feilmelding">
                    {feil}
                </p>
            ) : null}
        </div>
    );
};

export default Hoveddiagnose;
