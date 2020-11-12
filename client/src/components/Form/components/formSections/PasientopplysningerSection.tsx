import React from 'react';
import { FeiloppsummeringFeil, Input } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { FormType } from '../../Form';
import { Section } from '../../../../types/Section';

export type Pasientopplysninger = {
    pasientFnr?: string | null;
};

type PasientopplysningerProps = {
    section: Section;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
    formState: FormType;
};

const PasientopplysningerSection = ({ section, setFormState, errors, formState }: PasientopplysningerProps) => {
    return (
        <SectionContainer section={section}>
            <Input
                id="pasientFnr"
                className="half"
                value={formState.pasientFnr ? formState.pasientFnr : undefined}
                onChange={({ target: { value } }) => {
                    setFormState((formState) => {
                        return { ...formState, pasientFnr: value };
                    });
                }}
                label="1.2 Fødselsnummer (11 siffer)"
                feil={errors.get('pasientFnr')?.feilmelding}
            />
        </SectionContainer>
    );
};

export default PasientopplysningerSection;
