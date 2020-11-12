import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import { FeiloppsummeringFeil, Textarea } from 'nav-frontend-skjema';

import SectionContainer from '../SectionContainer';
import { SchemaType } from '../../Form';
import { Section } from '../../../../types/Section';

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
    schema: SchemaType;
    errors: Map<keyof SchemaType, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<SchemaType>>;
}

const UtdypendeOpplysningerSection = ({ section, setFormState, schema, errors }: UtdypendeOpplysningerSectionProps) => {
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
                        setFormState((formState) => ({ ...formState, utdypende611: value }));
                    }}
                    feil={errors.get('utdypende611')?.feilmelding}
                    label="6.1.1 Er det sykdommen, utredningen og/eller behandlingen som hindrer økt aktivitet? Beskriv."
                />
                <br />
                <Textarea
                    id="utdypende612"
                    maxLength={0}
                    value={schema.utdypende612 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende612: value }));
                    }}
                    feil={errors.get('utdypende612')?.feilmelding}
                    label="6.1.2 Har behandlingen frem til nå bedret arbeidsevnen?"
                />
                <br />
                <Textarea
                    id="utdypende613"
                    maxLength={0}
                    value={schema.utdypende613 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende613: value }));
                    }}
                    feil={errors.get('utdypende613')?.feilmelding}
                    label="6.1.3 Hva er videre plan for behandling?"
                />
                <br />
                <Textarea
                    id="utdypende614"
                    maxLength={0}
                    value={schema.utdypende614 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende614: value }));
                    }}
                    feil={errors.get('utdypende614')?.feilmelding}
                    label="6.1.4 Er det arbeidsforholdet som hindrer (økt) aktivitet? Beskriv."
                />
                <br />
                <Textarea
                    id="utdypende615"
                    maxLength={0}
                    value={schema.utdypende615 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende615: value }));
                    }}
                    feil={errors.get('utdypende612')?.feilmelding}
                    label="6.1.5 Er det andre forhold som hindrer (økt) aktivitet?"
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
                        setFormState((formState) => ({ ...formState, utdypende621: value }));
                    }}
                    feil={errors.get('utdypende621')?.feilmelding}
                    label="6.2.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon."
                />
                <br />
                <Textarea
                    id="utdypende622"
                    maxLength={0}
                    value={schema.utdypende622 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende622: value }));
                    }}
                    feil={errors.get('utdypende622')?.feilmelding}
                    label="6.2.2 Hvordan påvirker sykdommen arbeidsevnen?"
                />
                <br />
                <Textarea
                    id="utdypende623"
                    maxLength={0}
                    value={schema.utdypende623 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende623: value }));
                    }}
                    feil={errors.get('utdypende623')?.feilmelding}
                    label="6.2.3 Har behandlingen frem til nå bedret arbeidsevnen?"
                />
                <br />
                <Textarea
                    id="utdypende624"
                    maxLength={0}
                    value={schema.utdypende624 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende624: value }));
                    }}
                    feil={errors.get('utdypende624')?.feilmelding}
                    label="6.2.4 Beskriv pågående og planlagt henvisning,utredning og/eller behandling."
                />
            </Ekspanderbartpanel>
            <br />
            <Ekspanderbartpanel tittel="6.3" apen={!!schema.utdypende631 || !!schema.utdypende632}>
                <Textarea
                    id="utdypende631"
                    maxLength={0}
                    value={schema.utdypende631 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende631: value }));
                    }}
                    feil={errors.get('utdypende631')?.feilmelding}
                    label="6.3.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon"
                />
                <br />
                <Textarea
                    id="utdypende632"
                    maxLength={0}
                    value={schema.utdypende632 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende632: value }));
                    }}
                    feil={errors.get('utdypende632')?.feilmelding}
                    label="6.3.2 Beskriv pågående og planlagt henvisning, utredning og/eller behandling. Lar dette seg kombinere med delvis arbeid?"
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
                        setFormState((formState) => ({ ...formState, utdypende641: value }));
                    }}
                    feil={errors.get('utdypende641')?.feilmelding}
                    label="6.4.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon"
                />
                <br />
                <Textarea
                    id="utdypende642"
                    maxLength={0}
                    value={schema.utdypende642 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende642: value }));
                    }}
                    feil={errors.get('utdypende642')?.feilmelding}
                    label="6.4.2 Beskriv pågående og planlagt henvisning, utredning og/eller behandling"
                />
                <br />
                <Textarea
                    id="utdypende643"
                    maxLength={0}
                    value={schema.utdypende643 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende643: value }));
                    }}
                    feil={errors.get('utdypende643')?.feilmelding}
                    label="6.4.3 Hva mener du skal til for at pasienten kan komme tilbake i eget eller annet arbeid?"
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
                        setFormState((formState) => ({ ...formState, utdypende651: value }));
                    }}
                    feil={errors.get('utdypende651')?.feilmelding}
                    label="6.5.1 Beskriv kort sykehistorie, symptomer og funn i dagens situasjon."
                />
                <br />
                <Textarea
                    id="utdypende652"
                    maxLength={0}
                    value={schema.utdypende652 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende652: value }));
                    }}
                    feil={errors.get('utdypende652')?.feilmelding}
                    label="6.5.2 Hvordan påvirker dette funksjons-/arbeidsevnen?"
                />
                <br />
                <Textarea
                    id="utdypende653"
                    maxLength={0}
                    value={schema.utdypende653 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende653: value }));
                    }}
                    feil={errors.get('utdypende653')?.feilmelding}
                    label="6.5.3 Beskriv pågående og planlagt henvisning, utredning og/eller medisinsk behandling"
                />
                <br />
                <Textarea
                    id="utdypende654"
                    maxLength={0}
                    value={schema.utdypende654 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende654: value }));
                    }}
                    feil={errors.get('utdypende654')?.feilmelding}
                    label="6.5.4 Kan arbeidsevnen bedres gjennom medisinsk behandling og/eller arbeidsrelatert aktivitet? I så fall hvordan? Angi tidsperspektiv"
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
                        setFormState((formState) => ({ ...formState, utdypende661: value }));
                    }}
                    feil={errors.get('utdypende661')?.feilmelding}
                    label="6.6.1 Hva antar du at pasienten kan utføre av eget arbeid/arbeidsoppgaver i dag eller i nær framtid?"
                />
                <br />
                <Textarea
                    id="utdypende662"
                    maxLength={0}
                    value={schema.utdypende662 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende662: value }));
                    }}
                    feil={errors.get('utdypende662')?.feilmelding}
                    label="6.6.2 Hvis pasienten ikke kan gå tilbake til eget arbeid, hva antar du at pasienten kan utføre av annet arbeid/arbeidsoppgaver?"
                />
                <br />
                <Textarea
                    id="utdypende663"
                    maxLength={0}
                    value={schema.utdypende663 || ''}
                    onChange={({ target: { value } }) => {
                        setFormState((formState) => ({ ...formState, utdypende663: value }));
                    }}
                    feil={errors.get('utdypende663')?.feilmelding}
                    label="6.6.3 Hvilken betydning har denne sykdommen for den nedsatte arbeidsevnen?"
                />
                <br />
            </Ekspanderbartpanel>
        </SectionContainer>
    );
};

export default UtdypendeOpplysningerSection;
