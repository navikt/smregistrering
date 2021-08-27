import React from 'react';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

import DatePicker from '../formComponents/DatePicker';
import { FormType } from '../../Form';

export type Other = {
    syketilfelleStartDato?: string | null;
};

type OtherSectionProps = {
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
    formState: FormType;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
};

const OtherSection = ({ setFormState, formState, errors }: OtherSectionProps) => {
    return (
        <section aria-label="other">
            <fieldset className="section-content">
                <DatePicker
                    id="syketilfelleStartDato"
                    label="Startdato for legemeldt fravær"
                    value={formState.syketilfelleStartDato ? formState.syketilfelleStartDato : undefined}
                    onChange={(newDates) => {
                        setFormState((formState) => ({ ...formState, syketilfelleStartDato: newDates ?? null }));
                    }}
                    feil={errors.get('syketilfelleStartDato')?.feilmelding}
                />
            </fieldset>
        </section>
    );
};

export default OtherSection;
