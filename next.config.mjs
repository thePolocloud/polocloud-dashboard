/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    turbopack: {},
    images: {
        unoptimized: false,
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'mineskin.eu',
                pathname: '/**',
            },
        ],
    },

    webpack: (config, {isServer}) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
            };
        }
        return config;
    },

    typescript: {
        ignoreBuildErrors: true,
    },

    trailingSlash: false,
    poweredByHeader: false,

    generateBuildId: async () => {
        return 'build-' + Date.now();
    },

    async rewrites() {
        return [
            {
                source: '/login',
                destination: '/login',
                has: [
                    {
                        type: 'header',
                        key: 'x-vercel-deployment',
                    },
                ],
            },
            {
                source: '/onboarding',
                destination: '/onboarding',
                has: [
                    {
                        type: 'header',
                        key: 'x-vercel-deployment',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
