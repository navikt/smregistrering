import React from 'react';
import { CheckboksPanelGruppe, CheckboksPanelProps, FeiloppsummeringFeil } from 'nav-frontend-skjema';

import { AnnenFraverGrunn } from '../../../../../types/RegistrertSykmelding';
import { SchemaType } from '../../../Form';

interface AnnenFraversArsakProps {
    schema: SchemaType;
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
}

const AnnenFraversArsak = ({ schema, setFormState, errors }: AnnenFraversArsakProps) => {
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
        setFormState((formState) => {
            if (!formState.annenFraversArsakGrunn) {
                return {
                    ...formState,
                    annenFraversArsakGrunn: [value as keyof typeof AnnenFraverGrunn],
                };
            }
            const shouldAddArsak: boolean = !formState.annenFraversArsakGrunn.includes(value);
            const newAnnenFraversArsakGrunn: (keyof typeof AnnenFraverGrunn)[] = shouldAddArsak
                ? [...formState.annenFraversArsakGrunn, value]
                : formState.annenFraversArsakGrunn.filter((arsak) => arsak !== value);
            return {
                ...formState,
                annenFraversArsakGrunn: newAnnenFraversArsakGrunn,
            };
        })
    };

    return (
        <div id="annenFraversArsakGrunn" className="form-margin-bottom">
            <CheckboksPanelGruppe
                legend="3.3.1 Lovfestet fraværsgrunn"
                checkboxes={checkboxes}
                onChange={(_event, value) => updateCheckboxes(value)}
                feil={errors.get('annenFraversArsakGrunn')?.feilmelding}
            />
        </div>
    );
};

export default AnnenFraversArsak;
