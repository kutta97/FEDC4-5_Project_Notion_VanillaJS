module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@api': './src/api',
          '@components': './src/components',
          '@consts': './src/consts',
          '@core': './src/core',
          '@data': './src/data',
          '@pages': './src/pages',
          '@public': './public',
          '@stores': './src/stores',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
