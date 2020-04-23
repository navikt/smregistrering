import * as iotsPromise from 'io-ts-promise';

import { createEnumType } from '../types/CustomTypes';

describe('CustomTypes', () => {
    describe('EnumType', () => {
        enum testEnum {
            APPLE = 'this is an apple',
            ORANGE = 'this is an orange',
        }
        const enumType = createEnumType<testEnum>(testEnum, 'testEnum');

        it('Should decode a string from the enum', () => {
            return iotsPromise.decode(enumType, 'APPLE').then(decodedEnum => {
                expect(decodedEnum).toBe('this is an apple');
            });
        });
        it('Should encode enum to the original string', () => {
            expect(enumType.encode(testEnum.APPLE)).toBe('APPLE');
        });
    });
});
