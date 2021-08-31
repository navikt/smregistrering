import React from 'react';
import { Checkbox, FeiloppsummeringFeil } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { FormType } from '../../Form';
import { Section } from '../../../../types/Section';

export interface UtdypendeOpplysninger {
    harUtdypendeOpplysninger: boolean;
}

interface UtdypendeOpplysningerSectionProps {
    section: Section;
    formState: FormType;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
}

const UtdypendeOpplysningerSection = ({
    section,
    setFormState,
    formState,
    errors,
}: UtdypendeOpplysningerSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Checkbox
                id="harUtdypendeOpplysninger"
                label="Sykmeldingen har utdypende opplysninger"
                checked={formState.harUtdypendeOpplysninger}
                onChange={() =>
                    setFormState((formState) => ({
                        ...formState,
                        harUtdypendeOpplysninger: !formState.harUtdypendeOpplysninger,
                    }))
                }
                feil={errors.get('harUtdypendeOpplysninger')}
            />
        </SectionContainer>
    );
};

export default UtdypendeOpplysningerSection;
