import React from 'react';
import { Checkbox, Textarea } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { Section } from '../../../../App';

export enum MeldingTilArbeidsgiverField {
    INNSPILL = 'innspill',
    BESKRIV = 'beskriv',
}

export type MeldingTilArbeidsgiver = {
    [MeldingTilArbeidsgiverField.INNSPILL]?: boolean;
    [MeldingTilArbeidsgiverField.BESKRIV]?: string;
};

type MeldingTilArbeidsgiverSectionProps = {
    section: Section;
    expanded: boolean;
    setMeldingTilArbeidsgiver: (value: React.SetStateAction<MeldingTilArbeidsgiver>) => void;
    expandSection: () => void;
    meldingTilArbeidsgiver: MeldingTilArbeidsgiver;
};

const MeldingTilArbeidsgiverSection = ({
    section,
    expanded,
    expandSection,
    setMeldingTilArbeidsgiver,
    meldingTilArbeidsgiver,
}: MeldingTilArbeidsgiverSectionProps) => {
    return (
        <SectionContainer section={section} expanded={expanded} setExpanded={expandSection}>
            <Subsection sectionIdentifier="9.1" underline={false}>
                <Checkbox
                    checked={meldingTilArbeidsgiver[MeldingTilArbeidsgiverField.INNSPILL]}
                    label="Andre innspill til arbeidsgiver"
                    onChange={() =>
                        setMeldingTilArbeidsgiver(state => ({
                            ...state,
                            [MeldingTilArbeidsgiverField.INNSPILL]: !state[MeldingTilArbeidsgiverField.INNSPILL],
                        }))
                    }
                />
                <br />
                {meldingTilArbeidsgiver[MeldingTilArbeidsgiverField.INNSPILL] && (
                    <Textarea
                        maxLength={0}
                        value={meldingTilArbeidsgiver[MeldingTilArbeidsgiverField.BESKRIV] || ''}
                        onChange={({ target: { value } }) =>
                            setMeldingTilArbeidsgiver(state => ({
                                ...state,
                                [MeldingTilArbeidsgiverField.BESKRIV]: value,
                            }))
                        }
                        label={<Element>Andre innspill til arbeidsgiver</Element>}
                    />
                )}
            </Subsection>
        </SectionContainer>
    );
};

export default MeldingTilArbeidsgiverSection;
