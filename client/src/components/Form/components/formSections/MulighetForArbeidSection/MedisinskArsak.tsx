import React from 'react';
import { CheckboksPanelGruppe, CheckboksPanelProps, FeiloppsummeringFeil } from 'nav-frontend-skjema';

import { FormType } from '../../../Form';
import { MedisinskArsakType, MedisinskArsakTypeValues } from '../../../../../types/sykmelding/Periode';
import { getEntries } from '../../../formUtils/useForm';

import { MulighetForArbeidTypes } from './MulighetForArbeidSection';
import { AktivitetIkkeMuligPeriodeMFA } from './AktivitetIkkeMuligPeriode';

interface MedisinskArsakProps {
    mfaPeriode: AktivitetIkkeMuligPeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    index: number;
}

const MedisinskArsak = ({ mfaPeriode, updateMfa, errors, index }: MedisinskArsakProps) => {
    const { aktivitetIkkeMuligMedisinskArsakType } = mfaPeriode;

    const checkboxes: CheckboksPanelProps[] = getEntries(MedisinskArsakTypeValues).map(([key, value]) => {
        return {
            label: value,
            id: `${key}-medisinsk-${index}`,
            value: key,
            checked: aktivitetIkkeMuligMedisinskArsakType.includes(key),
        };
    });

    const updateCheckboxes = (value: MedisinskArsakType): void => {
        if (aktivitetIkkeMuligMedisinskArsakType.length === 0) {
            const updatedSchema = {
                ...mfaPeriode,
                aktivitetIkkeMuligMedisinskArsakType: new Array<MedisinskArsakType>(value),
            };
            updateMfa(updatedSchema);
            return;
        }

        const shouldAddArsak: boolean = !aktivitetIkkeMuligMedisinskArsakType?.includes(value);
        const newMedisinskArsakType: MedisinskArsakType[] = shouldAddArsak
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
