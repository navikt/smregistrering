import React from 'react';
import { CheckboksPanelGruppe, CheckboksPanelProps } from 'nav-frontend-skjema';

import { ErrorSchemaType, SchemaType } from '../../../Form';
import { MedisinskArsakType } from '../../../../../types/RegistrertSykmelding';
import { Validate } from '../../../validation';

interface MedisinskArsakProps {
    schema: SchemaType;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
}

const MedisinskArsak = ({ schema, setSchema, errors, validate }: MedisinskArsakProps) => {
    const { aktivitetIkkeMuligMedisinskArsakType } = schema;

    const checkboxes: CheckboksPanelProps[] = Object.entries(MedisinskArsakType).map(([key, value]) => {
        return {
            label: value,
            value: key,
            checked: aktivitetIkkeMuligMedisinskArsakType?.includes(key as keyof typeof MedisinskArsakType),
        };
    });

    return (
        <div id="aktivitetIkkeMuligMedisinskArsakType" className="form-margin-bottom">
            <CheckboksPanelGruppe
                legend="Medisinske årsaker"
                checkboxes={checkboxes}
                onChange={(_event, value) => {
                    setSchema(state => {
                        if (!state.aktivitetIkkeMuligMedisinskArsakType) {
                            validate('aktivitetIkkeMuligMedisinskArsakType', value);
                            return {
                                ...state,
                                aktivitetIkkeMuligMedisinskArsakType: [value as keyof typeof MedisinskArsakType],
                            };
                        }
                        const shouldAddArsak: boolean = !state.aktivitetIkkeMuligMedisinskArsakType.includes(value);
                        const newArray: (keyof typeof MedisinskArsakType)[] = state.aktivitetIkkeMuligMedisinskArsakType.filter(
                            arsak => arsak !== value,
                        );
                        if (shouldAddArsak) {
                            newArray.push(value);
                        }
                        validate('aktivitetIkkeMuligMedisinskArsakType', newArray);
                        return {
                            ...state,
                            aktivitetIkkeMuligMedisinskArsakType: newArray,
                        };
                    });
                }}
                feil={errors.aktivitetIkkeMuligMedisinskArsakType}
            />
        </div>
    );
};

export default MedisinskArsak;
