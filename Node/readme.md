

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
function(exports, require, module, __filename, __dirname) {
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

## Module arguments

+ exports

  links to the property `exports` of `module` i.e. it's equivalent to `const { exports } = module;`

+ require

  Function that receives a string as input (filename, with extension `js`, `json` or `node` - checked in this order) and returns its `exports`

+ module

  contains all the info of the module, including the filename, paths where it will search for the required files, etc.

+ __filename

+ __dirname

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



With a class:

```js
  
const EventEmitter = require('events');

class WithLog extends EventEmitter {
  execute(taskFunc) {
    console.log('Before executing');
    this.emit('begin');
    taskFunc();
    this.emit('end');
    console.log('After executing');
  }
}

const withLog = new WithLog();

withLog.on('begin', () => console.log('About to execute'));
withLog.on('end', () => console.log('Done with execute'));

withLog.execute(() => console.log('*** Executing task ***'));
```

```js
const fs = require('fs');
const EventEmitter = require('events');

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    console.time('execute');
    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit('error', err);
      }

      this.emit('data', data);
      console.timeEnd('execute');
    });
  }
}

const withTime = new WithTime();

withTime.on('data', (data) => {
  console.log(`Length: ${data.length}`);
});

// this event will only execute once
process.once('uncaughtException', (err) => {
  console.log(err);
  // do some cleanup...
  process.exit(1); // exit anyway
});

withTime.execute(fs.readFile, '');
withTime.execute(fs.readFile, __filename);
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
  
+ `npm prune`

  Deletes all packages that aren't documented in `package.json` (and their dependencies)

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



# Other things

## File execution (terminal vs. internally)

The challenge is to execute the following file

```js
// printStars.js
const print = (stars, header) => {
	console.log('*'.repeat(stars));
  console.log(header);
  console.log('*'.repeat(stars));
}
```

directly from the terminal and indirectly through another script, i.e. executing it through index.js (using `require`)

```js
// index.js
const printStars = require('./printStars');
printStars(10, 'Hi!')
```

This if statement will solve it:

```js
// ...printStars.js
if (require.main == module) {
  // Running as a script
  print(process.argv[2], process.argv[3]);
} else {
  // Being required
  module.exports = print;
}
```

Now, we can call both script using

```bash
node printStars.js 5 hello			# Direct execution of printStar.js, passing in the arguments
node index.js										# Indirect execution of printStar.js through index.js
```

# Event Loop

In Node, I/O operations are usually referring to accessing disk and networking resources, which is the most time expensive part of all operations. Node's Event Loop is designed around the fact that the largest waste in computer programming comes from waiting in such io operation to complete. We can handle requests in such operations in several ways:

+ Synchronously - slow
+ fork() - nor scalable
+ threads - one for each request - complicated
+ event loop - doesn't block the main execution. 

The Event Loop is the entity that handles external events and converts them into callback invocations. In other words, it's a loop that picks events from the event queue and pushes their callbacks to the call stack.

This loop is basically an infinite loop that starts with the command `npm start` and finsishes with the command `process.exit()`.

The runtime engine (e.g. V8) is comprised of the stack and the heap (where objects are stored). Node adds API like timers, emitters and provides the queue and loop using the `libuv` library.

**How to take advantage of the Event Loop?**

## Callbacks

Initially, it was using callbacks. Callback is a function that runs after another finishes. In the following example the `readFile` method of the `fs` module is asynchronous. The function where this asynchronous event is being executed also happens to receive a function `cb`, which will only execute once `readFile` is done. This function is, thus, a callback. What this method does is to inject 2 arguments that are returned from `fs.readFile(file)` into the second method's argument (the callback function).

```js
const fs = require('fs');

const readFileAsArray = (file,cb) => {
  fs.readFile(file, (err, data) => {
    if(err) {
      return cb(err); // forwards err to cb
    }
    
    const lines = data.toString().trim().split('\n');
    cb(null, lines); // forwards lines to cb
  })
}

// example call
readFileAsArray('./numbers', (err, lines) => { // file numbers has only lines with numbers
  if (err) throw err;
  
  const numbers = lines.map(Number);
  const oddNumbers = numbers.filter(number => number % 2 === 1);
  console.log('odd numbers count:', addNumbers.length);
});
```



## Promises

The previous snippet can be converted into a promise, which is arguably more readable. It will, instead of passing a callback as an argument and handling the error in the same place, a promise object allows us to handle success and error cases seperately, as well as chain multiple calls instead of nesting them.

```js
const fs = require('fs');

const readFileAsArray = file => {								// no longer receives the callback cb
  return new Promise((resolve, reject) => {			// new Promise instead
    fs.readFile(file, (err, data) => {
      if(err) {
        return reject(err); 										// replaced cb by reject
      }

      const lines = data.toString().trim().split('\n');
      resolve(lines); 													// replaced cb by resolve
    })
  })
}

readFileAsArray('./numbers')
	.then(lines => {
    const numbers = lines.map(Number);
    const oddCount = numbers.filter(nr => nr % 2 == 1).length;
    console.log('odd numbers count:', oddCount);
	})
	.catch(err => throw err)
```



## Async/await

Has to be executed with the flag `--harmony-async-await`: `node --harmony-async-await index.js`

```js
async const countOdd = () => {
  try {
    // with await, we treat the async as if it was sync:
    const lines = await readFileAsArray('./numbers'); 																			
    const numbers = lines.map(Number);
    const oddCount = numbers.filter(nr => nr % 2 == 1).length)
  } catch(err) {
		throw err;
  }
}
countOdd();
```









**Sources**:

[Advanced Node.js, by Samer Buna](https://app.pluralsight.com/courses/0d10b83d-4a1c-487e-9da1-e4cbf1bce8ab/table-of-contents)

[jscomplete/advanced-nodejs](https://github.com/jscomplete/advanced-nodejs)

