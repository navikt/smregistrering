// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
    dsn: SENTRY_DSN || 'https://e3ea5210572241a5a06675d86a49fa9d@sentry.gc.nav.no/89',
    tracesSampleRate: 1.0,
    enabled: process.env.NODE_ENV === 'production',
    environment: process.env.RUNTIME_ENVIRONMENT,
});
