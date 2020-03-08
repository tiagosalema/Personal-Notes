<h1 style="position: absolute; right:0px">React</h1>



The big advantage of React is the fact that it has a **virtual DOM**, which is a perfect copy of the DOM with the exception that it is much lighter than it because it lacks the necessary functionality to be actually displayed on the screen. This way, the virtual DOM is modified by each task before the real one and it can be then compared with the virtual DOM with no modifications. Only then the differences between these virtual DOMs is applied to the real DOM. Because of that, if the task doesn't do any difference, <u>absolutely no change is made to the DOM</u>.

**Start a react file:**

1. `create-react-app NomeDaPasta` (if it doesn't work, do before `npm i -g create-react-app`)

2. `npm start`

3. install bootstrap: `npm i bootstrap` and import in `index.js`:

   `import 'boostrap/dist/css/bootstrap.css';`



Always start by:

```react
import React from 'react';
import ReactDOM from 'react-dom';
```

`React` is gonna be used to compile JSX into JS (JSX is html embedded in JS).

`ReactDOM` is gonna be used to render the virtual DOM (everything before `ReactDOM.render()`) into the DOM.



# JSX

```jsx
<p className="greet">Hello world</p>
```

behind the scenes, React compiles this JSX to regular JS:

```js
React.createElement(
    "p",
    "greet",
    "Hello world"
);
```

which can, now, be parsed by the browser.

For this reason, it is necessary that the initial tag is the same as the final (otherwise, React wouldn't know what to put in the first entry of `.createElement`). A workaround is to involve the JSX in a `<div></div>`. The inconvenience is that this div may be useless in the html, for which case one can use `<React.Fragment></React.Fragment>` instead.



Self closing tags have to be closed in jsx: `/> `  (it's not optional, like in html). Examples:

```react
<img src='...' />
<br />
```



## Styling elements

The `style` attribute of an element in JSX is defined as follows:

```jsx
class x extends Component {
    styles = {
        // properties written in camelCase
        fontSize: 10, // JSX automatically converts 10 to '10px'
        fontWeight: 'bold'
    };

    render() {
        return <span style={this.styles}>Hello</span>
    }
}
```

# Components

Components contain pieces of code that are to be repeatedly used.

A component class is like a factory that builds components, which can only be created by extending an already existing React component:

```react
class MyComponentClass extends React.Component {
    ...
}
```



`React.Component` is a class that represents a raw component - kind of a factory of components. It is also possible to extend an existing component:

```react
class AnotherComponentClass extends MyComponentClass {
    ...
}
```

**extending** is how one **subclass**es an existing class.

Component class variable names must begin with capital letters, such like all other class names, which are written in UpperCamelCase.



The body of the class will include the state object, which consists of all the variables to be used in the class; and the instructions (aka instances) for how to build the component, among which, the render:

```react
class MyComponentClass extends React.Component {
  state = {};
  render() {
    return <h1>Hello world</h1>;
  }
}
```

The component is then applied this way:

 ```react
ReactDOM.render(
	<MyComponentClass />, 
	document.getElementById('app')
);
 ```



To update a variable defined in the state object, it isn't enough to set it with a different value. It is necessary to invoke the `setState` method to this:

```react
state = {
    count: 0
}

handleIncrement = () => {
    this.setState( {count: this.state.count + 1} )
}
```

It is necessary to use an arrow function here because otherwise `this` would result in `undefined`, since it will just be defined when used inside objects.



It is possible to add properties to `<MyComponentClass />` like so:

```react
<MyComponentClass key={.} prop1={.} prop2={.} ... />
```

and these properties can be used freely. If no value is assigned to a prop, than it will be equal to true.



## 	Higher Order Components (HOC)

HOC are functions that receive a component and return a pumped version of it.

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

Let's build a HOC:

```react
const randomHOC = WrappedComponent => props => <WrappedComponent {...props} />;
```

The above HOC gets a component as input and delivers another component as output. In this specific case, the enhanced component is no different than the original component, since (i) it receives the same props and (ii) it was injected with no logic. If `props =>` and `{...props}` weren't written, the enhanced component would lose the props of the original component, if there were any.

To inject logic in the HOC:

```react
const randomHOC = WrappedComponent => {
  // some logic goes here
  return props => (   //if WrappedComponent originally receives props, we have to give them again
  	<WrappedComponent {...props} /> // *
  )
}
```

`*` It is here that we add the enhancing things we want to add to the component. We can either give it extra props by doing `<WrappedComponent {...props, extraProp} />` or involve the `WrappedComponent `in a div with a class:

```react
<div className="...">
  <WrappedComponent {...props} />
</div>
```

Add extra props to the original component:

```react
const Button = props => <button onClick={props.increment}>{props.count}</button>;

const withCount = WrappedComponent => class extends Component {
  state = { count: 0 }
	incrementCount = () => this.setState({ count: this.state.count + 1 })
  render() {
    return <WrappedComponent count={this.state.count} increment={this.increment} />
  }
}
const CountButton = withCount(Button);
export default CountButton;
```

Note that the simple Component itself (and not `CountButton`) has available the `props` increment and count, since it was injected by the HOC `withCount`. Another more simple example:

```react
const withProps = Component_0 => () => <Component_0 string="Hello world!" />;

const Component_1 = ({ string }) => <p>{string}</p>;	 // has props.string available

const Component_2 = withProps(Component_1); 					// injects props in Component_1
```

If there are 2 HOC being implemented like so: `with1(with2(Component))`, `with1` is executed before `with2`. Also `with2` is only executed if `with1` passes it in its definition.

### Tips

Sometimes there are props whose function is entirely dealt in a HOC. In those cases, it's of no interest to pass that props down the components tree. For that, we can do the following:

```react
const withLoadingIndicator = Component => ({ isLoading, ...others }) =>
  isLoading
    ? <p>Loading todos ...</p>
    : <Component { ...others } />
```

Here, `isLoading` is being extracted from the props and used for the logic of the HOC. As its only purpose is now fulfilled, there's no need to pass it down the component tree, and just the other props are being passed instead.

# Props

The attributes of a component, or **prop**ertie**s**, can be accessed by functions:

```react
 function Message(props) {
        return <p>Hello {props.text}</p>;
    }
```

or classes:

```react
class Message extends React.Component {
    render(){
        return <p>Hello {this.props.text}</p>;
    }
}
```

Both of which will be rendered this way:

```react
ReactDOM.render(
    <Message text="World" />,
    document.getElementById("root")
)
```
Here, the Message tag has the *text* property, which went as an input to the function/class that defined it. <u>Note the required usage of `this` in the class.</u>

The props can contain JSX, e.g. `<Component title={<h1>Intro</h1>} />`, which will be invoked like:

```react
render() {
	return (
    <Component>
    	{props.title}
        <p>The intro goes like...</p>
    </Component>
  );   
}
```



**All React components must act like pure functions with respect to their props**, i.e. they cannot be changed. State, on the other hand, allows React components to change their output over time.

```react
function pureFunc (a, b) { return a + b; }
function impureFunc (account, amount) { account.total -= amount; }
```

The following are the same:

```react
<MyClass name="Tiago" />
{ MyClass( {name: "Tiago"} ) }
```



## Context

There are some variables that are global to the whole app. It would be cumbersome to keep on passing them all over, from all parents to their children. For that, there is the possibility of using a context, which turns a certain variable into a special word (like props).

```jsx
import * as React from 'react';

// React.createContext accepts a defaultValue as the first param (if another isn't explicited)
export const MyContext = React.createContext(defaultValue); 

class Parent extends React.Component {
  doSomething = (value) => {
    // Do something here with value
  };

  render() {
    const var = "hello world!";
    return (
       // value = {...} will be available in this.props.children
       // MyContext.Provider expects the attribute 'value' (if not given in defaultValue)
       <MyContext.Provider value={{ doSomething: this.doSomething, var }}> 
         {this.props.children}
       </MyContext.Provider>
    );
  }
}

class Child extends React.Component {
  static contextType = MyContext; // necessary where the context is used

  onClick = () => {
    this.context.doSomething(this.props.value); // Child has access to this.context
  };      

  render() {
    return (
      <>
      	<div onClick={this.onClick}>{this.props.value}</div>
      	<
      </>
    );
  }
}
```

```jsx
import { MyContext } from './xxx';

class SomeComponent extends React.Component {
  render() {
    return (
      <Parent>
        <Child value={1} />
        <Child value={2} />
        <MyContext.Consumer>{( {var} ) => <p>{var}</p>}</MyContext.Consumer> 	// has access to var
      </Parent>
    )}
}
```

As seen above, there are 2 ways to make variables / methods available throughout the app:

1. write `static contextType = MyContext;` at the top of the script and access everything through `this.context` (the one mentioned in React documentation)
2. involve whatever in a `Consumer` component.

## 	Containment

There is a special method of `props` called `children`.

If a component is written like `<Component>...</Component>` instead of `<Component />`, the `...` represents the JSX that will be invoked by `props.children`:

```react
function foo(props) {
  return <div>{ props.children }</div>;
}
```

This lets other components pass arbitrary children to them by nesting the JSX:

```react
function WelcomeDialog() {
  return (
    <foo>
      <h1>Welcome</h1>
      <p>some text...</p>
    </foo>
  );
}
```

It is possible to inject children variables to their parent component. For that, instead of `{this.props.children}`, write:

+ if it is only one child:

  ```javascript
  { React.cloneElement(this.props.children, { var: _ }) }
  ```

+ Otherwise:

  ```javascript
  { React.Children.map(this.props.children, child => React.cloneElement( child, { var: _ } )) }
  ```





# State

State allows the definition of properties to the component that are intrinsic to it and, thus, independent. They can be defined either by doing, inside the component:

```react
constructor(props) {
    super(props);
    this.state = {
        
    }
}
```

or, simply:

```react
state = {
    
}
```

The latter is only used if the constructor doesn't have anything else other than `this.class`.

It's important to note that the state cannot have a property assigned to a null value, or it will throw an error whenever that property is used. Instead, the property should have an empty string / object / array;

## 	setState

**The state cannot be changed directly!** This is because React needs 2 versions of a variable to know which elements of the DOM should be updated once an event is called. One of the versions is stored in the state and the other is the one that was changed. The method `setState` assesses this:

```react
componentMethod() {
    this.setState( {variable: ...} );
}
```

Things to note:

* `setState` is a method and, as such, has parenthisis
* it accepts an object as input and/or a optional callback (a function that will be called once the new state was assigned e.g. a `console.log` printing it)
* the object comprises the new pair variable-value and it's written as the state is

If an element is going to be changed, it is then necessary to duplicate it before. If an element inside another (e.g an object inside an array) is going to be changed, it is necessary to duplicate the latter and just then change its value. Next there is an example of the movies array that contains several movies, which are objects. One of the properties of the objects is the `liked` one, which toggles once the mouse is clicked.

```jsx
  handleClick = movie => {
    const movies = [...this.state.movies]; 			// movies array duplicated
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };			// movie object duplicated
    movies[index].liked = !movies[index].liked;		// duplicated object changed
    this.setState({ movies });
  };
```

***Note:** Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state.



```react
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

To fix it, use a second form of `setState()`  that accepts a function rather than an object. That function will  receive the previous state as the first argument, and the props at the  time the update is applied as the second argument:

```react
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

Just imagine that you can never predict what `this.state` is, so might as well just use a function whose first input is unequivocally the state before being modified.

A component may choose to pass its state down as props to its child components:

```react
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

This also works for user-defined components:

```react
<FormattedDate date={this.state.date} />
```

The `FormattedDate` component would receive the `date` in its props and wouldn’t know whether it came from the parent's state, props, or even if it was typed by hand:

```
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

**Challenge:** To understand [this](http://codepen.io/gaearon/pen/zKRqNB?editors=0010) code (or [this one](https://codepen.io/gaearon/pen/zKRGpo?editors=0010), which is simpler).



# Events

[List of events](https://reactjs.org/docs/events.html#supported-events)

```react
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return <a href="#" onClick={ handleClick }> Click me </a>;
}
```

Things to note:

* Events are written in camelCase instead of lowercase, such it is for html
* Likewise, a function is passed as the event handler rather than a string: `onclick="handleClick()"`
* It isn't necessary to initialize the function `()`
* It's not necessary to call an `.addEventListener` to the DOM element. The attribute to the element to be rendered is enough.

[Button ON/OFF](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

# Lists

```react
const numbers = [1, 2, 3, 4, 5];
const list = numbers.map( number => <li>{number}</li> );
ReactDOM.render(
  <ul>{list}</ul>,
  document.getElementById('root')
);
```

Note: because of the way React works, it is necessary to add keys to each item. It is advisable not to use their index as this key, but some key generator instead ([uuid](https://www.npmjs.com/package/uuid) or [shortid](https://www.npmjs.com/package/shortid)). Using their index as a key is only acceptable if the list doesn't change its order.

# Lifecycle methods

The classes extended from React.Components have built-in methods that are useful to be used. These special methods are called lifecycle methods. The `constructor()` and `render()` methods are 2 examples of lifecycles, being the latter the only one that must be defined in a class. This method will be called each time an update happens.

Other examples of lifecycle methods:

## 	componentDidMount()

Where it is particularly useful to make AJAX calls to get data from the server and then update the state with `this.setState`. Once the state is update the component will re-render. Also a good place to attach any even listeners, i.e. `document.addEventListener("keydown",this.handleKeyPress)`. It's good practice to remove these event listeners before the component unmounts, i.e. in `componentWillUnmount`: `document.removeEventListener("keydown",this.handleKeyPress)`.
It is invoked immediately after a component is mounted (inserted into the tree) i.e. after the `render()` method. This is useful, for example, to update the state of the class:

```jsx
componentDidMount() {
    // AJAX call
    this.setState( {value: this.state.value + 1} )
}
```

which may be also written in the following way:

```JSX
componentDidMount()
    this.setState( (prevState, props) => {
        return {value: prevState.value + 1}
    })
}
```



## componentDidUpdate()

Keeps in memory what the values of `props` and `state` of the component were in the variables `prevProps` and `prevState`, respectively. Particularly useful to know if an AJAX call should be done or not (if a particular value didn't change, it may not be of interest to make the AJAX call to get extra info, since such info is not necessary)
`if (prevState.stateParam.value !== this.props.stateParam.value) { //AJAX call }`

## componentWillUnmount()

is invoked once a component is removed from the DOM, i.e. when it is not included in any `ReactDOM.render()`. This lifecycle method used to delete any variables/methods that were initialized when the component mounted.

## UNSAFE_componentWillReceiveProps(nextProps)

Invoked before a mounted component receives new props. If it's needed to update the state in response to prop changes (for example, to reset it), it may be compared `this.props` and `nextProps` and perform state transitions using `this.setState()` in this method.

Deprecated, since using this lifecycle method often leads to bugs and inconsistencies

- If you need to **perform a side effect** (for example, data fetching or an animation) in response to a change in props, use [`componentDidUpdate`](https://reactjs.org/docs/react-component.html#componentdidupdate) lifecycle instead.
- If you used `componentWillReceiveProps` for **re-computing some data only when a prop changes**, [use a memoization helper instead](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).
- If you used `componentWillReceiveProps` to **“reset” some state when a prop changes**, consider either making a component [fully controlled](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) or [fully uncontrolled with a `key`](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) instead.



## shouldComponentUpdate(nextProps, nextState)

The component will, by default, re-render every time it receives new props, even if they are the same. In this lifecycle method it is possible to prevent it from doing so by comparing the current `this.props` to the `nextProps`. This method must return a `boolean` that will tell React whether or not to re-render the component.

![1541277914837](C:\Users\tiago\AppData\Roaming\Typora\typora-user-images\1541277914837.png)

 <p style="text-align: center;"><a href="http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/">Image source</a>



*Mounting* is the normal event that create a class. *Updating* happens when either the state or props is changed. *Unmounting* is called when a component is being removed from the DOM.



# Stateless Functional Components

When a class is stateless and doesn't have any methods i.e. only comprises the `render()` method, it can be changed for a stateless functional component, which doesn't bring any advantage in particular, although being wildly used by developers. The main difference is that `props` is used as a parameter instead:

```jsx
class MyClass extends Component {
    render() {
     	return (...);   
    }
}
```

is equivalent to:

```jsx
const MyClass = props => {   // props can be destructured in {its, keys}
  return (...);
};
```

or, using implicit return by using parenthesis instead of curly brackets:

```react
const MyClass = props => (
	...
);
```

Note that in the s.f.c. `props` is being passed as a parameter and, as such, will be used instead of `this.props`.

`<MyClass name="Tiago" />` is the same as `{ MyClass( {name: "Tiago"} ) }`.



# Advanced  Guides

- #### Type checking with `PropTypes`

  When a component takes its parent's properties as inputs, it is possible that a type is expected (say, a number) but, for some reason, another is parsed (e.g. a string). In these situations, the code can still run with no errors, although the result is gonna be likely bugged.

  It is adequate to check the properties' types before the component is exported with `PropTypes`.

  ```react
  import PropTypes from 'prop-types';
  
  const Greeting = props => {
    static propTypes = {
        name: PropTypes.string.isRequired;
    };
      
    render() { return <p>Hello, {props.name}</p>; }
  }
  
  // The propTypes declaration can *instead* be written oustide the component:
  Greeting.propTypes = { name: PropTypes.string };
  ```

  <span style="color:red">Note</span> that the method starts with a small *p* and the library starts with a big *P*.

- #### Assign default props

  It's possible to assign `defaultProps` to a component. These props are defined in the own component and have the advantage of reducing the amount of props defined in its parent:

  ```react
  const Greeting = props => {
    render() { return <p>{props.greeting}, {props.name}</p>; }
  }
  
  Greeting.defaultProps = { greeting: "Hello" };
  ```



# Useful libraries

## Formik

Builds forms with no need to all the repetitive boilerplate. Handles with:

1. Getting values in and out of form state
2. Validation and error messages
3. Handling form submission

Example:

```react
import React from 'react'
import { render } from 'react-dom'
import { withFormik, Form, Field } from 'formik'

const App = ({
  values,
  errors,
  isSubmitting
}) => (
  <Form>
    <Field type="email" name="email" placeholder="Email"/>
    <Field type="password" name="password" placeholder="Password"/>
    <label>
      <Field type="checkbox" name="newsletter" checked={values.newsletter}/>
      Join our newsletter
    </label>
    <Field component="select" name="plan">
      <option value="free">Free</option>
      <option value="premium">Premium</option>
    </Field>
    <button disabled={isSubmitting}>Submit</button>
  </Form>
)

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || '', // email='' if not defined in the render method: <FormikApp email="..."/>
      password: password || '',
      newsletter: newsletter || false,
      plan: plan || 'free'
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    password: ...
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if(values.email === 'andrew@test.io') {
        setErrors({ email: 'That email is already taken' })
      } else {
        resetForm()
      }
      setSubmitting(false) // changes isSubmitting to false
    }, 2000)
  }
})(App)

render(<FormikApp />, document.getElementById('root'))

```

`withFormik` is a higher order component that will inject the info in it inside the `App` component.
`mapPropsToValues` will convert the props injected in the `FormikApp` component to the `values` object, transmitted as the input of the `App` component. The `Field` component  sets its `value` attribute by connecting its `name` attribute with the key of `value`. Note that it was necessary to explicitly write, in the checkbox `Field`, `checked={values.newsletter}`. This was implicit in the precedent Fields, `value={values.__}`, since the keyword is `value` and not `checked`.
`Form` spares us from writing `<form onSubmit={handleSubmit}>` and import the Formik built-in `handleSumbit` in the `App` component.
`component="select"` is the way to make a dropdown menu using the `Field` component.

##  Joi

To validate forms. Confirms if the string has enough characters, has numeric values, etc. It can use regex.

## Toastify

Displays stuff in a fancy way.

## Lodash

Widely used library, usually to handle with numbers.

+ [`_.get(object, path, [defaultValue])`](https://lodash.com/docs/4.17.11#get)

  Gets the value at `path` of `object`. If the resolved value is `undefined`, the `defaultValue` is returned in its place:

  ```javascript
  const person = {
    name: "Tiago",
    adress: {
      street: "Rua das Nesperas",
      nr: 25
    }
  }
  const adressNr = "adress.nr";
  const number = _.get(person,adressNr);
  // person[adressNr] cannot be used since adressNr is a string containing a '.'
  
  ```

  

# Routing

Routes are the different pages of a website. In React, Route is simply a component that accepts 2 attributes:  `path` and `component`. The special thing about the Route component is that it will return the component specified by the `component` attribute if the path specified in the url matches the one specified in the `path` attribute. If that's the case, the Component will be returned exactly where the Route component is located.

1. `npm i react-router-dom` 	(`npm i react-router-native` for native apps)

2. In `index.js`: `import { BrowserRouter } from 'react-router-dom';`

3. Wrap the `<App />` component with the `<BrowserRouter>` component

4. In the file where the routes are to be inserted: `import { Route } from 'react-router-dom';`

5. Insert all the routes surrounded by a single `div `. The routes should look like this : 

   `<Route path="/..." component={...} />`

   + `path` - the extra url of the route;
   + `component` - imported at the beginning of the script. 

   `Route` evaluates if the path starts with what is being specified in the `path` attribute. As such, the home page ( `/` ) is always rendered. Solutions:

   + add `exact`; or
   + surround all the Route components with a `Switch` (imported from the `react-router-dom` library), which renders only the first match

   

   ## Redirect

   If random text is written after the `/`, the home page will be rendered, since it satisfies the condition of having `/`. It is desired to redirect to a ***Not Found*** page. For that, the `exact` attribute should be added to the `Route`  and after it `<Redirect to="/not-found" />` (imported from the *react-router-dom* library). right before the Home Route:  `<Route path="/not-found" component={NotFound} />`

   It is also possible to redirect from a specific url:   `<Redirect from='/messages' to='/inbox' />`

   

   If the links are inserted with regular anchors - `<a href=".">...</a>`, the whole web page will reload when these links are clicked, which is undesirable. The right approach is to use `<Link to=".">...</Link>` (Link imported from 'react-router-dom').

   It is still necessary to add the links, which will be the `<Link to="...">` component instead of the `<a href="...">` tag. The only difference between the 2 is that the **Link** component will not reload the whole page, but just the necessary changes. In addition to the Link component, there is also the **NavLink**, which highlights in the browser the link that was pressed.



## Standard Route Props

There are 3 props standard props within a Route:

+ **history**
  + `push`: `this.props.history.push('/home');` pushes the user to the specified route. This way, if the user goes back in the page, the previous page is gonna be displayed.
  + `replace`: same as push, but the previous page will not be displayed, since the url was replaced instead of pushed. Useful for logging in, where the user doesn't want to get back to the login page after logging in and going back to the page they were.
+ **location**
+ **match**, where the path of the component is written in the code and in the browser. Both of these are shown in the React tab of the browser. If the code has e.g. `/:numero` and the browser has `/1` then, in the component script, `this.props.match.params.numero` translates into `1`. Any word preceded by the colon `:` is going to be listed in`params`. Catch: if the parameter is required but not specified in the url, the page will not be rendered. In that case, the parameter should be **optional **i.e. followed by `?`:
        `/:optionalParameter?` 



To add extra props to the component, a `render` attribute must be specified (instead of the `component` attribute) and, in it, an arrow function `() => <MyComponent myProp="." /> `. Note that the standard inputs are lost if they are not passed in the arrow function, as following:
 `<Route path="." render = { props => <MyComponent myProp="." {...props} />} />`



## Query-string

Query-string is the string in a url that shows after the question mark and that contains all the variables for the route i.e. `/...?var1=val1&var2=val2`. These parameters will go to the location prop, in search. It is possible to extract each parameter and value from it, but a more practical way to do it is using the query-string library:

1. `npm i query-string`
2. `import queryString from 'query-string';`
3. `const variables = queryString.parse(location.search);`



# Forms

Attributes of inputs:

+ `autoFocus` - Cursor is focused in that input field when the pages loads

**Useful library**: Joi - meant to validate fields (email, password...) depending on the preferences. 

+ `npm i joi-browser`

+ `import Joi from 'joi-browser';`

+ define the `schema` below `state`:

  ```react
  schema = {
      username: Joi.string().required(),
      password: Joi.string().required().label('Password') // label prints on the UI.
    } 
  ```

+ In the function that validates the data:

  ```react
  const result = Joi.validate(this.state.account, this.schema, {
        abortEarly: false // prevents the error handler to stop on the first error
      });
  if (!result.error) return null;
  const errors = {};
  for (let item of result.error.details)
      errors[item.path[0]] = item.message;
  return errors;
  ```


# Get elements, React style

If we were to use vanilla javascript to access an element in the DOM, we'd simply do 
	`documen.getElementById()`
However, the whole point of React is to avoid using the `document` object i.e. the DOM. In React it is, instead, initialized a reference in the class where the element is contained: 
	`username = React.createRef()`
being then assigned in the desired element 
	`<input ref={this.username} ... />` 
and, finally, this element is invoked: 
	`const username = this.username.current.value`



# Redux

1. `npm i redux react-redux redux-thunk`

2. In App.js:

   ```jsx
   import { Provider } from 'react-redux';
   import store from './store';
   
   render() {
       return (
           <Provider store={store}>
               ...
           </Provider>
           )
   }
   ```

3. In the component where the Store info is wanted:

   ```jsx
   import PropTypes from 'prop-types';
   import { connect } from 'react-redux';
   import { fetchPosts, createPosts, whatever } from '../actions/postActions';
   
   componentWillMount() {
       this.props.fetchPosts();
   }
   
   ...
   
   ComponentName.propTypes = {
     fetchPosts: PropTypes.func.isRequired,
     posts: PropTypes.array.isRequired
   };
   
   const mapStateToProps = state => ({
       posts: state.data.items
   })
   
   export default connect(mapStateToProps,{ fetchPosts })(ComponentName);
   ```

   In `_Resources` there are the scripts that contain all the info imported to this one.

   The **store **is the state of redux, where all the parameters are comprised. It is created using the `createStore` function that takes 3 parameters:

   - the **combine reducer**, which compiles all the reducers in one. Each reducer is a function (i.e. exports) that accepts an accumulation and a value and returns a new accumulation. It analysis the type of the action to be done (switch/case) based off of a type (FETCH_POST, NEW_POST, etc.) and will insert into the current state a new payload. These are 3 variables: `action.type`, `action.payload` and `state `(the current one). An **action** represents an intention to change the state and is where the AJAX is contained, with the exception that, in the end, instead of updating the state, the data (payload) with a specific type specified (mandatory) is dispatched to the store. Actions are the only way to get data into the store. Any data needs to eventually be dispatched as actions.
   - the **state** (the initial one i.e. an empty object `{}`).
   - All the desired enhancers. If more than one enhancer is wanted, wrap them all in `compose()`

# DB using GraphQL through Apollo

Since GraphQL is not JavaScript, it is not understood by React. To bind these 2, a GraphQL client is used: Apollo. In other words, React will have components that will query through Apollo, which will send the query to the server, through GraphQL, and return a response. When GraphQL receives that query, it will go to the server (MongoDB, MySQL...), CRUD the data and return an answer to Apollo. The files used to connect to Apollo are `_app.js` (which does more stuff other than that) and `withData.js`. ( [their explanation](https://xxx.net/course/full-stack-prodvinutyy-react-graphql)  in video `#15`). There are 2 ways to inject the query data into the component:

1. The most common way so far: bind them through the `graphql` HOC - the query data is injected in the props of the component).  

   ```jsx
   import { gql } from 'apollo-boost';
   import { graphql } from 'react-apollo';
   
   const GET_BOOKS_QUERY = gfq`
   query GET_BOOKS_QUERY {
     books {
       name
       id
     }
   }
   `
   class BookList extends Component {...}
   
   export default graphql(GET_BOOKS_QUERY)(BookList); //binds the query to the component (the data will be available in the components props)
   ```

   This method brings some disadvantages, amongst which the unavailability of the `loading` and `error` states. Thus, Apollo has been motivating the use of another method: 

2. import a `Query`/`Mutation` component from the `react-apollo` library. This component will have a Query/Mutation attribute which is equal to the `gql` constant and, if it needs inputs, those inputs are injected via another component: variables. It can also only receive one child: a function, to which is injected a payload object (with the data, error, loading, called...).

## [Query component](https://www.apollographql.com/docs/react/essentials/queries.html)

```jsx
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_BOOKS_QUERY = gql`...`;

class BookList extends Component {
  render() {
	return (
    <Query query={GET_BOOKS_QUERY}>
		  { ( { data, error, loading } ) => {
         if (loading) return <p>Loading...</p>;			  			// Always render loading and
         if (error) return <p>Error: {error.message}</p>;    // errors before the data!
         return <p>I found {data.items.length} items!</p>;   // Render a customized component here
				}
       }
		</Query>
	)
  }
}
export default BookList;
```

Besides `data`,`error` and `loading`, there are [other query options](https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-options) provided by the `Query` component.

## [Mutation component](https://www.apollographql.com/docs/react/essentials/mutations.html)

```jsx
const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $price: Int!
  ) {
    createItem(												# name defined in the backend
      title: $title
      price: $price
    ) {
      id															# specify at least one output
    }
  }
`;

<Mutation mutation={} variables={}>
  { (createItem, payload) => {
    <Form
      onSubmit={async e => {
        e.preventDefault();
        const res = await createItem();			// it's here that the item is created on the backend
        console.log(res);
        Router.push({
          pathname: '/item',
          query: { id: res.data.createItem.id }
        })
      }}
      >
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}> 
        <label>
          Title: <input />
        </label>
      </fieldset>
    </Form>
  }
</Mutation>
```

Note that the mutation schema is a function receiving values as input... Which? It doesn't know yet. So just their types are defined (as that is a rule for graphQL schemas) and invoked inside the function.
`<Mutation>` has now another attribute: `variables`. `<Query>` could also have this attribute, if the query would receive arguments. There are other attributes that can be used, namely `optimisticResponse`, `refetchQueries`, and `update`.
The `Mutation` component child receives as input not only a payload but also another function referencing the mutation name written in the backend resolver. Its name here is arbitrary. It's the call of this function that will create the item in the backend (evidenced as comment in the script above). If this function would be called in a handler instead, it would have to be passed as input: `<Form onSubmit={() => this.handleSubmit(createItem)}>`. Since we would need to prevent default as well, we would need to equally pass `e` as input: `e => this.handleSubmit(e, createItem)`.

The following script is part of the imported `Form` component.

```css
import styled, { keyframes } from 'styled-components';
const loading = keyframes`
  from {background-position: 0 0;}
  to {background-position: 100% 100%;}
`;
const Form = styled.form`
  fieldset {
      &[disabled] {
        opacity: 0.5;
      }
      &::before {
        height: 10px;
        content: '';
        display: block;
        background-image: linear-gradient(to right, #ff3019 0%, #e2b04a 50%, #ff3019 100%);
      }
      &[aria-busy='true']::before {
        background-size: 50% auto;
        animation: ${loading} 0.5s linear infinite;
      }
    }
`;
```

## Local State

Besides using the React built in state or the widely known Redux, it makes sense to make use of the Apollo local state when we want to store data that doesn't make a whole lot of sense to be stored in the database (for example to toggle a navbar). Such thing is possible by specifying the local state in `withData`, comprising the variables and how to change them.

A query to the local state looks just slightly different than that to the db:

```javascript
const LOCAL_STATE_QUERY = gql`query { navbarOpen @client }`;
const TOGGLE_NAVBAR_MUTATION = gql`mutation { toggleNavbar @client }`;
```

The `@client` tells Apollo that the data to be queried is client sided, so that there's no need to go to the db. Then these are just called in the `Query`/`Mutation` component, respectively, remembering:

```javascript
<Mutation mutation={TOGGLE_NAVBAR_MUTATION}>
  { toggleNavbar => <div onClick={ toggleNavbar } /> }
```

It's just a matter of including this Component in all the elements meant to toggle the Navbar!

# Server-side render

There are two key reasons why rendering on the server may be used in a real world app. First, without doing this, your React apps would consist of a relatively empty HTML file and a large bundle of JavaScript when it's initially loaded to the browser. This may not be ideal for search engines that are trying to index the content of your pages so people can find you. If you render the initial HTML markup on the server and send this to the client, the initial page load contains all of the page's markup which can be crawled by search engines. Second, this creates a faster initial page load experience because the rendered HTML is smaller than the JavaScript code of the entire app. React will still be able to recognize your app and manage it after the initial load.

The `renderToString()` method is provided on `ReactDOMServer`, which is available here as a global object. The method takes one argument which is a React element. Use this to render App to a string.

```react
class App extends React.Component { render() { return <div /> } };
ReactDOMServer.renderToString(<App />);
```



# Hooks

Hooks are a way that React implemented so that it would be possible to use all the time stateless functional components instead of components. SFC are advantageous when it comes to rendering speeds.

## Equivalent of ComponentDidMount and ComponentWillUnmount 

````react
import{ useEffect } from react;

useEffect(()=>{
  // here goes everything that one would put in ComponentDidMount
  return {
  	// here goes everything that one would put in ComponentWillUnmount
  }
},[]) // *
````

`*` The second argument of `useEffect` is where we specify when we want it to be executed. `[]` specifies that it is just when the component mounts and unmounts.

# element-react

It's a library that allows to style the components by giving them classes that are already predefined.

Documentation is [here](https://elemefe.github.io/element-react/#/en-US/dialog).



# Testing

Each file can have `.test` between its name and its extension. It is not necessary to have it for the engine to recognize it as being a test file, but it just gives a better organization to it. It's also a good practice to place the tests in a separate folder. The convention name for this folder is `__tests__`. In the testing file, one should import `React` and `ReactDOM` and the component that is going to be tested. Then the test is executed by means of the `it` global function (global = not necessary to be imported).

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");			// create a dummy component
  ReactDOM.render(<App />, div);								 // render the component in that dummy component

  expect(div.innerHTML).toContain("Hello world");	// expect something  ---  TEST GOES HERE

  ReactDOM.unmountComponentAtNode(div);					 // Unmount to avoid overloading RAM
});
```

+ `beforeEach`
  It is expected that many tests will be done to one file, `it(...); it(...);`, and that some variables of the `it`s will be repeated. It is possible to run a function that will be executed before each of the `it`s:

```js
let variable;
beforeEach( () => { variable = ...; } );
it("1",...);  // uses variable
it("2"),...);	// also uses variable
						 // etc.
```

+ `describe`
  Groups tests: `describe( it(1); it(2); )`
  Useful not only for a matter of organization, but also because functions like `forEach` will apply to the ones just comprised in that `describe`

## Testing libraries

### Jest

All the testing is made by a library that react install automatically called Jest. Jest will simply run through all the files that have testing functions and execute the functions' callbacks.

There is one big problem with these functions. Is that React only works when being implemented in the browser, and these functions are not being executed in there, but in the terminal instead. For that, there is a dependency: `Jest-jsdom` that simply fools the React library to think that the terminal is a browser and all the variables created are temporarily stored in that box. So every time we reference the `document` in the `it` callback, or whenever a component is created, we are not actually referencing the document in the browser or creating in it a component, respectively.

### [Enzyme](https://airbnb.io/enzyme/)

Complements the native tests of react. In order to work, create the file `src/setupTests.js`. Jest will execute this file before it runs:

```js
// setupTests.js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-x'; // x = version of React -> check in Package.json

Enzyme.configure({ adapter: new Adapter() });
```

By using Enzyme, we don't have to create a fake div where we will render the component i.e. we don't need `ReactDOM`.  We simply put the component we want to test into a variable. We can make 3 kinds of copy:

+ [Shallow](https://airbnb.io/enzyme/docs/api/shallow.html#shallow-rendering-api)
+ Full DOM
+ 

# Others

## `.env` file

Contains all the environment variables of the project. Some are already existent and can be overriden e.g.:

+ `NODE_PATH` -  If I want to start defining the absolute location of my files in the import statement, this is where I say where it is: `NODE_PATH=src/`

## SCSS

+ `npm i node-sass`

+ rename  file extension to `scss`

+ rename imported css to scss

+ React will import the scss just like it was with css

+ hot reloading will work naturally without extra config

  