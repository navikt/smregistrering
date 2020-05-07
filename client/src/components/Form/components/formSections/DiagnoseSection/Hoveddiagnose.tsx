import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Select } from 'nav-frontend-skjema';

import FormLabel from '../../formComponents/FormLabel';
import Row from '../../formComponents/Row';
import SearchableInput from '../../formComponents/SearchableInput';
import { Diagnosekoder } from '../../../../../types/Diagnosekode';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Validate } from '../../../validation';

type HoveddiagnoseProps = {
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    validate: Validate;
    schema: SchemaType;
    diagnosekoder: Diagnosekoder;
    feil?: string;
};

const Hoveddiagnose = ({ setSchema, validate, schema, diagnosekoder, feil }: HoveddiagnoseProps) => {
    const hoveddiagnose = schema.hovedDiagnose;
    const hoveddiagnoseSystem: keyof Diagnosekoder | undefined =
        hoveddiagnose && (hoveddiagnose.system as keyof Diagnosekoder);

    return (
        <>
            <FormLabel label="3.1 Hoveddiagnose" />
            <Row>
                <Select
                    className="form-margin-bottom"
                    onChange={({ target: { value } }) => {
                        const system = value === 'undefined' ? undefined : (value as keyof Diagnosekoder);
                        const updatedDiagnose = {
                            system,
                            kode: '',
                            tekst: '',
                        };
                        setSchema(state => ({
                            ...state,
                            hovedDiagnose: updatedDiagnose,
                        }));
                        validate('hovedDiagnose', updatedDiagnose);
                    }}
                    label={<Element>3.1.1 Kodesystem</Element>}
                >
                    <option value="undefined">Velg kodesystem</option>
                    <option value="icpc2">ICPC-2</option>
                    <option value="icd10">ICD-10</option>
                </Select>
                <SearchableInput
                    system={hoveddiagnoseSystem}
                    diagnosekoder={diagnosekoder}
                    label={<Element>3.1.2 Kode</Element>}
                    onChange={(kode?: string, tekst?: string) => {
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
            {feil ? (
                <p style={{ position: 'relative', top: '-1.5rem' }} className="typo-feilmelding">
                    {feil}
                </p>
            ) : null}
        </>
    );
};

export default Hoveddiagnose;
