/** @type {import('next').NextConfig} */
const withTM = require ('next-transpile-modules')(
  []
)
module.exports = withTM({
  trailingSlash: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias={
      ...config.resolve.alias,
    'react-native$': 'react-native-web',
    };
    return config;

  },
});
