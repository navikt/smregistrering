import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { Section } from '../../../../App';

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
    setFriskmelding: (value: React.SetStateAction<Friskmelding>) => void;
    friskmelding: Friskmelding;
};

const FriskmeldingSection = ({ section, setFriskmelding, friskmelding }: FriskmeldingSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="5.1" underline={false}>
                <Checkbox
                    checked={friskmelding[FriskmeldingField.ARBEIDSFOER_ETTER_PERIODE]}
                    label="Pasienten er 100 prosent arbeidsfør etter denne perioden"
                    onChange={() =>
                        setFriskmelding(state => ({
                            ...state,
                            [FriskmeldingField.ARBEIDSFOER_ETTER_PERIODE]: !state[
                                FriskmeldingField.ARBEIDSFOER_ETTER_PERIODE
                            ],
                        }))
                    }
                />
                <br />
                {friskmelding[FriskmeldingField.ARBEIDSFOER_ETTER_PERIODE] && (
                    <Textarea
                        maxLength={0}
                        value={friskmelding[FriskmeldingField.HENSYN_PA_ARBEIDSPLASSEN] || ''}
                        onChange={({ target: { value } }) =>
                            setFriskmelding(state => ({
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
