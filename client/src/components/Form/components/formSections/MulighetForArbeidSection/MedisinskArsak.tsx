import React from 'react';
import { CheckboksPanelGruppe, CheckboksPanelProps, FeiloppsummeringFeil } from 'nav-frontend-skjema';

import { AktivitetIkkeMuligPeriodeMFA } from './AktivitetIkkeMuligPeriode';
import { FormType } from '../../../Form';
import { MedisinskArsakType } from '../../../../../types/RegistrertSykmelding';
import { MulighetForArbeidTypes } from './MulighetForArbeidSection';

interface MedisinskArsakProps {
    mfaPeriode: AktivitetIkkeMuligPeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    index: number;
}

const MedisinskArsak = ({ mfaPeriode, updateMfa, errors, index }: MedisinskArsakProps) => {
    const { aktivitetIkkeMuligMedisinskArsakType } = mfaPeriode;

    const checkboxes: CheckboksPanelProps[] = Object.entries(MedisinskArsakType).map(([key, value]) => {
        return {
            label: value,
            id: `${key}-medisinsk-${index}`,
            value: key,
            checked: aktivitetIkkeMuligMedisinskArsakType?.includes(key as keyof typeof MedisinskArsakType),
        };
    });

    const updateCheckboxes = (value: keyof typeof MedisinskArsakType): void => {
        if (aktivitetIkkeMuligMedisinskArsakType === undefined) {
            const updatedSchema = {
                ...mfaPeriode,
                aktivitetIkkeMuligMedisinskArsakType: [value],
            };
            updateMfa(updatedSchema);
            return;
        }

        const shouldAddArsak: boolean = !aktivitetIkkeMuligMedisinskArsakType.includes(value);
        const newMedisinskArsakType: (keyof typeof MedisinskArsakType)[] = shouldAddArsak
            ? [...aktivitetIkkeMuligMedisinskArsakType, value]
            : aktivitetIkkeMuligMedisinskArsakType.filter((arsak) => arsak !== value);

        const updatedSchema = {
            ...mfaPeriode,
            aktivitetIkkeMuligMedisinskArsakType: newMedisinskArsakType,
        };
        updateMfa(updatedSchema);
    };

    return (
        <div id={`aktivitetIkkeMuligMedisinskArsakType-${index}`} className="form-margin-bottom">
            <CheckboksPanelGruppe
                legend="Medisinske årsaker"
                checkboxes={checkboxes}
                onChange={(_event, value) => updateCheckboxes(value)}
            />
        </div>
    );
};

export default MedisinskArsak;
