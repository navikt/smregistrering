import React from 'react';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import Subsection from '../formComponents/Subsection';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type Bekreftelse = {
    legitimert: boolean;
    sykmeldersNavn?: string;
    sykmelderFnr?: string;
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
                    disabled
                    className="form-margin-bottom"
                    checked={schema.legitimert}
                    label="Pasienten er kjent eller har vist legitimasjon"
                    onChange={() =>
                        setSchema(state => ({
                            ...state,
                            legitimert: !state.legitimert,
                        }))
                    }
                    feil={errors.legitimert}
                />
            </Subsection>
            <Input
                className="form-margin-bottom half"
                onChange={({ target: { value } }) => {
                    setSchema(state => ({
                        ...state,
                        sykmelderFnr: value,
                    }));
                    validate('sykmelderFnr', value);
                }}
                label={<Element>Sykmelders fødselsnummer (11 siffer)</Element>}
                feil={errors.sykmelderFnr}
            />
            <Input
                disabled
                className="form-margin-bottom"
                value={schema.sykmeldersNavn}
                onChange={({ target: { value } }) => {
                    setSchema(state => ({
                        ...state,
                        sykmeldersNavn: value,
                    }));
                    validate('sykmeldersNavn', value);
                }}
                feil={errors.sykmeldersNavn}
                label={<Element>12.2 Sykmelders navn</Element>}
            />
            <Row>
                <Input
                    disabled
                    className="form-margin-bottom"
                    value={schema.hpr}
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            hpr: value,
                        }));
                        validate('hpr', value);
                    }}
                    feil={errors.hpr}
                    label={<Element>12.4 HPR-nummer</Element>}
                />
                <Input
                    disabled
                    className="form-margin-bottom"
                    value={schema.sykmelderTelefon}
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            sykmelderTelefon: value,
                        }));
                        validate('sykmelderTelefon', value);
                    }}
                    feil={errors.sykmelderTelefon}
                    label={<Element>12.5 Telefon</Element>}
                />
            </Row>

            <Input
                disabled
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
