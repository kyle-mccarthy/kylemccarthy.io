const withTypescript = require('@zeit/next-typescript');
const withImages = require('next-images');
const path = require('path');

module.exports = withImages(
  withTypescript({
    useFileSystemPublicRoutes: false,
    webpack: function(config, { buildId, dev }) {
      const originalEntry = config.entry;

      config.resolve = {
        ...config.resolve,
        ...{
          alias: {
            ...config.resolve.alias,
            '@pages': path.resolve(__dirname, 'pages'),
            '@ui': path.resolve(__dirname, 'ui'),
          },
        },
      };

      return config;
    },
  }),
);
