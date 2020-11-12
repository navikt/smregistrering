import React from 'react';
import { CheckboksPanelGruppe, CheckboksPanelProps, FeiloppsummeringFeil } from 'nav-frontend-skjema';

import { MedisinskArsakType } from '../../../../../types/RegistrertSykmelding';
import { SchemaType } from '../../../Form';

interface MedisinskArsakProps {
    formState: SchemaType;
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
}

const MedisinskArsak = ({ formState, setFormState, errors }: MedisinskArsakProps) => {
    const { aktivitetIkkeMuligMedisinskArsakType } = formState;

    const checkboxes: CheckboksPanelProps[] = Object.entries(MedisinskArsakType).map(([key, value]) => {
        return {
            label: value,
            id: key + '-medisinsk',
            value: key,
            checked: aktivitetIkkeMuligMedisinskArsakType?.includes(key as keyof typeof MedisinskArsakType),
        };
    });

    const updateCheckboxes = (value: keyof typeof MedisinskArsakType): void => {
        setFormState((formState) => {
            if (!formState.aktivitetIkkeMuligMedisinskArsakType) {
                return {
                    ...formState,
                    aktivitetIkkeMuligMedisinskArsakType: [value as keyof typeof MedisinskArsakType],
                };
            }
            const shouldAddArsak: boolean = !formState.aktivitetIkkeMuligMedisinskArsakType.includes(value);
            const newMedisinskArsakType: (keyof typeof MedisinskArsakType)[] = shouldAddArsak
                ? [...formState.aktivitetIkkeMuligMedisinskArsakType, value]
                : formState.aktivitetIkkeMuligMedisinskArsakType.filter((arsak) => arsak !== value);

            return {
                ...formState,
                aktivitetIkkeMuligMedisinskArsakType: newMedisinskArsakType,
            };
        });
    };

    return (
        <div id="aktivitetIkkeMuligMedisinskArsakType" className="form-margin-bottom">
            <CheckboksPanelGruppe
                legend="Medisinske årsaker"
                checkboxes={checkboxes}
                onChange={(_event, value) => updateCheckboxes(value)}
                feil={errors.get('aktivitetIkkeMuligMedisinskArsakType')?.feilmelding}
            />
        </div>
    );
};

export default MedisinskArsak;
