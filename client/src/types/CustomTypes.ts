import * as iots from 'io-ts';
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
class EnumType<A> extends iots.Type<A> {
    public readonly _tag: 'EnumType' = 'EnumType';
    public enumObject!: object;
    public constructor(e: object, name?: string) {
        super(
            name || 'enum',
            (u): u is A => {
                if (!Object.values(this.enumObject).find(v => v === u)) {
                    return false;
                }
                // enum reverse mapping check
                if (typeof (this.enumObject as any)[u as string] === 'number') {
                    return false;
                }

                return true;
            },
            (u, c) => (this.is(u) ? iots.success(u) : iots.failure(u, c)),
            iots.identity,
        );
        this.enumObject = e;
    }
}

// simple helper function
export const createEnumType = <T>(e: object, name?: string) => new EnumType<T>(e, name);
