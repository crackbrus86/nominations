const path = require('path');

module.exports = {
    entry: {
      nominations: "./js/nominations/index.js",
      "nominations-adm": "./js/nominations-adm/index.js",
      "nominations-mgr": "./js/nominations-mgr/index.js",
      settings: "./js/settings/index.js"
    },
    output: {
        path: path.resolve(__dirname, 'js/dist'),
        filename: '[name]-bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.js$/,
            use: ["source-map-loader"],
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['es2015', 'react']
              }
            }
          },
          {
            test: /\.css$/,
            use: [
                {loader: "style-loader"},
                { loader: 'css-loader' },
                { loader: 'sass-loader' }
            ]
          }
        ]
      }
};