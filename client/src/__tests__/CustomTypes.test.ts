import * as iotsPromise from 'io-ts-promise';

import { createEnumType } from '../types/CustomTypes';

describe('CustomTypes', () => {
    describe('EnumType', () => {
        enum TestEnum {
            APPLE = 'this is an apple',
            ORANGE = 'this is an orange',
        }
        const enumType = createEnumType<TestEnum>(TestEnum, 'TestEnum');

        it('Should decode a string from the enum', () => {
            return iotsPromise.decode(enumType, 'APPLE').then(decodedEnum => {
                expect(decodedEnum).toBe('this is an apple');
            });
        });
        it('Should encode enum to the original string', () => {
            expect(enumType.encode(TestEnum.APPLE)).toBe('APPLE');
        });
    });
});
