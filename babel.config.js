module.exports = {
    "presets": ["module:@react-native/babel-preset"],
plugins: [
  'react-native-reanimated/plugin',
  [
    'module-resolver',
    {
      root: ['./'],
      alias: {
        '@components': './src/components',
        '@screens': './src/screens',
        '@theme': './src/theme',
        '@utils': './src/utils',
        '@assets': './assets',
        '@images': './assets/images',
        '@layouts': './src/layouts',
        '@hooks': './src/hooks',
        '@routes': './src/routes',
        '@typedef': './src/types',
        '@sections': './src/sections',
        '@appData': './data',
        '@actionSheets': './src/action-sheet',
        hoc: './src/hoc',

        // '@icons': './assets/svg/icons',
        '@store': './src/store',
        // '@colors': './src/theme-config/colors',
        // '@typography': './src/theme-config/typography',
        // '@font-config': './src/theme-config/fontConfig',
        // '@types': './src/types',
        // '@action-sheets': './src/action-sheets',
        // '@config': './config.ts',
      },
    },
  ],
  'transform-inline-environment-variables',
],

};
