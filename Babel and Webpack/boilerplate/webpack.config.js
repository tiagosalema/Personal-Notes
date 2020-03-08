const path = require("path");
const HWP = require("html-webpack-plugin");

module.exports = {
  entry: {
    bundle: "./src/index.js",
    vendor: ["react", "react-dom"]
  },
  output: {
    filename: "bundle.js", // name of the to-be main file, requested to be the script of the index.html file
    path: path.join(__dirname, "/build") // "/dist" is also common
  },
  module: {
    rules: [
      {
        use: "babel-loader", // Webpack: please transpile
        test: /\.js$/, // all .js files from ES5/ES6
        exclude: /node_modules/ // except the ones in node_modules
      }
    ]
  },
  plugins: [new HWP({ template: path.join(__dirname, "/src/index.html") })]
};
