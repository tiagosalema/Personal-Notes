It's thanks to Babel that we can use ES6 or JSX in a React app. So if we don't intend to use any of these, we don't need Babel. Other features are allowed due to Babel as well: async/await, usage of modules, greater browser support. Common Babel dependencies:

1. **babel-core**: Well as the name suggests the main engine of babel plugin for its dependents to work.
2. **babel-preset-env**: This is the ES5, ES6 supporting part
3. **babel-preset-react**: Babel can be used in any framework that needs latest JS syntax support, in our case its “React”, hence this preset.
4. **babel-loader**: Consider this as a bridge of communication between Webpack and Babel

Webpack allows the use of different loaders for sass, less, postcss etc and the use of different plugins to optimize builds such as Uglify, HotModuleReplacement, Chunks etc. Alternatives to Webpack are Browserify, Parsel, Brunch. Common Webpack dependencies:

1. **webpack**: The main webpack plugin as an engine for its dependents.
2. **webpack-cli**: To access some webpack commands through CLI like starting dev server, creating production build, etc.
3. **webpack-dev-server**: A minimal server for client-side development purpose only.
4. **html-webpack-plugin**: `index.html` is the main template HTML file and the content inside this file is supposed to change from time to time whenever needed or whenever a user requests for change in view. This package helps with that.