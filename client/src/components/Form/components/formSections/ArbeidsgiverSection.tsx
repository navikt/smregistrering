import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input, Select } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { Arbeidsevne, InnspillNav, TilretteleggingArbeidsplass, TiltakNav } from './ArbeidsevneSection';
import {
    AvventendeSykmelding,
    Behandling,
    FullSykmelding,
    GradertSykmelding,
    Reisetilskudd,
} from './MulighetForArbeidSection';
import { Bekreftelse } from './BekreftelseSection';
import { FieldValues } from '../../Form';
import { Friskmelding } from './FriskmeldingSection';
import { MedisinskVurdering } from './DiagnoseSection';
import { MeldingTilNav } from './MeldingTilNavSection';
import { Metadata } from './PasientopplysningerSection';
import { Section } from '../../../../App';
import { Tilbakedatering } from './TilbakedateringSection';

export enum HarArbeidsgiver {
    EN_ARBEIDSGIVER = 'Én arbeidsgiver',
    FLERE_ARBEIDSGIVERE = 'Flere arbeidsgivere',
    INGEN_ARBEIDSGIVER = 'Ingen arbeidsgiver',
}

export enum ArbeidsgiverField {
    HAR_ARBEIDSGIVER = 'harArbeidsgiver',
    NAVN = 'navn',
    YRKESBETEGNELSE = 'yrkesbetegnelse',
    STILLINGSPROSENT = 'stillingsprosent',
}

export type Arbeidsgiver = {
    harArbeidsgiver?: HarArbeidsgiver;
    navn?: string;
    yrkesbetegnelse?: string;
    stillingsprosent?: number;
};

type ArbeidsgiverSectionProps = {
    section: Section;
    setSchema: (
        value: React.SetStateAction<
            Partial<
                Metadata &
                    Arbeidsgiver &
                    Arbeidsevne &
                    MedisinskVurdering &
                    AvventendeSykmelding &
                    GradertSykmelding &
                    FullSykmelding &
                    Behandling &
                    Reisetilskudd &
                    Friskmelding &
                    TilretteleggingArbeidsplass &
                    TiltakNav &
                    InnspillNav &
                    MeldingTilNav &
                    Tilbakedatering &
                    Bekreftelse &
                    FieldValues
            >
        >,
    ) => void;
};

const ArbeidsgiverSection = ({ section, setSchema }: ArbeidsgiverSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Select
                onChange={({ target: { value } }) => {
                    if (value === '0') {
                        setSchema(state => ({
                            ...state,
                            [ArbeidsgiverField.HAR_ARBEIDSGIVER]: undefined,
                        }));
                    } else {
                        setSchema(state => ({
                            ...state,
                            [ArbeidsgiverField.HAR_ARBEIDSGIVER]: value as HarArbeidsgiver,
                        }));
                    }
                }}
                className="form-margin-bottom"
                label={<Element>2.1 Pasienten har</Element>}
            >
                <option value="0">Velg</option>
                {Object.entries(HarArbeidsgiver).map(([key, value]) => {
                    return (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    );
                })}
            </Select>
            <Input
                className="form-margin-bottom"
                type="text"
                onChange={({ target: { value } }) =>
                    setSchema(state => ({
                        ...state,
                        [ArbeidsgiverField.NAVN]: value,
                    }))
                }
                label={<Element>2.2 Arbeidsgiver for denne sykmeldingen</Element>}
            />
            <Input
                className="form-margin-bottom"
                type="text"
                onChange={({ target: { value } }) =>
                    setSchema(state => ({
                        ...state,
                        [ArbeidsgiverField.YRKESBETEGNELSE]: value,
                    }))
                }
                label={<Element>2.3 Yrke/stilling for dette arbeidsforholdet</Element>}
            />
            <Input
                className="form-margin-bottom half"
                type="number"
                onChange={({ target: { value } }) =>
                    setSchema(state => ({
                        ...state,
                        [ArbeidsgiverField.STILLINGSPROSENT]: Number(value),
                    }))
                }
                label={<Element>2.4 Stillingsprosent</Element>}
            />
        </SectionContainer>
    );
};

export default ArbeidsgiverSection;
