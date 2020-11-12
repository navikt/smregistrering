import React from 'react';
import { Checkbox, FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';

import ExpandableField from '../formComponents/ExpandableField';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { FormType } from '../../Form';
import { Section } from '../../../../types/Section';

export type MeldingTilNav = {
    meldingTilNavBistand: boolean;
    meldingTilNavBegrunn?: string | null;
};

type MeldingTilNavSectionProps = {
    section: Section;
    formState: FormType;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
};

const MeldingTilNavSection = ({ section, setFormState, formState, errors }: MeldingTilNavSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="8.1" underline={false}>
                <Checkbox
                    id="meldingTilNavBistand"
                    checked={formState.meldingTilNavBistand}
                    label="Ønskes bistand fra NAV nå?"
                    onChange={() =>
                        setFormState((formState) => ({
                            ...formState,
                            meldingTilNavBistand: !formState.meldingTilNavBistand,
                            meldingTilNavBegrunn: undefined,
                        }))
                    }
                    feil={errors.get('meldingTilNavBistand')?.feilmelding}
                />
                <br />
                <ExpandableField show={formState.meldingTilNavBistand}>
                    <Textarea
                        id="meldingTilNavBegrunn"
                        maxLength={0}
                        value={formState.meldingTilNavBegrunn || ''}
                        onChange={({ target: { value } }) => {
                            setFormState((formState) => ({ ...formState, meldingTilNavBegrunn: value }));
                        }}
                        feil={errors.get('meldingTilNavBegrunn')?.feilmelding}
                        label="Begrunn nærmere"
                    />
                </ExpandableField>
            </Subsection>
        </SectionContainer>
    );
};

export default MeldingTilNavSection;
