var path = require("path");

module.exports = {
    entry: './index.js',
    target: 'node',
    output: {
      path: path.join(__dirname, "build"),
      filename: 'example.bundle.js',
      libraryTarget: 'commonjs',
    },
    module: {
      rules: [
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
                // Whether to include the original component sources
                // in the build
                debug: true,
              },
            },
          ],
        },
      ]
    },
  };