module.exports = {
  loader: 'babel-loader',
  presets: [
    [
      'env',
      {
        modules: false,
      },
    ],
    'es2015',
    'react',
    'stage-0',
  ],
  plugins: ['styled-components'],
  env: {
    production: {
      only: ['app'],
      plugins: [
        'transform-react-remove-prop-types',
        'transform-react-inline-elements',
        'transform-react-constant-elements',
      ],
    },
    test: {
      plugins: ['transform-es2015-modules-commonjs', 'dynamic-import-node'],
    },
  },
};
