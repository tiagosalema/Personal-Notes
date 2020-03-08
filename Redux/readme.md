<h1 style="position: absolute; right:0px">Redux</h1>



Centralizes all of the info of a script into a store. Every time one wants to change that info, it is necessary to `dispatch` an `action`, created by an `action creator` function. What the `dispatch` function is doing is to copy the invoked action, which has a certain `type`, to all the reducers. Each reducer will then check if that type is of any relevance and, if so, change the data incoming data. It will return the data unchanged otherwise.



# Middleware

Before an action is dispatched to all the reducers, it is possible to intervene in this actions using a middleware. This "intervene" is a function that can do whatever we want to the action before it is sent to the reducers. The simplest middleware we could do would be to `console.log` the action before sending it.

Although there is a wide variety of copen-sourced middleware for different uses, we can do our own as well. The most widely open-sourced middleware is for dealing with async actions and it is called **Redux-Thunk**.

## 	Redux-Thunk

​	When an action-creator takes some time to output an action (for example, when it fetches data), we could try to define it as an async / await function, but then the outputted action wouldn't be an object, which is what Redux is expecting. What is actually being returned is `axios.get("someAPI")` instead of the expected object (see [what is actually being transpilled](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBAZgVzMGBeGBDCBPZMAUAlGgHwwDeAUAJCiSwAmGUGamA7hgJawYAeXEBAB0AcwCmUfACIIIALbiAggAUAktMIBuSjBgAnSQn1gKuvTCjYADuIBcMaQDEAogBUAwgAkA-gBElNyVpABpzPWsMbAAbEAwGByYWcwBfShSgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Ces2016%2Ces2017%2Creact%2Cstage-0%2Cstage-1%2Cstage-2%2Cstage-3%2Ces2015-loose&prettier=false&targets=&version=7.5.0&externalPlugins=) `- case 0`). We could also force the output to be an object by assigning the payload value to a promise. But then again, a reducer can't wait for the promise to return its data. What Redux-Thunk does is just put the action in a loop that will ask itself whether it is an object or a function. If it is a function, it will execute and ask itself the same thing after its execution. **So the solution is to return a function from the action-creator!**

To use it, in `index.js` from `src`:

```js
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>...</Provider>,
  document.getElementById("root")
);

```



# Reducers

```js
const someReducer = (valueInStore = null, action) => {
  const newValueInStore = ...
  return {...myStore, newValueInStore};
}
```

+ Must return a value besides undefined.

+ All reducers run exactly one time when the app starts. For this run, `valueInStore` is undefined, which is why we override this value with `null` (could be anything else, like `[]`,`''`,`0`, etc.)

+ They have to be pure i.e. only rely on their inputs for what they return (we cannot use axios, access the document for text in `input`, etc.)

+ It sort of must not mutate `valueInStore`

  

  

# with React

All the reducers run when our app initially loads in the browser. The action of these reducers is of a random type that we don't know and, since this type is not in our `switch`, the state that the reducer is going to return is the one we put as default. Just after the component is rendered is appropriate to fetch the desired data from the redux store, in the `ComponentDidMount()` lifecycle method, using `this.props.fetch___()` - see  the `action1` in the code before the `Folders` section, which will dispatch an action to the reducer. The reducer will match the type of the action and return its payload. Redux sees now that we have not returned the same object as the one before (which was the one defaulted) and tells React to re-render itself again.

There are 2 main elements that connect redux with react: `Provider` and `connect`: 

+ `Provider` - wraps the element that will contain the store. As such, it will have the `store` prop that will inject it into the wrapped component. The store was created by the function `createStore` (available in the `redux` library) and that will, in turn, receive all the `reducer`s combined. 

+ `connect` - injects stuff into the component: 

  + **1st argument**: stuff from the store (object returned by the function `mapStateToProps`). We use this component if we want our component to have a state. Otherwise we write `null` for this argument.

  + **2nd argument**: functions that returns an object and that `connect` transforms into action-creators and actions, respectively.

    ```js
    class MyComponent extends Component {
      // this.props = { obj, action1 [, ...] }
    }
    const mapStateToProps = state => {		// doesn't have to be called mapStateToProps
      const obj = { xxx: state.somethingFromStore }
      return obj;
    }
    export default connect(mapStateToProps, { action1 })(MyComponent);
    ```

    `action1` is a function that, used alone, won't do anything. It is because it is being connected that will have the power to mutate the store. In vanilla Redux this would look like `store.dispatch(functionHere(Button))` (`Button` would be what triggers the dispatch of the action).

## 	Folders

### 			Reducers

```js
const reducer1 = (input = null, action) => {
  switch action.type:
    case '...': return ...
    case '...': return ...
    default: 	  return input;
}
const reducer2 = (input = null, action)  => {...}

export default combineReducers({
  songs: reducer1,
  movies: reducer2
})
// songs and movies will be the words displayed in store
```



## Forms

1. In `reducers/index.js`

   ```js
   import { reducer as formReducer } from "redux-form";
   export default combineReducers({
   	...
     form: formReducer // it has to be named 'form'
   });
   ```

2. In the component where the form is gonna be:

   ```jsx
   import { Field, reduxForm } from "redux-form";
   class Create extends React.Component {
     renderInput = ({input, label, meta}) => { // input and meta are sent automatically from redux
       return (
       	<label>{label}</label>
         <input {...input} />
         <div>{meta.errors}</div>
       );
     };
   	onSubmit = formValues => console.log(formValues);
     render() {
       return (
         <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
           <Field name="title" component={this.renderInput} label="Enter title"/>
           <Field name="description" component={this.renderInput} label="Enter description" />
           <button>Submit</button>
         </form>
       );
     }
   }
   
   const validate = formValues => {
     const errors={};
     if(!formValues.title) error.title = "You must enter a title.";
     if(!formValues.description) error.description = "You must enter a description.";
     return errors;
   }
   
   export default reduxForm({ // injects props in Create (check which with console.log)
     form: "createStream",
     validate
   })(Create);
   
   ```

   The `name` prop of `Field` is really important for several reasons. One of them is the possibility to give initial values to this field. If we import the component `Create` into another component and we assign to it the prop `initialValues` as being an object whose keys are these names i.e.
   
   ```jsx
   <Create initialValues={{ title: "My title", description: "My description" }} />
   ```
   
   Then these strings are going to be inserted automatically to the Fields with the `name` prop respective to the key of the `initialValues` object. Note that we could have written, for example, `initialValues={this.props.streams}`.















