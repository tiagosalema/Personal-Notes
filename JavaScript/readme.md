<h1 style="position: absolute; right:0px">Javascript</h1>
# Asynchronous

## Callbacks

```js
let x = 0;

const asyncFunc = ( some, arguments, callback ) => {
  setTimeout( () => callback('It has arrived!'), 1000 )
}

asyncFunc( 'some', 'arguments', data => {
	x = data;
});

console.log(x); // 0
setTimeout( () => console.log(x), 1001); // It has arrived!
```

As it's visible in the code above, `asyncFunc` is providing a callback funcion as its 3rd argument. The interesting thing is that this function, when called i.e. 1 second later, is going to be executed in the context where it was defined, thus reassigning `x` to `It has arrived!`.

The problem with callbacks is what is known to be as the callback hell. As a way to fight this, there come promises!

## Promises

```js
const add = (a, b) => {
  return new Promise( (resolve, reject) => {
    setTimeout( () => resolve(a + b), 2000 );
  });
}
```

```js
add(1, 3)
  .then( sum => console.log(sum) )
	.catch(...);
// ... 2 seconds ...
// 4
```

They can also result in a nested look. If we want to call a function after the first async function finishes:

```js
add(1, 3).then( sum => {
  console.log(sum);
	add(sum, 10)
    .then( sum2 => console.log(sum2) )
    .catch(...);
}).catch(...);
// ... 2 seconds later ...
// 4
// ... two seconds later ...
// 14
```

To prevent this, we can chain them:

```js
add(1, 3)
  .then( sum => {
    console.log(sum);
	  return add(sum, 10); // we have to return a Promise for a second then to be available
  }).then( sum2 => console.log(sum2) )
	.catch(...);
// idem
```

## Async / await

(a more indepth explanation of how async/await works is given in the Generators section)

Although it's easier to work with promises than callbacks, promises can still arguably get quite messy. For that, async/await to the rescue.

Basically, async is a keyword used before the name of a function that will automatically make it return a promise:

```js
const someFunction = async () => 10; // Promise( <resolved> : 10 )
```

Which means I can call the `then` on this function:

```js
someFunction().then( x => console.log(x) ); // 10
```

Inside a function prefixed by `async` it is possible to assign asynchronous requests to variables as if they were synchronous:

```js
const someFunction = async () => {
  const sum1 = await add(1, 3);
  const sum2 = await add(sum1, 5); // since it has sum1, it will wait for it to have a number
  return sum2; // what is returned to the then method 
}
someFunction().then( x => console.log(x) );
// ... four seconds later ...
// 9
```

Note that the particularity of async/await is that it requires the implementation of a function to return asynchronously what we want from it.

The keyword `await` can be at the start of the line if we don't need a returned value from it.

Another thing to keep in mind is that the `async` keyword actually changes the returned value of the function: from whatever it was to a promise. Keep this in mind if some returned value of a function is being used in the code.

# Spread ...

Transforms an array into its singularities

```javascript
const array = [1,2,3];

console.log(array); // Array(3) [ 1, 2, 3 ]
console.log(...array); // 1 2 3
```

If we have function accepting multiple inputs, we can now use a single array as input:

```javascript
function sum(x,y) {
    return x+y;
}

const array = [1,2];
sum(...array); // 3
```

We can also add more elements to the array:

```javascript
const newArray = [...array, 3];
console.log(...newArray); // 1 2 3
```

## Cloning objects with spread

If make a clone of an object (arrays included) as we do for primitive variables, what we are actually doing is creating another variable that will reference the original one. As a consequence, if we change a property of the new object, it will also change that property on the new one. One way to counter this is to by copying using the spread operator:

```js
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };
// Object { foo: "baz", x: 42, y: 13 }
```

As it is visible in the example, equal properties will be overridden. 
There is a problem with this method, though! if there are nested properties within the object, they are going to be shallow copied (instead of deep copied). A solution to this is to do:

```javascript
const obj1 = {
  prop: {
    prop1: 1
  }
}
const obj2 = {...obj1} // this will override obj1 if obj2.prop = whatever
const obj3 = JSON.parse(JSON.stringify(obj1)) // this won't
```

What we are doing here is to convert the whole object into a string and parse it then. But there is still an issue with this method. This method is uncappable of cloning everything from the original object. It just copies the key-value pairs, leaving behind functions, Maps, Sets, RegExps, Dates, ArrayBuffers, etc.

## Computed property name

It's possible to name the properties of an object by the value of a variable:

