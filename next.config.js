/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true
    },
    reactStrictMode: true,
    poweredByHeader: false,
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
