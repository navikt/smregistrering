import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import DatePicker from '../formComponents/DatePicker';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { Section } from '../../../../App';

export enum TilbakedateringField {
    ER_TILBAKEDATERT = 'erTilbakedatert',
    DATO_TILBAKEDATERING = 'datoTilbakedatering',
    KAN_IKKE_IVARETA_INTERESSER = 'kanIkkeIvaretaInteresser',
    BEGRUNN = 'begrunn',
}

export type Tilbakedatering = {
    [TilbakedateringField.ER_TILBAKEDATERT]?: boolean;
    [TilbakedateringField.DATO_TILBAKEDATERING]?: Date;
    [TilbakedateringField.KAN_IKKE_IVARETA_INTERESSER]?: boolean;
    [TilbakedateringField.BEGRUNN]?: string;
};

type TilbakedateringSectionProps = {
    section: Section;
    setTilbakedatering: (value: React.SetStateAction<Tilbakedatering>) => void;
    tilbakedatering: Tilbakedatering;
};

const TilbakedateringSection = ({ section, setTilbakedatering, tilbakedatering }: TilbakedateringSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="11.1" underline={false}>
                <Checkbox
                    checked={tilbakedatering[TilbakedateringField.ER_TILBAKEDATERT]}
                    label="Er sykmelding tilbakedatert?"
                    onChange={() =>
                        setTilbakedatering(state => ({
                            ...state,
                            [TilbakedateringField.ER_TILBAKEDATERT]: !state[TilbakedateringField.ER_TILBAKEDATERT],
                        }))
                    }
                />
                <br />
                {tilbakedatering[TilbakedateringField.ER_TILBAKEDATERT] && (
                    <DatePicker
                        label="Oppgi dato for dokumenterbar kontakt med pasienten"
                        value={tilbakedatering[TilbakedateringField.DATO_TILBAKEDATERING]}
                        onChange={newDate =>
                            setTilbakedatering(state => ({
                                ...state,
                                [TilbakedateringField.DATO_TILBAKEDATERING]: newDate,
                            }))
                        }
                    />
                )}
            </Subsection>

            <Subsection sectionIdentifier="11.2" underline={false}>
                <Checkbox
                    checked={tilbakedatering[TilbakedateringField.KAN_IKKE_IVARETA_INTERESSER]}
                    label="Pasienten har ikke kunnet ivareta egne interesser"
                    onChange={() =>
                        setTilbakedatering(state => ({
                            ...state,
                            [TilbakedateringField.KAN_IKKE_IVARETA_INTERESSER]: !state[
                                TilbakedateringField.KAN_IKKE_IVARETA_INTERESSER
                            ],
                        }))
                    }
                />
                <br />
                {tilbakedatering[TilbakedateringField.KAN_IKKE_IVARETA_INTERESSER] && (
                    <Textarea
                        maxLength={0}
                        value={tilbakedatering[TilbakedateringField.BEGRUNN] || ''}
                        onChange={({ target: { value } }) =>
                            setTilbakedatering(state => ({
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
