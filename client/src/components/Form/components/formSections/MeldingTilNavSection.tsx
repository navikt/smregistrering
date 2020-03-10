import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { Arbeidsevne, InnspillNav, TilretteleggingArbeidsplass, TiltakNav } from './ArbeidsevneSection';
import { Arbeidsgiver } from './ArbeidsgiverSection';
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
import { Metadata } from './PasientopplysningerSection';
import { Section } from '../../../../App';
import { Tilbakedatering } from './TilbakedateringSection';

export enum MeldingTilNavField {
    BISTAND = 'bistand',
    BEGRUNN = 'begrunn',
}

export type MeldingTilNav = {
    [MeldingTilNavField.BISTAND]?: boolean;
    [MeldingTilNavField.BEGRUNN]?: string;
};

type MeldingTilNavSectionProps = {
    section: Section;
    expanded: boolean;
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
    schema: Partial<
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
    >;
    expandSection: () => void;
};

const MeldingTilNavSection = ({ section, expanded, expandSection, setSchema, schema }: MeldingTilNavSectionProps) => {
    return (
        <SectionContainer section={section} expanded={expanded} setExpanded={expandSection}>
            <Subsection sectionIdentifier="8.1" underline={false}>
                <Checkbox
                    checked={schema[MeldingTilNavField.BISTAND]}
                    label="Ønskes bistand fra NAV nå?"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [MeldingTilNavField.BISTAND]: !state[MeldingTilNavField.BISTAND],
                        }))
                    }
                />
                <br />
                {schema[MeldingTilNavField.BISTAND] && (
                    <Textarea
                        maxLength={0}
                        value={schema[MeldingTilNavField.BEGRUNN] || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
                                ...state,
                                [MeldingTilNavField.BEGRUNN]: value,
                            }))
                        }
                        label={<Element>Begrunn nærmere</Element>}
                    />
                )}
            </Subsection>
        </SectionContainer>
    );
};

export default MeldingTilNavSection;
