import * as iots from 'io-ts';
import * as iotsPromise from 'io-ts-promise';

import { DateFromString, DateTimeFromString } from '../types/CustomTypes';

describe('CustomTypes', () => {
    describe('DateFromString', () => {
        it('Should encode to correct date-string', () => {
            const dateString = '2019-06-10';
            const date = new Date(dateString);
            expect(DateFromString.encode(date)).toBe(dateString);
        });
    });

    describe('DateTimeFromString', () => {
        it('Should encode to correct datetime-string', () => {
            const dateString = '2018-11-29T23:00:00.000Z';
            const date = new Date(dateString);
            expect(DateTimeFromString.encode(date)).toBe(dateString);
        });
    });
});
