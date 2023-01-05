/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  webpack(config) {
    config.resolve.fallback = {
      fs: false,
      path: false,
      stream: false,
      constants: false,
    };
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    });

    return config;
  },
};

// module.exports = nextConfig;
