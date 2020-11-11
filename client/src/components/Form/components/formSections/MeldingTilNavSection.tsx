import React from 'react';
import { Checkbox, FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';

import ExpandableField from '../formComponents/ExpandableField';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export type MeldingTilNav = {
    meldingTilNavBistand: boolean;
    meldingTilNavBegrunn?: string | null;
};

type MeldingTilNavSectionProps = {
    section: Section;
    schema: SchemaType;
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
};

const MeldingTilNavSection = ({ section, setFormState, schema, errors }: MeldingTilNavSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="8.1" underline={false}>
                <Checkbox
                    id="meldingTilNavBistand"
                    checked={schema.meldingTilNavBistand}
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
                <ExpandableField show={schema.meldingTilNavBistand}>
                    <Textarea
                        id="meldingTilNavBegrunn"
                        maxLength={0}
                        value={schema.meldingTilNavBegrunn || ''}
                        onChange={({ target: { value } }) => {
                            setFormState((formState) => ({ ...formState, meldingTilNavBegrunn: value }))
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
