import React from 'react';
import { Checkbox, FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';

import DatePicker from '../formComponents/DatePicker';
import ExpandableField from '../formComponents/ExpandableField';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export type Tilbakedatering = {
    erTilbakedatert: boolean;
    kontaktDato?: Date | null;
    kunneIkkeIvaretaEgneInteresser: boolean;
    begrunnelseIkkeKontakt?: string | null;
};

type TilbakedateringSectionProps = {
    section: Section;
    schema: SchemaType;
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
};

const TilbakedateringSection = ({ section, setFormState, schema, errors }: TilbakedateringSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="11.1" underline={false}>
                <Checkbox
                    id="erTilbakedatert"
                    checked={schema.erTilbakedatert}
                    label="Er sykmelding tilbakedatert?"
                    onChange={() =>
                        setFormState((formState) => ({
                            ...formState,
                            erTilbakedatert: !formState.erTilbakedatert,
                            kontaktDato: undefined,
                        }))
                    }
                    feil={errors.get('erTilbakedatert')?.feilmelding}
                />
                <br />
                <ExpandableField show={schema.erTilbakedatert}>
                    <DatePicker
                        id="kontaktDato"
                        label="Oppgi dato for dokumenterbar kontakt med pasienten"
                        value={schema.kontaktDato ? schema.kontaktDato : undefined}
                        onChange={(newDate) => {
                            setFormState((formState) => ({ ...formState, kontaktDato: newDate }));
                        }}
                        feil={errors.get('kontaktDato')?.feilmelding}
                    />
                </ExpandableField>
            </Subsection>

            <Subsection sectionIdentifier="11.2" underline={false}>
                <Checkbox
                    id="kunneIkkeIvaretaEgneInteresser"
                    checked={schema.kunneIkkeIvaretaEgneInteresser}
                    label="Pasienten har ikke kunnet ivareta egne interesser"
                    onChange={() => {
                        setFormState((formState) => ({
                            ...formState,
                            kunneIkkeIvaretaEgneInteresser: !formState.kunneIkkeIvaretaEgneInteresser,
                            begrunnelseIkkeKontakt: undefined,
                        }));
                    }}
                    feil={errors.get('kunneIkkeIvaretaEgneInteresser')?.feilmelding}
                />
                <br />
                <ExpandableField show={schema.kunneIkkeIvaretaEgneInteresser}>
                    <Textarea
                        id="begrunnelseIkkeKontakt"
                        maxLength={0}
                        value={schema.begrunnelseIkkeKontakt || ''}
                        onChange={({ target: { value } }) => {
                            setFormState((formState) => ({ ...formState, begrunnelseIkkeKontakt: value }));
                        }}
                        feil={errors.get('begrunnelseIkkeKontakt')?.feilmelding}
                        label="Begrunn"
                    />
                </ExpandableField>
            </Subsection>
        </SectionContainer>
    );
};

export default TilbakedateringSection;
