import { createFrontendLogger, createMockFrontendLogger, setUpErrorReporting } from '@navikt/frontendlogger/lib';

const frontendloggerApiUrl = `${process.env.REACT_APP_FRONTEND_LOGGER_URL}/api`;

export const logger =
    process.env.NODE_ENV === 'production'
        ? createFrontendLogger('smregistrering', frontendloggerApiUrl)
        : createMockFrontendLogger('smregistrering');

export function setupLogger() {
    if (process.env.NODE_ENV === 'production') {
        setUpErrorReporting(logger);
    }
}
