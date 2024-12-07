module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
<<<<<<< HEAD
    plugins: [
      ['module:react-native-dotenv', {
        "moduleName": "@env",
        "path": ".env",
        "safe": false,
        "allowUndefined": true,
      }],
      // 다른 플러그인들...
    ],
=======
    plugins: [],
>>>>>>> 72cea67 (Initial commit)
  };
};
