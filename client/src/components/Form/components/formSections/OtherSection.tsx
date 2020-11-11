import React from 'react';

import DatePicker from '../formComponents/DatePicker';
import { SchemaType } from '../../Form';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

export type Other = {
    syketilfelleStartDato?: Date | null;
};

type OtherSectionProps = {
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
    schema: SchemaType;
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
};

const OtherSection = ({ setFormState, schema, errors }: OtherSectionProps) => {
    return (
        <section aria-label="other">
            <fieldset className=" section-content">
                <DatePicker
                    id="syketilfelleStartDato"
                    label="Startdato for legemeldt fravær"
                    value={schema.syketilfelleStartDato ? schema.syketilfelleStartDato : undefined}
                    onChange={(newDates) => {
                        setFormState(
                            (formState) => {
                                return { ...formState, syketilfelleStartDato: newDates };
                            }
                        )
                    }}
                    feil={errors.get('syketilfelleStartDato')?.feilmelding}
                />
            </fieldset>
        </section>
    );
};

export default OtherSection;
