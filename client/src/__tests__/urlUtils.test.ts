import { getOppgaveidFromSearchParams } from '../utils/urlUtils';

describe('urlUtils', () => {
    beforeEach(() => {
        delete window.location;
    });

    it('Returns the oppgaveid if it exists', () => {
        //@ts-ignore - Because we only need the "search" property of the location, and TS complains that other properties are missing
        window.location = new URL('https://url.com/?oppgaveid=123456789');
        expect(getOppgaveidFromSearchParams(window.location.search)).toBe('123456789');
    });

    it('Returns the oppgaveid when multiple parameters exist', () => {
        //@ts-ignore - Because we only need the "search" property of the location, and TS complains that other properties are missing
        window.location = new URL('https://url.com/?oppgaveid=123456789&param=val');
        expect(getOppgaveidFromSearchParams(window.location.search)).toBe('123456789');
    });

    it('Throws UrlError if the URI does not contain oppgaveid', () => {
        //@ts-ignore - Because we only need the "search" property of the location, and TS complains that other properties are missing
        window.location = new URL('https://url.com/');
        expect(() => {
            getOppgaveidFromSearchParams(window.location.search);
        }).toThrow(URIError);
    });
});
