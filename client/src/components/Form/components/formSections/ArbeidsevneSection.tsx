import React from 'react';
import { FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { FormType } from '../../Form';
import { Section } from '../../../../types/Section';

export type Arbeidsevne = {
    tiltakArbeidsplassen?: string | null;
    tiltakNav?: string | null;
    andreTiltak?: string | null;
};

export type ArbeidsevneSectionProps = {
    section: Section;
    formState: FormType;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
};

const ArbeidsevneSection = ({ section, setFormState, formState, errors }: ArbeidsevneSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="7.1">
                <Textarea
                    id="tiltakArbeidsplassen"
                    maxLength={0}
                    value={formState.tiltakArbeidsplassen || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, tiltakArbeidsplassen: value }));
                    }}
                    label="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                    feil={errors.get('tiltakArbeidsplassen')?.feilmelding}
                />
            </Subsection>

            <Subsection sectionIdentifier="7.2">
                <Textarea
                    id="tiltakNav"
                    maxLength={0}
                    value={formState.tiltakNav || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, tiltakNav: value }));
                    }}
                    feil={errors.get('tiltakNav')?.feilmelding}
                    label="Tiltak i regi av NAV. (Hvis det er behov for bistand fra NAV nå, bruk felt 8.)"
                />
            </Subsection>

            <Subsection sectionIdentifier="7.3" underline={false}>
                <Textarea
                    id="andreTiltak"
                    maxLength={0}
                    value={formState.andreTiltak || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, andreTiltak: value }));
                    }}
                    label="Eventuelle andre innspill til NAV"
                    feil={errors.get('andreTiltak')?.feilmelding}
                />
            </Subsection>
        </SectionContainer>
    );
};

export default ArbeidsevneSection;