```js
const myName = 'tiago';
const idades = {
    [myName]: 27,				// myName -> 'tiago'
    [myName + '2']: 28			// myName + '2' -> tiago2
}

console.log(idades.tiago); // 27
console.log(idades.tiago2); // 28
```

It is not possible to use inside the brackets a period (e.g. `[person.name]`). For such a case, use the `get` module from lodash:  `_.get(person, name)`.



# Classes

```javascript
class Person {
    constructor(var1, var2) {
        this.name = var1;
        this.age = var2;
    }
    
    method1() {...}
    method2() {...}
}
               
class Teacher extends Person {
    constructor(var1, var2, var3) {
        super(var1, var2);
        this.degree = var3;
    }
    
    method3() {...}
}
               
const person = new Person('Tiago', 27, 'MSc');
```

## Constructor and Prototype

A constructor doesn't have to be defined inside a class. It can be simply defined as a function:

```javascript
function Person(name,age) {
  this.name = name;
  this.age = age;
  this.species = 'human';
}
```

if a new person is created, i.e. 

```javascript
let tiago = new Person('Tiago', 28)
```

it is said that `tiago` has 2 own properties: `name` and `age` e.g. `tiago.hasOwnProperty("name")` is true. It is not efficient to set properties other than their own in a constructor (too many duplicates), like the `species` property. For that, one can define the species in the prototype of `Person` i.e. `Person.prototype.species = 'human'`. Logically, it is possible to add more than one prototype at once:

```javascript
Person.prototype = {
  species: 'human',
  describe() { // this is a method
    console.log('My name is ' + this.name);
  }
}
```

These are 2 types of properties: **own** and **prototype** properties.

Every time an instance of an object is created by utilizing the `new` keyword, a special property is created: the `constructor`property, whose name will be the name of the function (`tiago.constructor === Person` is true). The downside of creating a prototype by hand is that it erases the `constructor` property, since it was on the prototype that the constructor was created in the first place. To fix this, whenever a prototype is manually set to a new object, remember to define the `constructor` property:

```javascript
Person.prototype = {
  constructor: Person,
  species: 'human',
  describe() { // this is a method
    console.log('My name is ' + this.name);
  }
}
```

## Static

Static methods are called on the class itself rather than an instance of it, created with the keyword `new`. It's not possible to call static methods in their instances. They are useful to create utility functions.

```javascript
class myClass {
  static someMethod() {
    return 'Hello world!';
  }
}

console.log(myClass.someMethod());
```





## 	



+++

# Hoist

The names of all the declared variables are hoisted to their scope. In other words, everything that is `var something = ...` will be broken into 2 parts behind the scenes:

+ `var something;`, which will be hoisted to the beginning of the code (it is undefined, but the variable exists); and 
+ `something = ...`, located where the variable was written.

That's the reason why I can invoke functions that just later are defined in the following way `function funcao() {}` but they cannot be called if they are defined in the form of `var funcao = function() {}`.



------

# Sets

Build an array with the input they are given. If there are duplicates, only one is inserted:

```javascript
let set1 = new Set([1,2,2,2,2,3]); // set1 = [1,2,3]
```



+++

# HTTP requests

Is is possible to access a JSON by 3 main means:

- `fetch()` API, which is implemented in all browsers:

  ```javascript
  // GET
  fetch('', { method: 'get' } )		// returns the response for the request
      .then(res => res.json()) 		// converts it to json
      .then(data => this.setState({data}) )		// only way to get data is with then
      .catch(err => console.log(err) )			 // only way to get errors is with catch
  
  // POST
  const data = ...
  fetch('', { method: 'POST', body: data } )
  ```

- `axios` library

  ```javascript
  import axios from 'axios';
  
  // GET
  axios
    .get('')
    .then(res => this.setState({movies: res.data}) )
    .catch(err => console.log(err) )
  
  // POST
  axios
    .post('', data)
    .then(res => console.log(res))
  
  // CREATE
  axios.create({ baseURL: "..." })
  
  // ASYNC/AWAIT
  async getUser = () => {
    try {
      const res = await axios.get('...');
    } catch (err) {
      console.error(err);
    }
  }
  ```

  To specify a query after the url, it is not strictly necessary to write it within the string i.e. `".../user?ID=123"`. It can be done instead: `".../user", { params: { ID: 123 } }`. It is only necessary to write `params:{}` if it is a GET method. Otherwise it can be specified the object with the parameters directly after the string.

- jQuerry AJAX

# Generators

Generators are functions that can return in the middle of their execution context and, when called again, execute from the point they returned.

