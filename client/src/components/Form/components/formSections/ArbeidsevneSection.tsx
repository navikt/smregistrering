import React from 'react';
import { FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export type Arbeidsevne = {
    tiltakArbeidsplassen?: string | null;
    tiltakNav?: string | null;
    andreTiltak?: string | null;
};

export type ArbeidsevneSectionProps = {
    section: Section;
    schema: SchemaType;
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
};

const ArbeidsevneSection = ({ section, setFormState, schema, errors }: ArbeidsevneSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="7.1">
                <Textarea
                    id="tiltakArbeidsplassen"
                    maxLength={0}
                    value={schema.tiltakArbeidsplassen || ''}
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
                    value={schema.tiltakNav || ''}
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
                    value={schema.andreTiltak || ''}
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
