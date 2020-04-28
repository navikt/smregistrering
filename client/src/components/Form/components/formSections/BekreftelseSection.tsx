import React from 'react';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { SchemaType, ErrorSchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Bekreftelse = {
    legitimert?: boolean;
    sykmeldersNavn?: string;
    hpr?: string;
    sykmelderTelefon?: string;
    sykmelderAdresse?: string;
};

type BekreftelseSectionProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
};

const BekreftelseSection = ({ section, setSchema, schema, errors, validate }: BekreftelseSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Subsection sectionIdentifier="12.1" underline={false}>
                <Checkbox
                    className="form-margin-bottom"
                    checked={schema.legitimert}
                    label="Pasienten er kjent eller har vist legitimasjon"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            legitimert: !state.legitimert,
                        }))
                    }
                />
            </Subsection>

            <Input
                className="form-margin-bottom"
                onChange={({ target: { value } }) =>
                    setSchema(state => ({
                        ...state,
                        sykmeldersNavn: value,
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
                            hpr: value,
                        }))
                    }
                    label={<Element>12.4 HPR-nummer</Element>}
                />
                <Input
                    className="form-margin-bottom"
                    onChange={({ target: { value } }) =>
                        setSchema(state => ({
                            ...state,
                            sykmelderTelefon: value,
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
                        sykmelderAdresse: value,
                    }))
                }
                label={<Element>12.6 Adresse</Element>}
            />
        </SectionContainer>
    );
};

export default BekreftelseSection;
