var path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './webpack.entry.js',
        './src/index.js'
    ],
    mode: 'development',
    output: {
      path: path.join(__dirname, "build"),
      filename: 'index.js'
    },
    node: {
        child_process: 'empty',
        fs: 'empty',
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.coffee', '.js' ]
    },
    module: {
      rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        {
          test: /\.coffee$/,
          use: ['coffee-loader'],
        },
        {
          test: /\.fbp$/,
          use: ['fbp-loader'],
        },
        {
          // Replace NoFlo's dynamic loader with a generated one
          test: /noflo\/lib\/loader\/register.js$/,
          use: [
            {
              loader: 'noflo-component-loader',
              options: {
                graph: null,
                debug: true,
                baseDir: __dirname,
              },
            },
          ],
        }
      ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "components", to: "components" },
            { from: "graphs", to: "graphs" },
        ]),
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        })
    ]
  };