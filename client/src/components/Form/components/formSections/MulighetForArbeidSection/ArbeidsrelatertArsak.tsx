import { CheckboksPanelGruppe, CheckboksPanelProps, FeiloppsummeringFeil } from 'nav-frontend-skjema';

import { ArbeidsrelatertArsakType, ArbeidsrelatertArsakTypeValues } from '../../../../../types/sykmelding/Periode';
import { FormType } from '../../../Form';
import { getEntries } from '../../../formUtils/useForm';

import { MulighetForArbeidTypes } from './MulighetForArbeidSection';
import { AktivitetIkkeMuligPeriodeMFA } from './AktivitetIkkeMuligPeriode';

interface ArbeidsrelatertArsakProps {
    mfaPeriode: AktivitetIkkeMuligPeriodeMFA;
    updateMfa: (mfa: MulighetForArbeidTypes) => void;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    index: number;
}

const ArbeidsrelatertArsak = ({ mfaPeriode, updateMfa, errors, index }: ArbeidsrelatertArsakProps) => {
    const { aktivitetIkkeMuligArbeidsrelatertArsakType } = mfaPeriode;

    const checkboxes: CheckboksPanelProps[] = getEntries(ArbeidsrelatertArsakTypeValues).map(([key, value]) => {
        return {
            label: value,
            id: `${key}-arbeidsrelatert-${index}`,
            value: key,
            checked: aktivitetIkkeMuligArbeidsrelatertArsakType?.includes(key),
        };
    });

    const updateCheckboxes = (value: ArbeidsrelatertArsakType): void => {
        if (!aktivitetIkkeMuligArbeidsrelatertArsakType) {
            const updatedSchema = {
                ...mfaPeriode,
                aktivitetIkkeMuligArbeidsrelatertArsakType: new Array<ArbeidsrelatertArsakType>(value),
            };
            updateMfa(updatedSchema);
            return;
        }
        const shouldAddArsak: boolean = !aktivitetIkkeMuligArbeidsrelatertArsakType.includes(value);
        const newArbeidsrelatertArsakType: ArbeidsrelatertArsakType[] = shouldAddArsak
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
