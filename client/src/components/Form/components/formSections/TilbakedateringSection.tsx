import React from 'react';
import { Checkbox, FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';

import DatePicker from '../formComponents/DatePicker';
import ExpandableField from '../formComponents/ExpandableField';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { FormType } from '../../Form';
import { Section } from '../../../../types/Section';
import dayjs from "dayjs";

export type Tilbakedatering = {
    erTilbakedatert: boolean;
    kontaktDato?: Date | null;
    kunneIkkeIvaretaEgneInteresser: boolean;
    begrunnelseIkkeKontakt?: string | null;
};

type TilbakedateringSectionProps = {
    section: Section;
    formState: FormType;
    errors: Map<keyof FormType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<FormType>>;
};

const TilbakedateringSection = ({ section, setFormState, formState, errors }: TilbakedateringSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="11.1" underline={false}>
                <Checkbox
                    id="erTilbakedatert"
                    checked={formState.erTilbakedatert}
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
                <ExpandableField show={formState.erTilbakedatert}>
                    <DatePicker
                        id="kontaktDato"
                        label="Oppgi dato for dokumenterbar kontakt med pasienten"
                        value={formState.kontaktDato ? formState.kontaktDato : undefined}
                        onChange={(newDate) => {
                            setFormState((formState) => ({ ...formState, kontaktDato: newDate }));
                        }}
                        feil={errors.get('kontaktDato')?.feilmelding}
                    />
                </ExpandableField>
            </Subsection>
            {formState.kontaktDato != undefined &&
                <div style={{ marginTop: '-0.5rem', marginBottom: '2rem' }}>
                    Dato valgt: {dayjs(formState.kontaktDato).format("Do MMMM YYYY")}
                </div>
            }

            <Subsection sectionIdentifier="11.2" underline={false}>
                <Checkbox
                    id="kunneIkkeIvaretaEgneInteresser"
                    checked={formState.kunneIkkeIvaretaEgneInteresser}
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
                <ExpandableField show={formState.kunneIkkeIvaretaEgneInteresser}>
                    <Textarea
                        id="begrunnelseIkkeKontakt"
                        maxLength={0}
                        value={formState.begrunnelseIkkeKontakt || ''}
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
