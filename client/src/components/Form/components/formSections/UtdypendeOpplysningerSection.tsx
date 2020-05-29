import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Textarea } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

type seksjoner =
    | '6.1.1 Er det sykdommen, utredningen og/eller behandlingen som hindrer økt aktivitet? Beskriv.'
    | '6.1.2 Har behandlingen frem til nå bedret arbeidsevnen?'
    | '6.1.3 Hva er videre plan for behandling?'
    | '6.1.4 Er det arbeidsforholdet som hindrer (økt) aktivitet? Beskriv.'
    | '6.1.5 Er det andre forhold som hindrer (økt) aktivitet?'
    | '6.2.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.'
    | '6.2.2 Hvordan påvirker sykdommen arbeidsevnen?'
    | '6.2.3 Har behandlingen frem til nå bedret arbeidsevnen?'
    | '6.2.4 Beskriv pågående og planlagt henvisning,utredning og/eller behandling.';

export type UtdypendeOpplysninger = {
    //utdypendeDel1: boolean;
    //utdypendeDel2: boolean;
    //
    utdypende611?: string;
    utdypende612?: string;
    utdypende613?: string;
    utdypende614?: string;
    utdypende615?: string;
    utdypende621?: string;
    utdypende622?: string;
    utdypende623?: string;
    utdypende624?: string;
};

interface UtdypendeOpplysningerSectionProps {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
    schema: SchemaType;
    errors: ErrorSchemaType;
    validate: Validate;
}

const UtdypendeOpplysningerSection = ({
    section,
    setSchema,
    schema,
    errors,
    validate,
}: UtdypendeOpplysningerSectionProps) => {
    return (
        <SectionContainer section={section}>
            <Ekspanderbartpanel tittel="6.1">
                <Textarea
                    id="utdypende611"
                    maxLength={0}
                    value={schema.utdypende611 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            utdypende611: value,
                        }));
                        validate('utdypende611', value);
                    }}
                    feil={errors.utdypende611}
                    label={
                        <Element>
                            6.1.1 Er det sykdommen, utredningen og/eller behandlingen som hindrer økt aktivitet?
                            Beskriv.
                        </Element>
                    }
                />
                <br />
                <Textarea
                    id="utdypende612"
                    maxLength={0}
                    value={schema.utdypende612 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            utdypende612: value,
                        }));
                        validate('utdypende612', value);
                    }}
                    feil={errors.utdypende612}
                    label={<Element>6.1.2 Har behandlingen frem til nå bedret arbeidsevnen?</Element>}
                />
                <br />
                <Textarea
                    id="utdypende613"
                    maxLength={0}
                    value={schema.utdypende613 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            utdypende613: value,
                        }));
                        validate('utdypende613', value);
                    }}
                    feil={errors.utdypende613}
                    label={<Element>6.1.3 Hva er videre plan for behandling?</Element>}
                />
                <br />
                <Textarea
                    id="utdypende614"
                    maxLength={0}
                    value={schema.utdypende614 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            utdypende614: value,
                        }));
                        validate('utdypende614', value);
                    }}
                    feil={errors.utdypende614}
                    label={<Element>6.1.4 Er det arbeidsforholdet som hindrer (økt) aktivitet? Beskriv.</Element>}
                />
                <br />
                <Textarea
                    id="utdypende615"
                    maxLength={0}
                    value={schema.utdypende615 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            utdypende615: value,
                        }));
                        validate('utdypende615', value);
                    }}
                    feil={errors.utdypende612}
                    label={<Element>6.1.5 Er det andre forhold som hindrer (økt) aktivitet?</Element>}
                />
            </Ekspanderbartpanel>
            <br />
            <Ekspanderbartpanel tittel="6.2">
                <Textarea
                    id="utdypende621"
                    maxLength={0}
                    value={schema.utdypende621 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(state => ({
                            ...state,
                            utdypende621: value,
                        }));
                        validate('utdypende621', value);
                    }}
                    feil={errors.utdypende621}
                    label={<Element>6.2.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.</Element>}
                />
                <br />
            </Ekspanderbartpanel>
            <br />
            <Ekspanderbartpanel tittel="6.3"></Ekspanderbartpanel>
            <br />
            <Ekspanderbartpanel tittel="6.4"></Ekspanderbartpanel>
            <br />
            <Ekspanderbartpanel tittel="6.5"></Ekspanderbartpanel>
            <br />
            <Ekspanderbartpanel tittel="6.6"></Ekspanderbartpanel>
        </SectionContainer>
    );
};

export default UtdypendeOpplysningerSection;
