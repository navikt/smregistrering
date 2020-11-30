import React from 'react';
import { CheckboksPanelGruppe, CheckboksPanelProps, FeiloppsummeringFeil } from 'nav-frontend-skjema';

import { AktivitetIkkeMuligPeriodeMFA } from './AktivitetIkkeMuligPeriode';
import { ArbeidsrelatertArsakType } from '../../../../../types/RegistrertSykmelding';
import { FormType } from '../../../Form';
import { MulighetForArbeidTypes } from './MulighetForArbeidSection';

interface ArbeidsrelatertArsakProps {
    mulighetForArbeid: AktivitetIkkeMuligPeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
}

const ArbeidsrelatertArsak = ({ mulighetForArbeid, updateMfa, errors }: ArbeidsrelatertArsakProps) => {
    const { aktivitetIkkeMuligArbeidsrelatertArsakType } = mulighetForArbeid;

    const checkboxes: CheckboksPanelProps[] = Object.entries(ArbeidsrelatertArsakType).map(([key, value]) => {
        return {
            label: value,
            id: key + '-arbeidsrelatert',
            value: key,
            checked: aktivitetIkkeMuligArbeidsrelatertArsakType?.includes(key as keyof typeof ArbeidsrelatertArsakType),
        };
    });

    const updateCheckboxes = (value: keyof typeof ArbeidsrelatertArsakType): void => {
        if (!aktivitetIkkeMuligArbeidsrelatertArsakType) {
            const updatedSchema = {
                ...mulighetForArbeid,
                aktivitetIkkeMuligArbeidsrelatertArsakType: [value as keyof typeof ArbeidsrelatertArsakType],
            };
            updateMfa(updatedSchema);
            return;
        }
        const shouldAddArsak: boolean = !aktivitetIkkeMuligArbeidsrelatertArsakType.includes(value);
        const newArbeidsrelatertArsakType: (keyof typeof ArbeidsrelatertArsakType)[] = shouldAddArsak
            ? [...aktivitetIkkeMuligArbeidsrelatertArsakType, value]
            : aktivitetIkkeMuligArbeidsrelatertArsakType.filter((arsak) => arsak !== value);

        const updatedSchema = {
            ...mulighetForArbeid,
            aktivitetIkkeMuligArbeidsrelatertArsakType: newArbeidsrelatertArsakType,
        };
        updateMfa(updatedSchema);
        return;
    };

    return (
        <div id="aktivitetIkkeMuligArbeidsrelatertArsakType" className="form-margin-bottom">
            <CheckboksPanelGruppe
                legend="Arbeidsrelaterte årsaker"
                checkboxes={checkboxes}
                onChange={(_event, value) => updateCheckboxes(value)}
                feil={undefined /* // TODO: errors.get('aktivitetIkkeMuligArbeidsrelatertArsakType')?.feilmelding */}
            />
        </div>
    );
};

export default ArbeidsrelatertArsak;
