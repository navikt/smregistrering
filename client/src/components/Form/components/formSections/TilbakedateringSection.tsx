import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import DatePicker from '../formComponents/DatePicker';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export enum TilbakedateringField {
    ER_TILBAKEDATERT = 'erTilbakedatert',
    DATO_TILBAKEDATERING = 'datoTilbakedatering',
    KAN_IKKE_IVARETA_INTERESSER = 'kanIkkeIvaretaInteresser',
    BEGRUNN = 'tilbakedateringBegrunn',
}

export type Tilbakedatering = {
    [TilbakedateringField.ER_TILBAKEDATERT]?: boolean;
    [TilbakedateringField.DATO_TILBAKEDATERING]?: Date;
    [TilbakedateringField.KAN_IKKE_IVARETA_INTERESSER]?: boolean;
    [TilbakedateringField.BEGRUNN]?: string;
};

type TilbakedateringSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
};

const TilbakedateringSection = ({ section, setSchema, schema }: TilbakedateringSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="11.1" underline={false}>
                <Checkbox
                    checked={schema[TilbakedateringField.ER_TILBAKEDATERT]}
                    label="Er sykmelding tilbakedatert?"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [TilbakedateringField.ER_TILBAKEDATERT]: !state[TilbakedateringField.ER_TILBAKEDATERT],
                        }))
                    }
                />
                <br />
                {schema[TilbakedateringField.ER_TILBAKEDATERT] && (
                    <DatePicker
                        label="Oppgi dato for dokumenterbar kontakt med pasienten"
                        value={schema[TilbakedateringField.DATO_TILBAKEDATERING]}
                        onChange={newDate =>
                            setSchema(state => ({
                                ...state,
                                [TilbakedateringField.DATO_TILBAKEDATERING]: newDate,
                            }))
                        }
                    />
                )}
            </Subsection>

            <Subsection sectionIdentifier="11.2" underline={false}>
                <Checkbox
                    checked={schema[TilbakedateringField.KAN_IKKE_IVARETA_INTERESSER]}
                    label="Pasienten har ikke kunnet ivareta egne interesser"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [TilbakedateringField.KAN_IKKE_IVARETA_INTERESSER]: !state[
                                TilbakedateringField.KAN_IKKE_IVARETA_INTERESSER
                            ],
                        }))
                    }
                />
                <br />
                {schema[TilbakedateringField.KAN_IKKE_IVARETA_INTERESSER] && (
                    <Textarea
                        maxLength={0}
                        value={schema[TilbakedateringField.BEGRUNN] || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
                                ...state,
                                [TilbakedateringField.BEGRUNN]: value,
                            }))
                        }
                        label={<Element>Begrunn</Element>}
                    />
                )}
            </Subsection>
        </SectionContainer>
    );
};

export default TilbakedateringSection;
