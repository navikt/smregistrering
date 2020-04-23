import { MetadataField } from './components/formSections/PasientopplysningerSection';
import { SchemaType } from './Form';

export type ValidationType = { [key in keyof SchemaType]: (value: any) => string | undefined };

export const validation: ValidationType = {
    [MetadataField.TELEFON]: (value: string | undefined) => {
        if (!value) {
            return 'Telefonnummer må være definert';
        }

        /* Advanced validation example
        // https://begrep.difi.no/Felles/mobiltelefonnummer
        if (!value.match('^\\+?[- _0-9]+$')) {
            return 'Telefonnummeret er ikke på et gyldig format';
        }
        */

        return undefined;
    },
    [MetadataField.ETTERNAVN]: (value: string | undefined) => {
        if (!value) {
            return 'Etternavn må være definert';
        }

        /* Advanced validation example
        if (!value.match('^\\+?[- _0-9]+$')) {
            return 'etternavn er ikke på et gyldig format';
        }
        */

        return undefined;
    },
    /* Advanced validation example: Field depends on other field
    [MetadataField.FORNAVN]: (value: string | undefined) => {
        if (value && !schema[MetadataField.ETTERNAVN]) {
            return 'Etternavn må defineres for at fornavn skal kunne fylles';
        }

        return undefined;
    },
    */
};
