import React from 'react';
import { FeiloppsummeringFeil, Input } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export type Pasientopplysninger = {
    pasientFnr?: string | null;
};

type PasientopplysningerProps = {
    section: Section;
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
    schema: SchemaType;
};

const PasientopplysningerSection = ({ section, setFormState, errors, schema }: PasientopplysningerProps) => {
    return (
        <SectionContainer section={section}>
            <Input
                id="pasientFnr"
                className="half"
                value={schema.pasientFnr ? schema.pasientFnr : undefined}
                onChange={({ target: { value } }) => {
                    setFormState(
                        (formState) => {
                            return { ...formState, pasientFnr: value }
                        }
                    )
                }}
                label="1.2 Fødselsnummer (11 siffer)"
                feil={errors.get('pasientFnr')?.feilmelding}
            />
        </SectionContainer>
    );
};

export default PasientopplysningerSection;
