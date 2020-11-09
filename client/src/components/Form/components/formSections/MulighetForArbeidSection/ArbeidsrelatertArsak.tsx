import React from 'react';
import { CheckboksPanelGruppe, CheckboksPanelProps } from 'nav-frontend-skjema';

import { ArbeidsrelatertArsakType } from '../../../../../types/RegistrertSykmelding';
import { ErrorSchemaType } from '../../../Form';
import { FullSykmeldingMFA } from './FullSykmelding';
import { MulighetForArbeidTypes } from './MulighetForArbeidSection';
import { Validate } from '../../../validation';

interface ArbeidsrelatertArsakProps {
    mulighetForArbeid: FullSykmeldingMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: ErrorSchemaType;
    validate: Validate;
}

const ArbeidsrelatertArsak = ({ mulighetForArbeid, updateMfa, errors, validate }: ArbeidsrelatertArsakProps) => {
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
            // TODO: validate('aktivitetIkkeMuligArbeidsrelatertArsakType', updatedSchema);
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
        // TODO: validate('aktivitetIkkeMuligArbeidsrelatertArsakType', updatedSchema);
        updateMfa(updatedSchema);
        return;
    };

    return (
        <div id="aktivitetIkkeMuligArbeidsrelatertArsakType" className="form-margin-bottom">
            <CheckboksPanelGruppe
                legend="Arbeidsrelaterte årsaker"
                checkboxes={checkboxes}
                onChange={(_event, value) => updateCheckboxes(value)}
                feil={undefined /* // TODO: errors.aktivitetIkkeMuligArbeidsrelatertArsakType */}
            />
        </div>
    );
};

export default ArbeidsrelatertArsak;
