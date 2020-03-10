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
import { MedisinskVurdering } from './DiagnoseSection';
import { MeldingTilNav } from './MeldingTilNavSection';
import { Metadata } from './PasientopplysningerSection';
import { Section } from '../../../../App';
import { Tilbakedatering } from './TilbakedateringSection';

export enum FriskmeldingField {
    ARBEIDSFOER_ETTER_PERIODE = 'arbeidsfoerEtterPeriode',
    HENSYN_PA_ARBEIDSPLASSEN = 'hensynPaArbeidsplassen',
}

export type Friskmelding = {
    [FriskmeldingField.ARBEIDSFOER_ETTER_PERIODE]?: boolean;
    [FriskmeldingField.HENSYN_PA_ARBEIDSPLASSEN]?: string;
};

type FriskmeldingSectionProps = {
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
};

const FriskmeldingSection = ({ section, setSchema, schema }: FriskmeldingSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="5.1" underline={false}>
                <Checkbox
                    checked={schema[FriskmeldingField.ARBEIDSFOER_ETTER_PERIODE]}
                    label="Pasienten er 100 prosent arbeidsfør etter denne perioden"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [FriskmeldingField.ARBEIDSFOER_ETTER_PERIODE]: !state[
                                FriskmeldingField.ARBEIDSFOER_ETTER_PERIODE
                            ],
                        }))
                    }
                />
                <br />
                {schema[FriskmeldingField.ARBEIDSFOER_ETTER_PERIODE] && (
                    <Textarea
                        maxLength={0}
                        value={schema[FriskmeldingField.HENSYN_PA_ARBEIDSPLASSEN] || ''}
                        onChange={({ target: { value } }) =>
                            setSchema(state => ({
                                ...state,
                                [FriskmeldingField.HENSYN_PA_ARBEIDSPLASSEN]: value,
                            }))
                        }
                        label={<Element>5.1.1 Beskrive eventuelle hensyn som må tas på arbeidsplassen</Element>}
                    />
                )}
            </Subsection>
        </SectionContainer>
    );
};

export default FriskmeldingSection;
