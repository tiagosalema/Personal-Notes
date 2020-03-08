Every time there is an `onChange` statement, a function has to be invoked. As the function is defined in the component, it has to be preceded by a `this`:

```react
<input
    onChange = {this.func}
/>
```

```react
<CustomCompononent
    customOnChange = {this.func}
/>
```

In the first example, the function will inevitable receive an event as an input and, as such, it is likely that the function will look like this:

```react
func = e => { this.props.xxx(e.target.value); }
```

`xxx` here represents a function activator, meaning that when `onChange` is called, xxx will activate the function associated with it in the props and whose input will be `e.target.value`

In the second example:

```react
func = val => { this.setState({ val }); }
```

**<span style="color:red">Note:</span>** It's not a good practice to render values directly from the props of the component. Instead, it's advisable to first pass them to its state and, just then, to use the ones in there. This is because the values from props are read-only!

