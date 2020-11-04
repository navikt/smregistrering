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
    // TODO:
    return <div></div>;
    /*
    const { aktivitetIkkeMuligArbeidsrelatertArsakType } = schema;

    const checkboxes: CheckboksPanelProps[] = Object.entries(ArbeidsrelatertArsakType).map(([key, value]) => {
        return {
            label: value,
            id: key + '-arbeidsrelatert',
            value: key,
            checked: aktivitetIkkeMuligArbeidsrelatertArsakType?.includes(key as keyof typeof ArbeidsrelatertArsakType),
        };
    });

    const updateCheckboxes = (value: keyof typeof ArbeidsrelatertArsakType): void => {
        setSchema((state) => {
            if (!state.aktivitetIkkeMuligArbeidsrelatertArsakType) {
                const updatedSchema = {
                    ...state,
                    aktivitetIkkeMuligArbeidsrelatertArsakType: [value as keyof typeof ArbeidsrelatertArsakType],
                };
                validate('aktivitetIkkeMuligArbeidsrelatertArsakType', updatedSchema);
                return updatedSchema;
            }
            const shouldAddArsak: boolean = !state.aktivitetIkkeMuligArbeidsrelatertArsakType.includes(value);
            const newArbeidsrelatertArsakType: (keyof typeof ArbeidsrelatertArsakType)[] = shouldAddArsak
                ? [...state.aktivitetIkkeMuligArbeidsrelatertArsakType, value]
                : state.aktivitetIkkeMuligArbeidsrelatertArsakType.filter((arsak) => arsak !== value);

            const updatedSchema = {
                ...state,
                aktivitetIkkeMuligArbeidsrelatertArsakType: newArbeidsrelatertArsakType,
            };
            validate('aktivitetIkkeMuligArbeidsrelatertArsakType', updatedSchema);
            return updatedSchema;
        });
    };

    return (
        <div id="aktivitetIkkeMuligArbeidsrelatertArsakType" className="form-margin-bottom">
            <CheckboksPanelGruppe
                legend="Arbeidsrelaterte årsaker"
                checkboxes={checkboxes}
                onChange={(_event, value) => updateCheckboxes(value)}
                feil={errors.aktivitetIkkeMuligArbeidsrelatertArsakType}
            />
        </div>
    );
    */
};

export default ArbeidsrelatertArsak;
