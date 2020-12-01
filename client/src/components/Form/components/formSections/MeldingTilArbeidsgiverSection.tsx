import React from 'react';
import { FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { FormType } from '../../Form';
import { Section } from '../../../../types/Section';

export type MeldingTilArbeidsgiver = {
    meldingTilArbeidsgiverBeskriv?: string | null;
};

type MeldingTilArbeidsgiverSectionProps = {
    section: Section;
    formState: FormType;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
};

const MeldingTilArbeidsgiverSection = ({
    section,
    setFormState,
    formState,
    errors,
}: MeldingTilArbeidsgiverSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Textarea
                id="meldingTilArbeidsgiverBeskriv"
                maxLength={0}
                value={formState.meldingTilArbeidsgiverBeskriv || ''}
                onChange={({ target: { value } }) => {
                    setFormState((formState) => ({ ...formState, meldingTilArbeidsgiverBeskriv: value }));
                }}
                feil={errors.get('meldingTilArbeidsgiverBeskriv')?.feilmelding}
                label="9.1 Andre innspill til arbeidsgiveren"
            />
        </SectionContainer>
    );
};

export default MeldingTilArbeidsgiverSection;
