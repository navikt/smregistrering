import * as Sentry from '@sentry/browser';
import { createFrontendLogger, createMockFrontendLogger, setUpErrorReporting } from '@navikt/frontendlogger/lib';

const frontendloggerApiUrl = `${process.env.REACT_APP_FRONTEND_LOGGER_URL}/api`;

const frontendLogger =
    process.env.NODE_ENV === 'production'
        ? createFrontendLogger('smregistrering', frontendloggerApiUrl)
        : createMockFrontendLogger('smregistrering');

export function setupLogger() {
    if (process.env.NODE_ENV === 'production') {
        setUpErrorReporting(logger);
    }
}

const logger: ReturnType<typeof createFrontendLogger> = {
    info: (data) => {
        frontendLogger.info(data);
        Sentry.addBreadcrumb({
            message: `${JSON.stringify(data)}`,
            level: Sentry.Severity.Info,
        });
    },
    warn: (data) => {
        frontendLogger.warn(data);
        Sentry.addBreadcrumb({
            message: `${JSON.stringify(data)}`,
            level: Sentry.Severity.Warning,
        });
    },
    error: (data) => {
        frontendLogger.error(data);
        Sentry.captureException(data);
    },
    event: (name, fields, tags) => {
        frontendLogger.event(name, fields, tags);
    },
};

export default logger;
