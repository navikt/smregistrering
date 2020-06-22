import React from 'react';
import { CheckboksPanelGruppe, CheckboksPanelProps } from 'nav-frontend-skjema';

import { ArbeidsrelatertArsakType } from '../../../../../types/RegistrertSykmelding';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Validate } from '../../../validation';

interface ArbeidsrelatertArsakProps {
    schema: SchemaType;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
}

const ArbeidsrelatertArsak = ({ schema, setSchema, errors, validate }: ArbeidsrelatertArsakProps) => {
    const { aktivitetIkkeMuligArbeidsrelatertArsakType } = schema;

    const checkboxes: CheckboksPanelProps[] = Object.entries(ArbeidsrelatertArsakType).map(([key, value]) => {
        return {
            label: value,
            value: key,
            checked: aktivitetIkkeMuligArbeidsrelatertArsakType?.includes(key as keyof typeof ArbeidsrelatertArsakType),
        };
    });

    return (
        <div id="aktivitetIkkeMuligArbeidsrelatertArsakType" className="form-margin-bottom">
            <CheckboksPanelGruppe
                legend="Arbeidsrelaterte årsaker"
                checkboxes={checkboxes}
                onChange={(_event, value) => {
                    setSchema(state => {
                        if (!state.aktivitetIkkeMuligArbeidsrelatertArsakType) {
                            validate('aktivitetIkkeMuligArbeidsrelatertArsakType', value);
                            return {
                                ...state,
                                aktivitetIkkeMuligArbeidsrelatertArsakType: [
                                    value as keyof typeof ArbeidsrelatertArsakType,
                                ],
                            };
                        }
                        const shouldAddArsak: boolean = !state.aktivitetIkkeMuligArbeidsrelatertArsakType.includes(
                            value,
                        );
                        const newArray: (keyof typeof ArbeidsrelatertArsakType)[] = state.aktivitetIkkeMuligArbeidsrelatertArsakType.filter(
                            arsak => arsak !== value,
                        );
                        if (shouldAddArsak) {
                            newArray.push(value);
                        }
                        validate('aktivitetIkkeMuligArbeidsrelatertArsakType', newArray);
                        return {
                            ...state,
                            aktivitetIkkeMuligArbeidsrelatertArsakType: newArray,
                        };
                    });
                }}
                feil={errors.aktivitetIkkeMuligArbeidsrelatertArsakType}
            />
        </div>
    );
};

export default ArbeidsrelatertArsak;
