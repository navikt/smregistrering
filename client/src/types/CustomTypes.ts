import * as iots from 'io-ts';
import dayjs from 'dayjs';
import { either } from 'fp-ts/lib/Either';

// represents a Date from an ISO string
export const DateFromString = new iots.Type<Date, string, unknown>(
    'DateFromString',
    (input: unknown): input is Date => input instanceof Date,
    (input, context) =>
        either.chain(iots.string.validate(input, context), str => {
            const date = new Date(str);
            return isNaN(date.getTime()) ? iots.failure(input, context) : iots.success(date);
        }),
    date => dayjs(date).format('YYYY-MM-DD'),
);

// represents a Date from an ISO string
export const DateTimeFromString = new iots.Type<Date, string, unknown>(
    'DateTimeFromString',
    (input: unknown): input is Date => input instanceof Date,
    (input, context) =>
        either.chain(iots.string.validate(input, context), str => {
            const date = new Date(str);
            return isNaN(date.getTime()) ? iots.failure(input, context) : iots.success(date);
        }),
    date => date.toISOString(),
);

// converts string ot number
export const NumberFromString = new iots.Type<number, string, unknown>(
    'StringFronProcessEnv',
    (input): input is number => typeof input === 'string' && isNaN(parseInt(input)),
    (input, context) =>
        typeof input === 'string' && isNaN(parseInt(input))
            ? iots.success(parseInt(input))
            : iots.failure(input, context),
    output => output.toString(),
);

// represents a base64 encoded PDF
export const Base64Pdf = new iots.Type<string, string, unknown>(
    'Base64Pdf',
    (input: unknown): input is string => typeof input === 'string',
    (input, context) =>
        either.chain(iots.string.validate(input, context), str => {
            const b64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/; // regex for all valid b64 character combinations
            return b64regex.test(str) && atob(str).includes('%PDF') ? iots.success(str) : iots.failure(input, context);
        }),
    iots.identity,
);

// EnumType Class
class EnumType<A> extends iots.Type<A, string> {
    public readonly _tag: 'EnumType' = 'EnumType';
    public enumObject!: object;
    public constructor(enumObject: object, name?: string) {
        super(
            name || 'enum',
            (input: unknown): input is A => {
                if (typeof input !== 'string') {
                    return false;
                }
                if (!Object.keys(this.enumObject).find(value => value === input)) {
                    return false;
                }
                // enum reverse mapping check
                if (typeof (this.enumObject as any)[input as string] === 'number') {
                    return false;
                }
                return true;
            },
            (input, context) => {
                return this.is(input) ? iots.success((this.enumObject as any)[input]) : iots.failure(input, context);
            },
            runtimeObject => {
                const keyValuePairs = Object.entries(this.enumObject);
                const keyValuePairObtainedFromValue = keyValuePairs.find(
                    ([_key, value]) => value === (runtimeObject as any),
                );
                if (keyValuePairObtainedFromValue?.[0]) {
                    return keyValuePairObtainedFromValue[0];
                }
                throw new Error('Unexpected enum value');
            },
        );
        this.enumObject = enumObject;
    }
}

// simple helper function
export const createEnumType = <T>(enumObject: object, name?: string) => new EnumType<T>(enumObject, name);
