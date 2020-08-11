import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Textarea } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { ErrorSchemaType, SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';
import { Validate } from '../../validation';

export type UtdypendeOpplysninger = {
    utdypende611?: string;
    utdypende612?: string;
    utdypende613?: string;
    utdypende614?: string;
    utdypende615?: string;
    //
    utdypende621?: string;
    utdypende622?: string;
    utdypende623?: string;
    utdypende624?: string;
    //
    utdypende631?: string;
    utdypende632?: string;
    //
    utdypende641?: string;
    utdypende642?: string;
    utdypende643?: string;
    //
    utdypende651?: string;
    utdypende652?: string;
    utdypende653?: string;
    utdypende654?: string;
    //
    utdypende661?: string;
    utdypende662?: string;
    utdypende663?: string;
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
            <Ekspanderbartpanel
                tittel="6.1"
                apen={
                    !!schema.utdypende611 ||
                    !!schema.utdypende612 ||
                    !!schema.utdypende613 ||
                    !!schema.utdypende614 ||
                    !!schema.utdypende615
                }
            >
                <Textarea
                    id="utdypende611"
                    maxLength={0}
                    value={schema.utdypende611 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende611: value,
                                };
                                validate('utdypende611', updatedSchema);
                                return updatedSchema;
                            },
                        );
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
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende612: value,
                                };

                                validate('utdypende612', updatedSchema);
                                return updatedSchema;
                            },
                        );
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
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende613: value,
                                };
                                validate('utdypende613', updatedSchema);
                                return updatedSchema;
                            },
                        );
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
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende614: value,
                                };

                                validate('utdypende614', updatedSchema);
                                return updatedSchema;
                            },
                        );
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
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende615: value,
                                };
                                validate('utdypende615', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende612}
                    label={<Element>6.1.5 Er det andre forhold som hindrer (økt) aktivitet?</Element>}
                />
            </Ekspanderbartpanel>
            <br />
            <Ekspanderbartpanel
                tittel="6.2"
                apen={!!schema.utdypende621 || !!schema.utdypende622 || !!schema.utdypende623 || !!schema.utdypende624}
            >
                <Textarea
                    id="utdypende621"
                    maxLength={0}
                    value={schema.utdypende621 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende621: value,
                                };
                                validate('utdypende621', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende621}
                    label={<Element>6.2.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.</Element>}
                />
                <br />
                <Textarea
                    id="utdypende622"
                    maxLength={0}
                    value={schema.utdypende622 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende622: value,
                                };
                                validate('utdypende622', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende622}
                    label={<Element>6.2.2 Hvordan påvirker sykdommen arbeidsevnen?</Element>}
                />
                <br />
                <Textarea
                    id="utdypende623"
                    maxLength={0}
                    value={schema.utdypende623 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende623: value,
                                };
                                validate('utdypende623', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende623}
                    label={<Element>6.2.3 Har behandlingen frem til nå bedret arbeidsevnen?</Element>}
                />
                <br />
                <Textarea
                    id="utdypende624"
                    maxLength={0}
                    value={schema.utdypende624 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende624: value,
                                };
                                validate('utdypende624', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende624}
                    label={
                        <Element>6.2.4 Beskriv pågående og planlagt henvisning,utredning og/eller behandling.</Element>
                    }
                />
            </Ekspanderbartpanel>
            <br />
            <Ekspanderbartpanel tittel="6.3" apen={!!schema.utdypende631 || !!schema.utdypende632}>
                <Textarea
                    id="utdypende631"
                    maxLength={0}
                    value={schema.utdypende631 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende631: value,
                                };
                                validate('utdypende631', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende631}
                    label={<Element>6.3.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon</Element>}
                />
                <br />
                <Textarea
                    id="utdypende632"
                    maxLength={0}
                    value={schema.utdypende632 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende632: value,
                                };
                                validate('utdypende632', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende632}
                    label={
                        <Element>
                            6.3.2 Beskriv pågående og planlagt henvisning, utredning og/eller behandling. Lar dette seg
                            kombinere med delvis arbeid?
                        </Element>
                    }
                />
            </Ekspanderbartpanel>
            <br />
            <Ekspanderbartpanel
                tittel="6.4"
                apen={!!schema.utdypende641 || !!schema.utdypende642 || !!schema.utdypende643}
            >
                <Textarea
                    id="utdypende641"
                    maxLength={0}
                    value={schema.utdypende641 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende641: value,
                                };
                                validate('utdypende641', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende641}
                    label={<Element>6.4.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon</Element>}
                />
                <br />
                <Textarea
                    id="utdypende642"
                    maxLength={0}
                    value={schema.utdypende642 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende642: value,
                                };
                                validate('utdypende642', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende642}
                    label={
                        <Element>6.4.2 Beskriv pågående og planlagt henvisning, utredning og/eller behandling</Element>
                    }
                />
                <br />
                <Textarea
                    id="utdypende643"
                    maxLength={0}
                    value={schema.utdypende643 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende643: value,
                                };
                                validate('utdypende643', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende643}
                    label={
                        <Element>
                            6.4.3 Hva mener du skal til for at pasienten kan komme tilbake i eget eller annet arbeid?
                        </Element>
                    }
                />
            </Ekspanderbartpanel>
            <br />
            <Ekspanderbartpanel
                tittel="6.5"
                apen={!!schema.utdypende651 || !!schema.utdypende652 || !!schema.utdypende653 || !!schema.utdypende654}
            >
                <Textarea
                    id="utdypende651"
                    maxLength={0}
                    value={schema.utdypende651 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende651: value,
                                };
                                validate('utdypende651', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende651}
                    label={<Element>6.5.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.</Element>}
                />
                <br />
                <Textarea
                    id="utdypende652"
                    maxLength={0}
                    value={schema.utdypende652 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende652: value,
                                };
                                validate('utdypende652', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende652}
                    label={<Element>6.5.2 Hvordan påvirker dette funksjons-/arbeidsevnen?</Element>}
                />
                <br />
                <Textarea
                    id="utdypende653"
                    maxLength={0}
                    value={schema.utdypende653 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende653: value,
                                };
                                validate('utdypende653', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende653}
                    label={
                        <Element>
                            6.5.3 Beskriv pågående og planlagt henvisning, utredning og/eller medisinsk behandling
                        </Element>
                    }
                />
                <br />
                <Textarea
                    id="utdypende654"
                    maxLength={0}
                    value={schema.utdypende654 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende654: value,
                                };
                                validate('utdypende654', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende654}
                    label={
                        <Element>
                            6.5.4 Kan arbeidsevnen bedres gjennom medisinsk behandling og/eller arbeidsrelatert
                            aktivitet? I så fall hvordan? Angi tidsperspektiv
                        </Element>
                    }
                />
            </Ekspanderbartpanel>
            <br />
            <Ekspanderbartpanel
                tittel="6.6"
                apen={!!schema.utdypende661 || !!schema.utdypende662 || !!schema.utdypende663}
            >
                <Textarea
                    id="utdypende661"
                    maxLength={0}
                    value={schema.utdypende661 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende661: value,
                                };
                                validate('utdypende661', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende661}
                    label={
                        <Element>
                            6.6.1 Hva antar du at pasienten kan utføre av eget arbeid/arbeidsoppgaver i dag eller i nær
                            framtid?
                        </Element>
                    }
                />
                <br />
                <Textarea
                    id="utdypende662"
                    maxLength={0}
                    value={schema.utdypende662 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende662: value,
                                };
                                validate('utdypende662', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende662}
                    label={
                        <Element>
                            6.6.2 Hvis pasienten ikke kan gå tilbake til eget arbeid, hva antar du at pasienten kan
                            utføre av annet arbeid/arbeidsoppgaver?
                        </Element>
                    }
                />
                <br />
                <Textarea
                    id="utdypende663"
                    maxLength={0}
                    value={schema.utdypende663 || ''}
                    onChange={({ target: { value } }) => {
                        setSchema(
                            (state): SchemaType => {
                                const updatedSchema = {
                                    ...state,
                                    utdypende663: value,
                                };
                                validate('utdypende663', updatedSchema);
                                return updatedSchema;
                            },
                        );
                    }}
                    feil={errors.utdypende663}
                    label={
                        <Element>6.6.3 Hvilken betydning har denne sykdommen for den nedsatte arbeidsevnen?</Element>
                    }
                />
                <br />
            </Ekspanderbartpanel>
        </SectionContainer>
    );
};

export default UtdypendeOpplysningerSection;
