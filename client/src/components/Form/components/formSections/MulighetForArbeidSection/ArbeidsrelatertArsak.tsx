import React from 'react';
import { CheckboksPanelGruppe, CheckboksPanelProps, FeiloppsummeringFeil } from 'nav-frontend-skjema';

import { ArbeidsrelatertArsakType } from '../../../../../types/RegistrertSykmelding';
import { FormType } from '../../../Form';

interface ArbeidsrelatertArsakProps {
    formState: FormType;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
}

const ArbeidsrelatertArsak = ({ formState, setFormState, errors }: ArbeidsrelatertArsakProps) => {
    const { aktivitetIkkeMuligArbeidsrelatertArsakType } = formState;

    const checkboxes: CheckboksPanelProps[] = Object.entries(ArbeidsrelatertArsakType).map(([key, value]) => {
        return {
            label: value,
            id: key + '-arbeidsrelatert',
            value: key,
            checked: aktivitetIkkeMuligArbeidsrelatertArsakType?.includes(key as keyof typeof ArbeidsrelatertArsakType),
        };
    });

    const updateCheckboxes = (value: keyof typeof ArbeidsrelatertArsakType): void => {
        setFormState((formState) => {
            if (!formState.aktivitetIkkeMuligArbeidsrelatertArsakType) {
                return {
                    ...formState,
                    aktivitetIkkeMuligArbeidsrelatertArsakType: [value as keyof typeof ArbeidsrelatertArsakType],
                };
            }
            const shouldAddArsak: boolean = !formState.aktivitetIkkeMuligArbeidsrelatertArsakType.includes(value);
            const newArbeidsrelatertArsakType: (keyof typeof ArbeidsrelatertArsakType)[] = shouldAddArsak
                ? [...formState.aktivitetIkkeMuligArbeidsrelatertArsakType, value]
                : formState.aktivitetIkkeMuligArbeidsrelatertArsakType.filter((arsak) => arsak !== value);

            return {
                ...formState,
                aktivitetIkkeMuligArbeidsrelatertArsakType: newArbeidsrelatertArsakType,
            };
        });
    };

    return (
        <div id="aktivitetIkkeMuligArbeidsrelatertArsakType" className="form-margin-bottom">
            <CheckboksPanelGruppe
                legend="Arbeidsrelaterte årsaker"
                checkboxes={checkboxes}
                onChange={(_event, value) => updateCheckboxes(value)}
                feil={errors.get('aktivitetIkkeMuligArbeidsrelatertArsakType')?.feilmelding}
            />
        </div>
    );
};

export default ArbeidsrelatertArsak;
