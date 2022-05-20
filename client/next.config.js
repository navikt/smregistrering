/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withSentryConfig(
    withBundleAnalyzer({
        reactStrictMode: true,
    }),
    { silent: true },
);