The differences between generators and functions are:

|                          | Function a       |           | Generators *a     |                        |
| ------------------------ | ---------------- | --------- | ----------------- | ---------------------- |
| When invoked, start from | `return`         | beginning | `yield`           | from where it returned |
| Assignment               | not necessary    |           | `b = a()`         |                        |
| Execution                | `a()`            |           | `b.next()`        |                        |
| Definition               | `function a(){}` |           | `function *a(){}` |                        |

Note that `b` has a method in it called `next`. This means that the Generator generates an object. This object is what is formally called an **Iterator**. Its keys are:

1. `[[GeneratorLocation]]` - Symbol `x:y`, where `x` is the reference to `*a` and `y` its current execution line. If clicked in it in the console, it will jump to the line in the `Sources` tab.
2. `[[GeneratorStatus]]` string that can be either
	+ `"suspended"` or
	+ `"closed"`
3. `[[GeneratorFunction]]` - `*a()`
4. `[[GeneratorReceiver]]` - object `Window`
5. `[[Scopes]]` - array with 3 objects
   + `Local` - local memory i.e. all the variables and their values in the function
   + `Script` - contains all the objects generated using `*a`. In this case, `{ b: a }`
   + `Global` - same as `[[GeneratorReceiver]]` - why? Good question.

A peculiarity with generators is the fact that they not only start from the line they returned, but also from the exact place where `yield` is located. This means that

```javascript
function *a(i) {
  yield "hello";
  let b = yield "world";
  yield b;
  yield i;
}
const gen = a(1);
gen.next(); // "hello"
gen.next(); // "world"
gen.next("!"); // "!"    <------
gent.next(); // 1
gent.next(); // (*)
```

Notes about this script:

+ In the line where the arrow is, a value has to be sent so that b is assigned a value, which is going to be yielded on the next line.
+ the returned values aren't actually values, but an object with 2 keys:
  1. `value`
  2. `done`, which is always `false`, except on the very last line `(*)`, for which value will be `undefined`



## 	async / await

The `next` method can be used inside a `then`. We should remember that the functions that are inserted inside `then` are going to be injected inside the hidden `[[onFulfillment]]` array of the promise object returned from `fetch`. The functions inside this array will be auto-triggered once another value of the promise object is updated: `value`. If one of the functions is `next`, we'll be back in the synchronous code even after the global execution context has finished. We'll be on a pseudo-synchronized code. Let's see it in action:

```js
const doWhenDataReceived = value => returnNextElement.next(value);
function* createFlow() {
  const data = yield fetch("...");
  console.log(data);
}
const returnNextElement = createFlow();
const futureData = returnNextElement.next();

futureData.then(doWhenDataReceived);
```

From the need to prettify this script arose the concept of `async`/`await`:

```js
async function createFlow() {
  console.log("Me first!");
  const data = await fetch("...");
  console.log(data);
}
createFlow();
console.log("Me second!")
```

+ `async` represents a generator that self declared into an iterator
+ `await` is equivalent to `yield`. Once triggered, the execution context will be abandoned. The execution will come back to this context once the promise updates its status.

# Useful libraries

## Lodash

It's handy to save data in an array and convert it to an object whenever we need to work with it. To do so, there's a useful function in lodash: `mapKeys`, that accepts 2 arguments: 1st is the array to put into an object and the 2nd is the key we want for each element.

```const data = [
const data = 
[
  { id: 1, name: "Tiago" },
	{ id: 2, name: "Zé" }
]
```

`_.mapKeys(data,"id")` will output the object

```{
{
	1: {id: 1, name:"Tiago"},
	2: {id: 2, name: "Zé"}
}
```

# Language paradigms (not just in JS)

## Functional programming



### Anonymous functions and concise lambda syntax

sdgfsdgv



### Closures

When a function is defined inside another function, it has access to the variable bindings in the outer function, even after the outer function exits.



### Higher-order functions

A higher-order function is a function that takes a function (or many) as an argument **or** returns a function as a result

#### 	Currying

A curried function is a restriction of higher-order functions, since they only return a function as result (and not necessarily receive).
Their thing is the fact that they take multiple arguments, one at a time. Given a function with 3 parameters, the curried version will take one argument and return a function that takes the next argument, which returns a function that takes the third argument. The last function returns the result of applying the function to all of its arguments.

```javascript
// add = a => b => Number
const add = a => b => a + b;

const result = add(2)(3); // 5
```

