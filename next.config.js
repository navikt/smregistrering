/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
    reactStrictMode: true,
});

module.exports =
    process.env.SENTRY_ENABLED === 'true'
        ? withSentryConfig(nextConfig, {
              silent: true,
          })
        : nextConfig;
