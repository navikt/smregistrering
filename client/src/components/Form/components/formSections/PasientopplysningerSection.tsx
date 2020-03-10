import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';

import Row from '../formComponents/Row';
import SectionContainer from '../SectionContainer';
import { SchemaField, SchemaType } from '../../Form';
import { Section } from '../../../../App';

export enum MetadataField {
    PERSONNUMMER = 'personnummer',
    TELEFON = 'telefon',
    ETTERNAVN = 'etternavn',
    FORNAVN = 'fornavn',
}

export type Metadata = {
    [MetadataField.PERSONNUMMER]?: string;
    [MetadataField.TELEFON]?: string;
    [MetadataField.ETTERNAVN]?: string;
    [MetadataField.FORNAVN]?: string;
};

type PasientopplysningerProps = {
    section: Section;
    setSchema: (value: React.SetStateAction<SchemaType>) => void;
};

const PasientopplysningerSection = ({ section, setSchema }: PasientopplysningerProps) => {
    return (
        <SectionContainer section={section}>
            <Row>
                <Input
                    onChange={({ target: { value } }) =>
                        setSchema(state => ({
                            ...state,
                            [MetadataField.ETTERNAVN]: value,
                        }))
                    }
                    type="text"
                    label={<Element>1.1.1 Etternavn</Element>}
                />
                <Input
                    onChange={({ target: { value } }) =>
                        setSchema(state => ({
                            ...state,
                            [MetadataField.FORNAVN]: value,
                        }))
                    }
                    type="text"
                    label={<Element>1.1.2 Fornavn</Element>}
                />
            </Row>

            <Input
                className="form-margin-bottom half"
                type="tel"
                onChange={({ target: { value } }) =>
                    setSchema(state => ({
                        ...state,
                        [MetadataField.TELEFON]: value,
                    }))
                }
                label={<Element>1.3 Telefon</Element>}
            />

            <Input
                className="form-margin-bottom"
                type="text"
                onChange={({ target: { value } }) => setSchema(state => ({ ...state, [SchemaField.LEGE_NAVN]: value }))}
                label={<Element>1.4 Navn på pasientens fastlege</Element>}
            />
        </SectionContainer>
    );
};

export default PasientopplysningerSection;
