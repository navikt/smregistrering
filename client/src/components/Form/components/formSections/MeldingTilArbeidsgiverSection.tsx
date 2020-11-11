import React from 'react';
import { FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export type MeldingTilArbeidsgiver = {
    meldingTilArbeidsgiverBeskriv?: string | null;
};

type MeldingTilArbeidsgiverSectionProps = {
    section: Section;
    schema: SchemaType;
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
};

const MeldingTilArbeidsgiverSection = ({
    section,
    setFormState,
    schema,
    errors,
}: MeldingTilArbeidsgiverSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Textarea
                id="meldingTilArbeidsgiverBeskriv"
                maxLength={0}
                value={schema.meldingTilArbeidsgiverBeskriv || ''}
                onChange={({ target: { value } }) => {
                    setFormState((formState) => ({ ...formState, meldingTilArbeidsgiverBeskriv: value }))
                }}
                feil={errors.get('meldingTilArbeidsgiverBeskriv')?.feilmelding}
                label="9.1 Andre innspill til arbeidsgiver"
            />
        </SectionContainer>
    );
};

export default MeldingTilArbeidsgiverSection;
