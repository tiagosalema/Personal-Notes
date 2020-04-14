

# Modules

A module is a file that contains code. However, it's more accurate to refer to it as module rather than file, as Node doesn't execute it as is. Instead, it wraps the file in a function. This function receives 5 arguments by default:

+ exports - define the api of a module
+ module - idem
+ require - require other modules inside this one
+ __filename - path of this file
+ __dirname - path to the folder hosting this file

This means that, internally, node transforms this file

```js
console.log(arguments);
```

into

```js
function(exports, module,require,__filename,__dirname) {
  console.log(arguments);
  return  module.exports; // returned by default (no need to do it by hand)
}
```

Note that `exports` is just an alias to `module.exports`,i.e. these are equivalent:

```js
exports.a = 1;
module.exports.a = 1;
```

Also note that we can reassign the value of exports to another value. However, that will not change `module.exports`. That means that if we want the exports to be a function instead of the object

```js
exports = () => {} // this will not do anything, since we are just modifying where the variable exports is pointing to (it is no longer pointing the the exports property in module)

module.exports = () => {} // this will work
```

That means that we will only use `exports.__` if the objective is to keep what we are exporting as an object.

[Some examples](https://github.com/jscomplete/ngs/tree/master/4-modules/2-examples) of how to use `module.exports`:

```js
// filename: 1-object
// Top-level API is a simple object (no need to use module.exports)

exports.language = 'English';
exports.direction = 'RTL';
exports.encoding = 'UTF-8';
```

```js
const api = require('./1-object');

console.log(api.language, api.direction, api.encoding);
```

---

```js
// filename: 2-array.js
// Top-level API is an array

module.exports = [2, 3, 5, 7];
```

```js
console.log(require('./2-array'));
```

---

```js
// filename: 3-string.js
// Top-level API is a string

module.exports = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>HTML Document</title>
  </head>
  <body>
  </body>
  </html>
`;
```

```js
const myTemplate = require('./3-string');

console.log(myTemplate);
```

---

```js
// filename: 4-function.js
// Top-level API is a function

module.exports = title => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>${title}</title>
  </head>
  <body>
  </body>
  </html>
`;
```

```js
const templateGenerator = require('./4-function');

const myTemplate = templateGenerator('Hello Node!');

console.log(myTemplate);
```



## Event Emitters

Allows modules to work together without depending on any APIs.

```js
const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.emit('TEST_EVENT');

myEmitter.on('TEST_EVENT', () => {
  console.log('TEST_EVENT was fired');
});
myEmitter.on('TEST_EVENT', () => {
  console.log('TEST_EVENT was fired');
});
myEmitter.on('TEST_EVENT', () => {
  console.log('TEST_EVENT was fired');
});
```

If we execute this file, nothing is gonna be logged to the console, since the event was emitted before it was subscribed and no one was listening at that point. If the event is emitted after having been subscribed to, the 3 logs will be printed. Another way of making the emit be executed after the subscription, we can wrap it in `setImmediate`:

```js
setImmediate(() => {
  myEmitter.emit('TEST_EVENT');
})
```

It's also possible to emit an event and send stuff with it. This stuff will be received as arguments in the callback function of the subscription:

```js
myEmitter.on('TEST_EVENT', (x,y) => {
  console.log(`TEST_EVENT was fired with values ${x} and ${y}`);
});

myEmitter.emit('TEST_EVENT', 10, "hello");
// TEST_EVENT was fired with values 10 and hello
```

# Async operations

It's better to use promises than callbacks, since it improves readability.

The following 2 scripts are equivalent:

```js
const fs = require('fs');

fs.readFile(__filename, function cb1(err, data) {
  fs.writeFile(__filename + '.copy', data, function cb2(err) {
    // Nest more callbacks here...
  });
});

console.log('TEST');
```

```js
const fs = require('fs').promises;

async function main() {
  const data = await fs.readFile(__filename);
  await fs.writeFile(__filename + '.copy', data);
  // More awaits here...
}

main();
console.log('TEST');
```



Any function that accepts a callback can be *promisified* by calling the promisify api from the built-in util module:

```js
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function main() {
  const data = await readFile(__filename);
  console.log('File data is', data);
}

main();

console.log('TEST');
```



# NPM

## Useful commands

+ `npm home x`

  Loads the package homepage e.g. `npm home lodash`

+ `npm repo x`

  Opens the repository of package `x` e.g. `npm repo lodash`

+ `npm config set`

  Sets values in the npm configuration e.g.

  + `npm config set save true` sets as default the flag `--save` in `npm i`
  + `npm config set init-author-name "Tiago Ferreira"` sets as default the name appearing in the initialization of `package.json`

+ `npm config list -l | grep init`

  Checks the default values of `package.json`

+ `npm ls -g --depth=0`
  Checks all the packages saved in global

# Web Servers

```js
const http = require('http');

const requestListener = (req,res) => {
  console.log(req.headers,req.url,req.method);
  res.end('Hello World\n');
};

const server = http.createServer(requestListener)

server.listen(8080, () => {
  console.log('Server is running on port 8080...')
})
```

The http method `createListener` is nothing more than a method that will create an EventEmitter. Thus, server is an an EventEmitter object that has several events that it emits, one of them being `request`. Instead of giving it a callback function, we could trigger that function every time `request` is emitted:

```js
const server = http.createServer();
server.on('request', requestListener);
```

## req and res

These 2 guys are streams. The `req` object is a readable stream while the `res` object is a writable one. Because streams are all EventEmitters we can subscribe to events emitted by these objects.

It is handy to use `console.dir` instead of `console.log` to check what are the available properties in `req`, since the former accepts an optional argument:

```js
console.dir(req, { depth: 0 });
```

This is useful because the `req` argument is huge, and having a depth=0 we are printing only the first layer of this object. When it is printed, note that the incoming object is of type `IncomingMessage`, which is the class that was internally used to instantiate this object. If we want further info on this, we should go to the Node documentation and search for this class.

## with external module

Instead of using the built-in http module, the `express` module is also widely used



# Templating languages

Instead of writing plain old boring static html, we can use templating languages that enable us to use both HTML and JavaScript in one file. Some examples are:

- Pug

- Handlebars

- EJS

  ```js
  const express = require('express')
  const app = express()
  
  app.set('view engine', 'ejs') 										// 1. Set the view engine as EJS
  app.get('/', (req, res) => res.render('index'))		// 2. .render instead of .send
  app.get('/about', (req, res) => res.render('about'))
  
  app.listen(3000, () => console.log(`Example app listening on port 3000!`))
  ```

  `res.render` will receive a string as argument that corresponds to the title of the `.ejs` file, saved in `/views` (views is the default ejs folder). Javascript is embeded in the `.ejs` fille with `<%- 1+1 -%>`

- Liquid

- React/JSX

# Popular modules

## Built-in

+ [os](https://nodejs.org/api/os.html)
+ [fs](https://nodejs.org/api/fs.html)
+ 

## External

+ Nodemon

  Refreshes the server every time the code is saved. The only thing to know about it is that we execute our files by writing `nodemon filename.js` instead of `file.js`

+ Express

  Starts a web server and does all the customatization that we'd have to manually do using the built-in http node module. Express is the more widely used one to create web servers, but here are a few that are also used:

  + Meteor
  + Koa
  + Sails



# Debugging with Chrome 

1. `node --inspect-brk filename.js` (`brk` stands for break)
2. go to the url `chrome://inspect`
3. The execution of `filename.js` will be listed there. Click `inspect`.