export default {
  presets: [
    'babel-preset-expo',
    '@react-native/babel-preset'
  ],
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: "@env",
        path: ".env",
      }],
      '@babel/plugin-transform-private-methods',
      '@babel/plugin-transform-class-properties',
      '@babel/plugin-transform-private-property-in-object',
    ],
    overrides: [
      {
        test: /\.(js|ts|tsx)$/,
        plugins: [
          ['@babel/plugin-transform-private-methods', { loose: true }],
          ['@babel/plugin-transform-class-properties', { loose: true }],
          ['@babel/plugin-transform-private-property-in-object', { loose: true }]
        ],
      },
    ],
  };
  
