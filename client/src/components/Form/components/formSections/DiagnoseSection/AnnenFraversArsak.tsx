import React from 'react';
import { CheckboksPanelGruppe, CheckboksPanelProps } from 'nav-frontend-skjema';

import { AnnenFraverGrunn } from '../../../../../types/RegistrertSykmelding';
import { ErrorSchemaType, SchemaType } from '../../../Form';
import { Validate } from '../../../validation';

interface AnnenFraversArsakProps {
    schema: SchemaType;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    errors: ErrorSchemaType;
    validate: Validate;
}

const AnnenFraversArsak = ({ schema, setSchema, errors, validate }: AnnenFraversArsakProps) => {
    const { annenFraversArsakGrunn } = schema;

    const checkboxes: CheckboksPanelProps[] = Object.entries(AnnenFraverGrunn).map(([key, value]) => {
        return {
            label: value,
            value: key,
            id: key,
            checked: annenFraversArsakGrunn?.includes(key as keyof typeof AnnenFraverGrunn),
        };
    });

    const updateCheckboxes = (value: keyof typeof AnnenFraverGrunn): void => {
        setSchema((state) => {
            if (!state.annenFraversArsakGrunn) {
                const updatedSchema = {
                    ...state,
                    annenFraversArsakGrunn: [value as keyof typeof AnnenFraverGrunn],
                };
                validate('annenFraversArsakGrunn', updatedSchema);
                return updatedSchema;
            }
            const shouldAddArsak: boolean = !state.annenFraversArsakGrunn.includes(value);
            const newAnnenFraversArsakGrunn: (keyof typeof AnnenFraverGrunn)[] = shouldAddArsak
                ? [...state.annenFraversArsakGrunn, value]
                : state.annenFraversArsakGrunn.filter((arsak) => arsak !== value);
            const updatedSchema = {
                ...state,
                annenFraversArsakGrunn: newAnnenFraversArsakGrunn,
            };
            validate('annenFraversArsakGrunn', updatedSchema);
            return updatedSchema;
        });
    };

    return (
        <div id="annenFraversArsakGrunn" className="form-margin-bottom">
            <CheckboksPanelGruppe
                legend="3.3.1 Lovfestet fraværsgrunn"
                checkboxes={checkboxes}
                onChange={(_event, value) => updateCheckboxes(value)}
                feil={errors.annenFraversArsakGrunn}
            />
        </div>
    );
};

export default AnnenFraversArsak;