In JavaScript, the parentheses `()` after the function reference triggers function invocation. When a function returns another function, the returned function can be immediately invoked by adding an extra set of parentheses. The add function takes one argument, `a`, and then *returns a new function,* which then takes `b` returns the sum of `a` and `b`. 

What's the point? Instead of assigning `a` and `b` in a shot, we can assign just `a` and use `b` later:

```javascript
const inc1 = add(1);
const inc2 = add(2);
inc1(3); // 4
inc2(3); // 5
```

The returned functions `inc1` and `inc2` are just specialized (read *curried*) versions of the more general (read *normal*) `add()` function.

#### 	Composition

It's possible to compose functions:

```javascript
const g = n => n + 1;
const f = n => n * 2;
const h = compose(f, g); // algebratically speaking: f( g(x) )

h(20); // 42
```

#### 	Partial application

...

## Object Oriented Programming (OOP)

The goal of OOP is to provide all the functionality of something inside the same container. For example, if I have a user, I want all the things that are possible to do with that user within the user object. When I press `.`, all the properties will be rightly available. The concept of prototype is very important in OOP. Prototyping enables the creation of e.g. a method that is shared between different objects, without the need of copying it. They share the reference to the same method, saving the memory that would otherwise be wasted to allocate the same very functionality. The basic way to achieve this is by creating all the functionality in one place and bringing it to the object:

```js
function user(name, score) {
  let newUser = Object.create(userFunctionStore); 						// *
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

let userFuntionStore = {
  incrememnt: function() { this.score++; },
  login: function() { console.log("You are logged in!"); }
}

let user1 = user("Will", 3);
let user2 = user("Time", 5);
user1.increment();
```

The advantage of creating a new object by doing `Object.create(someObj)` instead of simply `{}` is that the former will store all the content of the object given as an argument as the `__proto__` of the created object, so that every time JavaScript doesn't find a property in the new object, it doesn't panic and goes search for it there before throwing an error. The `__proto__` **property** points to the object **Prototype**. This is the basis of inheritance.

### this

The `this` keyword in `increment` is very important here, since it is what gives versatility to the objects. It will translate into the object that is calling it:

```js
user1.increment(); // this = user1
user2.increment(); // this = user2
```

Note: `this` **always** refers to the object to the exact left of `ImThis.methodWithThis` 

### new

The previous script can be rewritten in the following way:

```js
function User(name, score) {
  this.name = name;
  this.score = score;
}
User.prototype.increment = function() { this.score++; };
User.prototype.login = function() { console.log("YOu are logged in!") }

let user1 = new user("Will", 3);
```

Here, we are assigning to the function `User` both the characteristics of a function and the characteristics of an object. This means that I can both execute it by placing `()` in front of `User` or get one of its properties by inserting a `.` instead. That's because, in JavaScript, **functions are both functions and objects at the same time**.

The `new` keyword does many things under the hood:

+ creates a variable called `this` in `User` local memory and assigns it to `Object.new()` i.e.

  ```js
  this = Object.new() // this = {}
  ```

+ Creates a bond with the prototype of the object (every single function in JavaScript is born with a prototype object `function.prototype`, so does `User` i.e. `User.protoype = {}`)

  ```js
  this = Object.new(User.prototype) // this = { __proto__: User.prototype }
  ```

+ Returns `this`.

### class (syntactic sugar)

```js
class User {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
  increment = function() { this.score++; };
	login = function() { console.log("YOu are logged in!") }
}

let user1 = new user("Will", 3);
```

This makes it evident that an object can have both properties and functions. The first line of this code will evaluate into the `User` object, which has both a function and an object (which, in turn, has 2 functions):

```js
// output of the previous code
User: {
  constructor: fn,
  prototype: {
    increment: fn,
    login: fn
  }
}
```

+ `constructor` - deals with the User properties
+ `prototype` - deals with the User functionality

The second line of execution will trigger the automation mentioned in the `new` subsection, being that the function is now called `constructor`.

## Imperative programming



# Others

## Tags @param and @return

Only intended to document functions.

### @params

All these 3 are valid:

+ argument name

```js
/**
 * @param firstFunctionInput
 */
```

+ ...with type

```js
/**
 * @param {string} firstFunctionInput
 */
```

+ ...and description

```js
/**
 * @param {string} firstFunctionInput - This is text will be visible when the function will be called
 */
```

If the argument is an object, it is possible to document its properties:

```javascript
/**
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.   
*/
```



## @return

```js
/**
 * @param {number} a
 * @param {number} b
 * @returns {number} Sum of a and b
 */
function sum(a, b) {
    return a + b;
}
```