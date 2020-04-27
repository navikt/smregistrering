import React from 'react';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

export enum BekreftelseField {
    LEGITIMERT = 'legitimert',
    SYKMELDERS_NAVN = 'sykmeldersNavn',
    HPR = 'hpr',
    TELEFON = 'sykmelderTelefon',
    ADRESSE = 'adresse',
}

export type Bekreftelse = {
    [BekreftelseField.LEGITIMERT]?: boolean;
    [BekreftelseField.SYKMELDERS_NAVN]?: string;
    [BekreftelseField.HPR]?: string;
    [BekreftelseField.TELEFON]?: string;
    [BekreftelseField.ADRESSE]?: string;
};

type BekreftelseSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
};

const BekreftelseSection = ({ section, setSchema, schema }: BekreftelseSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="12.1" underline={false}>
                <Checkbox
                    className="form-margin-bottom"
                    checked={schema[BekreftelseField.LEGITIMERT]}
                    label="Pasienten er kjent eller har vist legitimasjon"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            [BekreftelseField.LEGITIMERT]: !state[BekreftelseField.LEGITIMERT],
                        }))
                    }
                />
            </Subsection>

            <Input
                className="form-margin-bottom"
                onChange={({ target: { value } }) =>
                    setSchema(state => ({
                        ...state,
                        [BekreftelseField.SYKMELDERS_NAVN]: value,
                    }))
                }
                label={<Element>12.2 Sykmelders navn</Element>}
            />

            <Row>
                <Input
                    className="form-margin-bottom"
                    onChange={({ target: { value } }) =>
                        setSchema(state => ({
                            ...state,
                            [BekreftelseField.HPR]: value,
                        }))
                    }
                    label={<Element>12.4 HPR-nummer</Element>}
                />
                <Input
                    className="form-margin-bottom"
                    onChange={({ target: { value } }) =>
                        setSchema(state => ({
                            ...state,
                            [BekreftelseField.TELEFON]: value,
                        }))
                    }
                    label={<Element>12.5 Telefon</Element>}
                />
            </Row>

            <Input
                className="form-margin-bottom"
                onChange={({ target: { value } }) =>
                    setSchema(state => ({
                        ...state,
                        [BekreftelseField.ADRESSE]: value,
                    }))
                }
                label={<Element>12.6 Adresse</Element>}
            />
        </SectionContainer>
    );
};

export default BekreftelseSection;
