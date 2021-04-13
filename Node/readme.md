Nodejs is a Javascript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven non-blocking I/O model that makes it lightweight and efficient.

Node is not adequate for CPU-intensive tasks

Node's event loop and asynchronous I/O, supplied by libuv, is where Node shines in I/O intensive use cases - Node is designed to build scalable network applications (network implies I/O). For the event loop to work properly, Node can't spend too much time doing anything on its own, including work requiring heavy CPU usage (which doesn't mean that Node doesn't have strategies on how to deal with these situations).

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



## Popular modules

### Built-in

+ [os](https://nodejs.org/api/os.html)

+ [fs](https://nodejs.org/api/fs.html)

+ path

+ http

  Comprised of 5 main classes:

  + `Server` - used to create a basic server. Inherits from the `net` module's class `Server` (i.e. `net.Server`), thus, it's an Event Emitter as well.

    ```js
    const server = require('http').createServer();
    // server is of type http.Server   
    ```

  + `ServerResponse` 

    ```js
    server.on('request', (req, res) => {
      // req: from the http.IncomingMessage class
      // res: from the http.ServerResponse class
    })
    ```

    It can also be done directly inside the `createServer()` argumen:

    ```js
  const { createServer } = require('http');
    
    createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      req.on( 'data' , chunk => res.write(chunk.toString().toUpperCase()) );
      req.on( 'end' , () => res.end() )
    }).listen(8000);
    ```
  
  
  
  
  
  + `IncomingMessage`
  
  + `ClientRequest`

    ```js
    const req = http.request(
      { hostname: 'www.google.com' },
      res => ...
      // req: from the http.IncomingMessage class 
    )
    // req: from the http.ClientRequest class 
    ```
  
  + `Agent` - manages e.g. pulling sockets used in client requests
  
    ```js
    const agent = req.agent;
    // agent: from the http.Agent class
    ```
  
    

### External

+ Nodemon

  Refreshes the server every time the code is saved. The only thing to know about it is that we execute our files by writing `nodemon filename.js` instead of `file.js`

+ Express

  Starts a web server and does all the customatization that we'd have to manually do using the built-in http node module. Express is the more widely used one to create web servers, but here are a few that are also used:

  + Meteor
  + Koa
  + Sails
  
  ```js
  const express = require('express');
  const app = express();
  app.use(express.json());
  
  app.post('/notes', (req, res) => {
    console.log(req.body);
    res.send('testing');
  });
  
  app.listen(3000);
  ```
  
  This snippet will expect a post request to port 3000. If a requets is sent through Postman with a JSON body, it will be printed in the server console.
  
+ Yargs

  Helps to build interactive command line tools by parsing arguments and generating a UI. Example:

  ```js
  yargs.command({
    command: 'add',
    describe: 'Add new item',
    builder: {
      name: { describe: 'Type of item' },
      price: { describe: 'Item price' }
    }
    handler: () => console.log('New item added!')
  })
  yargs.parse(); // kind of the same as console.log(process.argv)
  ```

  ```bash
  node index.js add --name="My item" --price="10"
  # New item added!
  # { _: [ 'add'], name: 'My item', price: '10', '$0': 'index.js' }
  ```

+ dotenv

  To set variables like `NODE_ENV=production`

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

+ + 



# Debugging with Chrome 

1. `node --inspect-brk filename.js` (`brk` stands for break)  - maybe just `inspect` works - TODO: try it
2. go to the url `chrome://inspect`
3. The execution of `filename.js` will be listed there. Click `inspect`.

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



# Streams

Working with big amounts of data in Node.js means working with streams.

A stream is a collection of data that might not be available all at once and doesn't have to fit in memory.

All streams are EventEmitters.

Notice that `process`, `process.stdin`, `process.stdout` are streams and, hence, are also EventEmitters and can listen to events like

```js
process.on('exit', cb)
```

```js
process.stdout.on('error', process.exit)
```



Let's write a big file using a writable stream:

```js
const fs = require('fs');
const file = fs.createWriteStream('./big.file');

for(let i=0; i<= 1e6; i++) {
  file.write('This is a chunk line being writen in ./big.file')
	// each time write is called on file, a new `chunk` is written into it
}
// after 1 million lines are written...

file.end(); 
```

Let's now create a server to serve this big file:

```js
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Here, we can use res in 2 different ways (see bellow)
})

server.listen(8000);
```

```js
// 1. writing in res all at once with a simple http server with the readfile method
fs.readFile('./big.file', (err, data) => {
  if (err) throw err;

  res.end(data)
})
```

```js
// 2. writing in res as a stream with the createReadStream method
const src = fs.createReadStream('./big.file');
src.pipe(res);
```

1. Executing this node script will make the computer memory go through the roof, as its execution buffers the whole file in memory before serving it and writing it out. This script is very inefficient.

2. Note that:

   + `res` is a writable stream 
   + with Node, it is possible to pipe streams (from readable to writable)

   For these reasons, we chose to create a stream out of the big file and pipe it into the `res` object stream. Running this script will have a much lower impact on the computer's memory.

For certain file sizes, it is not even possible to use method 1, as computers have a buffer limit. If the file was e.g. 2 Gb, the code would throw an error if a stream is not used, as this limit was surpassed. 

## Piping

Notice how the `pipe()` method was applied in the following way:

```js
source.pipe(destination);
```

Where `source` is a readable stream and `destination` is a writable stream.

It is possible to chain this method:

```js
a.pipe(b).pipe(c).pipe(d);
```

Where `b` and `c` have to be duplexes, since that is the same as

```js
a.pipe(b);
b.pipe(c);
c.pipe(d);
```

This is analogous to the Unix notation of `a | b | c | d`.

It is also possible to combine events if we need to. For example, it would be possible to log to the console a message when the piping line is finished:

```js
a.pipe(b).pipe(c).on('finish', () => console.log('Finished!'));
```

Events can be inserted anywhere in the piping chain:

```js
a.pipe(b)
 .on('data', () => console.log('Another chunk!'))
 .pipe(c)
```

The above code could have also been done with a customized stream defined before the pipeline:

```js
const progress = new Transform({
  transform(chunk, encoding, cb) {
    process.stdout.write('Another chunk.');
    cb(null, chunk); // equivalent to this.push(chunk)
  }
})

a.pipe(b)
 .pipe(progress)
 .pipe(c)
```



## Common Events

| Readable                                                     | Writable                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| data<br />Emitted whenever the stream passes a chunk of data to the consumer | drain<br />Signal that the writable stream can receive more data |
| end<br />Emitted when there is no more data to be consumed from the stream | finish<br />Emitted when all the data has been flushed to the underlying system |
| error                                                        | error                                                        |
| close                                                        | close                                                        |
| readable                                                     | pipe/unpipe                                                  |

## Common Methods

| Readable              | Writable           |
| --------------------- | ------------------ |
| pipe, unpipe          | write              |
| read, unshift, resume | end                |
| pause, isPaused       | cork, uncork       |
| setEncoding           | setDefaultEncoding |



## Types of streams



### Readable

e.g. `fs.createReadStream`

Have 2 main modes that affect the way we consume them (**paused** and **flowing**).

+ `.read()`  is used to consume paused readable streams
+ EventListeners are used to consume flowing streams, since data is continuously flowing (that's why data can actually be lost if there are no consumers to handle it.

```js
const { Readable } = require('stream');

const inStream = new Readable();

inStream.push('1 2 3 4 5 6 7 8 9 10');
inStream.push(null); // signals that the stream has no more data

inStream.pipe(process.stdout);
```

This is not very efficient, since we are pushing all the data to the stream before piping it to `process.stdout`. Best would be to push it gradually:

```js
const inStream = new Readable({
  read() {
    this.push(this.number++ + ' ');
    if(this.number > 10) this.push(null)
  }
})

inStream.number = 1;
```

## 

### Writable 

e.g. `fs.createWriteStream`

```js
const { Writable } = require('stream');

const outStream = new Writable({
  write(chunk, encoding, cb) {
    console.log(chunk.toString());
    cb();
  }
});

process.stdin.pipe(outStream);
```

This example outputs everything sent via `process.stdin`. It's pretty much the same as doing

```js
process.stdin.pipe(process.stdout);
```



### Duplex

e.g. `net.Socket`

Both readable and writable e.g. socket.

```js
const { Duplex } = require('stream')

const duplexStream = new Duplex({
  write(chunk, encoding, cb) {
    console.log(chunk.toString());
    cb();
  },
  read() {
    if (this.number > 10) {
      this.push(null);
      return;
    }
    this.push(this.number++ + "\n")
  }
})

duplexStream.number = 1;

process.stdin.pipe(duplexStream).pipe(process.stdout);
```

This example creates the stream (`write`) and immediately reads from it (`read`). This is a useless stream. It is just meant to prove that both these methods are possible to be used within the same constructor.



### Transform

e.g. `zlib.createGzip`

Has the capacity to modify chunks as it reads them. It differs from Duplex as a Duplex has to read

```js
const { Transform } = require('stream');

const upperCase = new Transform({
  transform(chunk, encoding, cb) {
    this.push(chunk.toString().toUpperCase());
    cb();
  }
})

process.stdin.pipe(upperCase).pipe(process.stdout);
```

A more useful example would be:

```js
const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

fs.createReadStrem(file)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(file + '.gz'));
```

Which compresses a given file. It's possible to get the uncompressed version of the file by doing in the terminal `gunzip file_name.gz`

# Clusters and Child Processes

It's possible to run multiple threads at the same time.

There are 3 main ways to scale an application:

+ Clone it multiple times and have each instance handle a different part of the workload.
+ Decomposing (i.e. microservices) based on functionality.
+ Splitting into multiple instances that handle different data (data partitioning) - based on country, language, etc.

## Cloning

Cloning is done by creating a child process. There are 4 different ways to create a child process:

+ spawn
+ fork
+ exec
+ execFile

All of these have synchronous blocking versions.

### spawn( )

Launches the command in a new process.

```js
const { spawn } = require('child_process');

const child = spawn('pwd', []); // extra arguments are included in the array

child.stdout.on('data', data => console.log(data.toString())); // if success
child.stderr.on('data', data => console.log(data.toString())); // if error
child.stdout.on('exit', (code, signal) => console.log(code, signal));
```

Other `child` events:

+ disconnect - triggered when the parent manually emits it 
+ error - when the process couldn't be spawned
+ message - triggered when the child uses `process.send`. It's how parent/child communicate.
+ close - emitted when the standard I/O stream of a child process get closed



The following example counts how many  lines, words and characters are in `process.stdin`:

```js
const { spawn } = require('child_process');

const child = spawn('wc');

process.stdin.pipe(child.stdin);

child.stdout.on('data', data => console.log(data.toString()));
```

Note: to terminate the code, type Ctrl + C.

Yet another note: The child's `stdin` is actually a writable stream, contrary to the `process`'s.

Multiple processes can be piped:

```js
const { spawn } = require('child_process');

const find_files = spawn('find', ['.', '-type', 'f']);
const line_count = spawn('wc', ['-l']);

find_files.stdout.pipe(line_count.stdin);

line_count.stdout.on('data', () => console.log(`There are ${data} files in this directory.`))
```

It's possible to make the child inherit stdio from its parent:

```js
const { spawn } = require('child_process');

const child = spawn('find', ['.', '-type', 'f'], {
  stdio: 'inherit'
})
```

Using the shell syntax, instead of an array to pass the extra arguments:

```js
const { spawn } = require('child_process');

const child = spawn('find . -type f', {
  stdio: 'inherit',
  shell: true
})
```

Notice spawn doesn't buffer the data, as exec does.

Other options that can be specified:

```js
cwd: '/Users'
```

Changes the current working directory where the process will be executed.

```js
const child = spawn('echo $ANSWER', {
  env: { ANSWER: 43 }
})
```

Specifies environment variables that will be visible to the new process. Defaults to `process.env`.

It's possible to keep a child running independently of its parent. For that, it's necessary to set 2 options:

```js
const child = spawn('node', [ 'timer.js' ], {
  detached: true,
  stdio: 'ignore'
})

child.unref();
```

```js
// timer.js
setTimeout(() => {
  // keeps running during 20 seconds, even if parent is promptly unref'ed
}, 20_000);
```

The execution of the parent will trigger its child to execute and it will promply terminate. However, the child will continue its execution.

### exec( )

Similar to `spawn`, with 2 major differences:

+ creates a shell (which makes it less efficient). It's kind of a terminal execution context, where we can pass as an input the native terminal commands (without the need to use an array with extra commands)
+ buffers the command's generated output to a callback function. Adequate if the data returned by the command isn't big, since all the buffer will be returned.

```js
const { exec } = require('child_process');

exec('find . -type | wc -l', (err, stdout, stderr) => console.log(stdout));
```

### execFile( )

Same as `exec` without creating a shell.

### fork ( )

Spawn variation.

```js
const { fork } = require('child_process');

const forked = fork('child.js');

forked.on('message', msg => console.log(msg));
forked.send('From parent to child' });
```

```js
// child.js
process.on('message', msg => console.log(msg));
process.send('From child to parent');
```

A more practical example is assigning a heavy computational task to a forked element so that future requests don't have to await for that long process to finish:

```js
const http = require('http');
const { fork } = require('child_process');

const server = http.createServer();

server.on('request', (req, res) => {
  res.write(`\n${req.url}\n`)
  if (req.url == '/heavy-task') {
    const another_process = fork('child.js');
    another_process.send('go!');
    another_process.on('message', sum => res.end(`Sum is ${sum}`));
  } else {
    res.end('That was easy.')
  }
})

server.listen('80');
```

```js
// heavy_task.js
process.on('message', () => process.send(2n ** 1500000n + '')); // n stands for bigint
```

## The Cluster Module

Clustering allows dividing the workload into several processes. If the computer has more than 1 CPU, might as well use the others. One remarkable disadvantage with this is that we no longer have the possibility to cache things in memory, since every worker process has its own memory space. That means that if we are using a cluster setup and want to cache stuff, there should be a dedicated entity responsible to storing all the data. That entity can be a separate database server, a server like redis (in memory cache) or even a dedicated node process with a read/write API with which all other workers communicate with. This doesn't have necessarily to be a disadvantage, since having an independent database is kind of a requirement to have a scalable app. Stateful communication in a cluster setup can also be an issue, since the communication is not guaranteed to be with the same worker. Example: authenticating users: the request to authenticate goes to the master (the load balencer) which forwards it to a worker. When the user makes another request, eventually the master will forward it to another worker, in which the user isn't authenticated. Besides using a common database, a less invasive solution for the code may be using a Sticky Load Balancing, which is nothing more than the master keeping track of to which workers the users were sent for in the first time so that they are sent again to the same ones. This will, naturally, be against the normal distributed clustering behaviour.

```js
// server.js
const http = require('http');
const pid = process.pid; // pid = process id - just to verify that it's running diff processes

http.createServer((req, res) => res.end(`Handled by process ${pid}`))
		.listen(80, () => console.log(`Started process ${pid}`));
```

Create a cluster to clone this server into multiple workers:

```js
// cluster.js
const cluster = require('cluster')
const os = require('os')

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`Forking for ${cpus} CPUs`)
  
  for (let i = 0; i < cpus; i++) cluster.fork();
} else require('./server');
```

When running `cluster.js`, the cluster module will be useful as it will be able to identify whether the current file is being loaded as the master file or not. The first time of execution is done by the master process => `isMaster == true`. In this case, we fork as many workers as there are CPUs in the computer running the script. When the fork is created, the very same file is run again, with one single difference: `isMaster == false`. That's when a new server is defined by executing `server.js`. Note that each server is completely independent from all the others (has an independent event loop, etc.).

The master process has access to each worker by the object `cluster.workers`. Has their relation is the previously seen `fork`ed relation, it's possible to send/receive messages to each worker. If we'd want to send a message to each one:

```js
Object.values(cluster.workers).forEach(worker => worker.send(`Hello worker ${worker.id}!`));
```

This message can be received by the worker by listening to the main `process` event `message`:

```js
process.on('message', msg => console.log(msg));
```



One of the big advantages of running multiple workers is the fact that the more services there are, the less likely it is that a request is going to fail in case a server is down. If we only have one server running and the server crashes for some reason, it will have to reinitialise. Even if this reinitialization is automated (which it should be), there's always gonna be some down time. The reinitialization of a random crashed server when multiple are running :

```js
// server.js

// ...

setTimeout(() => process.exit(1), Math.random() * 10_000); // process exist on a random time
```

```js
// cluster.js

if (cluster.isMaster) {
  // ...
  
  cluster.on('exit', (worker, code, signal) => {
    if (code != 0 && !worker.exitedAfterDisconnect) { // *
      console.log(`Worker ${worker.id} crashed. Starting a new one...`);
      cluster.fork();
    }
  })
}
```

\* Assures that the worker indeed crashed and wasn't manually killed by the master. The master may have code to evaluate certain factors (e.g. memory use) and  kill some workers if certain thresholds are reached. It's possible to do so by invoking `cluster.kill` or `cluster.disconnect`. These methods will set the argument `worker` variable `exitedAfterDisconnect` to true.

To check how many requests the server wasn't able to serve we can execute the apache benchmark command

```bash
ab -c200 -t10 http://localhost:80/
```

which means open this webpage (localhost here) 50.000 thousand times (default i.e. `-n 50000`) with a concurrency of 200 and a 10s to spend for the benchmarking.

### Restart workers manually (new code deploy)

It's ideal to restart the workers one by one to allow other workers to continue to serve requests while one worker is being restarted. A way this can be done is to listen to user signals. `SIGUSR2` is used because`SIGUSR1` is used by node for the debugger. This signal can be triggered by using the `kill` command:

```bash
kill -SIGUSR2 <xxx>
```

where `<xxx>` is the process id number, PID (`process.pid`). Notice that this command doesn't kill the process, but rather sends a signal to the process stream.

Windows doesn't support process signals so another approach has to be taken (e.g. standard input or socket input, or monitor the existence of a process PID and watch for a remove event). However, it is recommended to use Linux servers on a production environment instead of Windows - not because of Node itself (which is stable on Windows) but because of other tools that are unstable there. 

```js
if (cluster.isMaster) {
  // ...
 
  process.on('SIGUSR2', () => {
    const workers = Object.values(cluster.worker); // array with all workers
    
    const restartWoker = worker_nr => {
      const worker = workers[worker_nr];
      if (!worker) return; // stops the recursive function
      
      worker.on('exit', () => { // will be triggered when the worker disconnects
        
        // in case the disconnection wasn't due to the user call:
        if (!worker.exitedAfterDisconnect) return; 
        
        // exited worker.process.pid
        cluster.fork().on('listening', () => restartWoker( worker_nr + 1 )); // *
        
      })
      
      worker.disconnect();
    }
    
    restartWorker(0); // starts the recursive function on the first worker
  })
}
```

\* Since `fork( )` is asynchronous, we have to wait until it starts listening i.e. is connect to restart the new worker.



### Libraries to use

[`pm2`](https://github.com/Unitech/pm2) makes all the work with cluster easier.

# Networking

The Open Systems Interconnection model (OSI model) is a conceptual model that characterises and standardises the communication functions of a telecommunication or computing system without regard to its underlying internal structure and technology. Its goal is the interoperability of diverse communication systems with standard communication protocols. The model partitions a communication system into abstraction layers.

A protocol is a set of rules that layers use to communicate with each other.

## OSI model

The Open Systems Interconnection model (OSI model) is a conceptual model that characterises and standardises the communication functions of a telecommunication or computing system without regard to its underlying internal structure and technology. Its goal is the interoperability of diverse communication systems with standard communication protocols. The model partitions a communication system into abstraction layers. The original version of the model had seven layers.

The software layer (aka upper layer) is comprised of layers 7, 6 and 5 whereas the hardware layer (aka lower layer) of layers 3, 2 and 1. 

## 7 - Application Layer (message)

The UI, where users interact. Provides the services/protocols that work with the data the user is exchanging.

+ HTTP - HyperText Transfer Protocol Browse web pages
+ HTTPS - HTTP Secure Browse web pages with encryption
+ FTP - File Transfer Protocol
+ SMTP - Simple Mail Transport Protocol - send and receive emails
+ IMAP, POP3 - load emails from inbox
+ DNS - Domain Name Server
+ Telnet
+ Netcat
+ SSH

## 6 - Presentation Layer (message)

The presentation/syntax layer translates data between the application layer and the network format.

+ Encrypts/decrypts data
+ Ensure the data is accurate, well-defined and in a standardized format
+ Character/string conversion
+ Data compression
+ Graphic handling

## 5 - Session Layer (message)

Maintains distinction between data of separate apps. Provides dialog control between hosts.

## 4 - Transport Layer (message)

Provides end-to-end connection. Provides reliable or unreliable delivery and flow control.

+ TCP - Transmission Control Protocol - **Transport** protocol - responsible for ensuring data arrives intact or requesting retransmission if not (TCP/IP - "TCP via IP", TCP being the transport protocol that uses IP as the networking protocol)
+ UDP - **Transport** protocol - User Diagram Protocol - used for info that requires no response (mainly for streaming)

## 3 - Network Layer (packets)

Provides Logical Addressing. Provides Path determination using logical addressing.

+ IP - Internet Protocol - **Networking** protocol - responsible for getting data from one machine to another over the internet

## 2 - Data Link Layer (frames)

Provides media access and physical addressing.

## 1 - Physical Layer (bits)

Converts the data digital bits into electrical, radio, or optical signals so that it can be transferred over the medium.



+ IRC - chat
+ SNMP - Simple Network Management Protocol - used to collect system information from a remote computer
+ Telnet - used to perform commands on a remote computer
+ SSH - remote shell over an encrypted connection
+ SSL - low-level secure data transfer (used by HTTPS)

### Protocol Stack

|                 |                                        | Layer             |
| --------------- | -------------------------------------- | ----------------- |
| App             | Network service e.g. DNS or HTTP       | Application layer |
| Transport Layer | exampes: TCP or UDP                    | 4                 |
| Network Layer   | IP address                             | 3                 |
| Data Link Layer | Ethernet/MAC/Physical/Hardware address | 2                 |
| Physical Layer  | Bits sent over the network             | 1                 |



### SSH

To check if there is any set of ssh keys in the current computer:

```bash
ls -la ~/.ssh
```

Create ssh keys:

```bash
ssh-keygen -t rsa -b 2096 -C "some comment"
```

+ `-t` type
+ `-b`  bits - how many

After confirming the defaults asked, 2 files are created in the current machine, under `~/.ssh`: `id_rsa` and `id_rsa.pub`. The former is ours and is not supposed to be shared with anyone. The latter is meant to be shared with servers we want to communicate with e.g. GitHub or Heroku (the text inside it is the key to be pasted in these platforms).

To start the ssh agent:

```bash
eval "$(ssh-agent -s)" # without quotes on windows
```

Register the file:

```bash
ssh-add -K ~/.ssh/id_rsa # don't include the K flag on windows or linux
```

To check our communication with GitHub:

```bash
ssh -T git@github.com
```

To establish a communication with Heroku:

```bash
heroku login
heroku keys:add

heroku create tiago-app-name # creates a heroku app called tiago-app-name
```

To complete the functionality with Heroku:

```js
const port = process.port.PORT || 8080;
```

```json
// package.json
"scripts": {
  "start": "node scr/app.js"
}
```

And, finally, commit our last git changes to the Heroku repository:

```bash
git push heroku master
```



## Different kinds of connection

![comparison of modem with router and gateway combo](https://www.tech21century.com/wp-content/uploads/2019/02/modem-router-gateway.png)

[Source](https://www.tech21century.com/modem-vs-router-vs-gateway/)

### Modem

The **mo**dulator - **dem**odulator is the border device that translate the signals exchanged between the ISP and the LAN devices. Depending on the ISP being paid for, there are 3  ISP - modem connectors:

- Coaxial Cable
- DSL (Asymmetric Digital Subscriber Line) - uses the same wires as a regular telephone line.
- Fiber Optic Cable

# Encryption

`npm i bcryptjs`

```js
const myFunction = async () => {
  const pass = 'password1';
  const hashedPass = await bcrypt.hash(pass, 8); // 8 - good security/speed compromise
  
  console.log(pass, hashedPass); // ... password1, asdgkhasodgnaosidfgoaskdhaslkd
  
  const isMatch = await bcrypt.compare('password1', hashedPass);
  console.log(isMatch); // ... true
}
myFunction();
```



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



---

**Sources**:

[Advanced Node.js, by Samer Buna](https://app.pluralsight.com/courses/0d10b83d-4a1c-487e-9da1-e4cbf1bce8ab/table-of-contents)

[jscomplete/advanced-nodejs](https://github.com/jscomplete/advanced-nodejs)

