import React from 'react';
import { CheckboksPanelGruppe, CheckboksPanelProps } from 'nav-frontend-skjema';

import { ErrorSchemaType } from '../../../Form';
import { FullSykmeldingMFA } from './FullSykmelding';
import { MedisinskArsakType } from '../../../../../types/RegistrertSykmelding';
import { MulighetForArbeidTypes } from './MulighetForArbeidSection';
import { Validate } from '../../../validation';

interface MedisinskArsakProps {
    mulighetForArbeid: FullSykmeldingMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: ErrorSchemaType;
    validate: Validate;
}

const MedisinskArsak = ({ mulighetForArbeid, updateMfa, errors, validate }: MedisinskArsakProps) => {
    const { aktivitetIkkeMuligMedisinskArsakType } = mulighetForArbeid;

    const checkboxes: CheckboksPanelProps[] = Object.entries(MedisinskArsakType).map(([key, value]) => {
        return {
            label: value,
            id: key + '-medisinsk',
            value: key,
            checked: aktivitetIkkeMuligMedisinskArsakType?.includes(key as keyof typeof MedisinskArsakType),
        };
    });

    const updateCheckboxes = (value: keyof typeof MedisinskArsakType): void => {
        if (aktivitetIkkeMuligMedisinskArsakType === undefined) {
            const updatedSchema = {
                ...mulighetForArbeid,
                aktivitetIkkeMuligMedisinskArsakType: [value as keyof typeof MedisinskArsakType],
            };
            // TODO: validate('aktivitetIkkeMuligMedisinskArsakType', updatedSchema);
            updateMfa(updatedSchema);
            return;
        }

        const shouldAddArsak: boolean = !aktivitetIkkeMuligMedisinskArsakType.includes(value);
        const newMedisinskArsakType: (keyof typeof MedisinskArsakType)[] = shouldAddArsak
            ? [...aktivitetIkkeMuligMedisinskArsakType, value]
            : aktivitetIkkeMuligMedisinskArsakType.filter((arsak) => arsak !== value);

        const updatedSchema = {
            ...mulighetForArbeid,
            aktivitetIkkeMuligMedisinskArsakType: newMedisinskArsakType,
        };
        // TODO: validate('aktivitetIkkeMuligMedisinskArsakType', updatedSchema);
        updateMfa(updatedSchema);
    };

    return (
        <div id="aktivitetIkkeMuligMedisinskArsakType" className="form-margin-bottom">
            <CheckboksPanelGruppe
                legend="Medisinske årsaker"
                checkboxes={checkboxes}
                onChange={(_event, value) => updateCheckboxes(value)}
                feil={undefined /* // TODO: errors.aktivitetIkkeMuligMedisinskArsakType */}
            />
        </div>
    );
};

export default MedisinskArsak;
