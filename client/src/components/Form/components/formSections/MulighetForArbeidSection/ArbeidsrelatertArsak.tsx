import React from 'react';
import { CheckboksPanelGruppe, CheckboksPanelProps, FeiloppsummeringFeil } from 'nav-frontend-skjema';

import { AktivitetIkkeMuligPeriodeMFA } from './AktivitetIkkeMuligPeriode';
import { ArbeidsrelatertArsakType } from '../../../../../types/RegistrertSykmelding';
import { FormType } from '../../../Form';
import { MulighetForArbeidTypes } from './MulighetForArbeidSection';
import { getEntries } from '../../../formUtils/useForm';

interface ArbeidsrelatertArsakProps {
    mfaPeriode: AktivitetIkkeMuligPeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    index: number;
}

const ArbeidsrelatertArsak = ({ mfaPeriode, updateMfa, errors, index }: ArbeidsrelatertArsakProps) => {
    const { aktivitetIkkeMuligArbeidsrelatertArsakType } = mfaPeriode;

    const checkboxes: CheckboksPanelProps[] = getEntries(ArbeidsrelatertArsakType).map(([key, value]) => {
        return {
            label: value,
            id: `${key}-arbeidsrelatert-${index}`,
            value: key,
            checked: aktivitetIkkeMuligArbeidsrelatertArsakType?.includes(key),
        };
    });

    const updateCheckboxes = (value: keyof typeof ArbeidsrelatertArsakType): void => {
        if (!aktivitetIkkeMuligArbeidsrelatertArsakType) {
            const updatedSchema = {
                ...mfaPeriode,
                aktivitetIkkeMuligArbeidsrelatertArsakType: [value],
            };
            updateMfa(updatedSchema);
            return;
        }
        const shouldAddArsak: boolean = !aktivitetIkkeMuligArbeidsrelatertArsakType.includes(value);
        const newArbeidsrelatertArsakType: (keyof typeof ArbeidsrelatertArsakType)[] = shouldAddArsak
            ? [...aktivitetIkkeMuligArbeidsrelatertArsakType, value]
            : aktivitetIkkeMuligArbeidsrelatertArsakType.filter((arsak) => arsak !== value);

        const updatedSchema = {
            ...mfaPeriode,
            aktivitetIkkeMuligArbeidsrelatertArsakType: newArbeidsrelatertArsakType,
        };
        updateMfa(updatedSchema);
        return;
    };

    return (
        <div id={`aktivitetIkkeMuligArbeidsrelatertArsakType-${index}`} className="form-margin-bottom">
            <CheckboksPanelGruppe
                legend="Arbeidsrelaterte årsaker"
                checkboxes={checkboxes}
                onChange={(_event, value) => updateCheckboxes(value)}
            />
        </div>
    );
};

export default ArbeidsrelatertArsak;
