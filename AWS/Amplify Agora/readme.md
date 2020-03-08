1. `amplify init`

2. `amplify add api`

   + `Choose an authorization type for the API`
     `Amazon Cognito User Pool`
   + `Do you have an annotated GraphQL schema?`
     `No`

3. Every time we save `schema.graphql` this filed is compiled into the `README.md`, where all the API is. To build the resources to our backend: `amplify push`

4. Run `npm i` with the dependencies from the tutorial:

   ```json
   "dependencies": {
     "aws-amplify": "^1.1.11",
     "aws-amplify-react": "^2.1.5",
     "date-fns": "^1.29.0",
     "element-react": "^1.4.25",
     "element-theme-default": "^1.4.13",
     "react": "^16.6.3",
     "react-dom": "^16.6.3",
     "react-router-dom": "^4.3.1",
     "react-scripts": "2.1.1",
     "react-stripe-checkout": "^2.6.3"
   }
   ```

5. In `index.js`:

   ```javascript
   import Amplify from "aws-amplify"; // available after having done `npm i`
   import aws_exports from "./aws_exports";
   
   Amplify.configure(aws_exports);
   ```

   + if I get the error `Import in body of module; reorder to top  import/first` it means that `Amplify.configure()` isn't after all the imports. Reorder it.

6. In `.gitignore`, add:

   ```
   amplify
   src/aws-exports.js
   .amplifyrc
   .graphqlconfig.yml
   ```

   

# Authentication

## 	withAuthenticator

In `App.js`:

```javascript
import { withAuthenticator } from "aws-amplify-react";
...
export default withAuthenticator(App);
```

The page is now with asking for a sign in.

If we want to customize that sign in page, we can include another argument, `theme`, in the `withAuthenticator` HOC, which we will define above by spreading the current theme, `AmplifyTheme`, and then modifying it:

```javascript
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react";

const theme = {
  ...AmplifyTheme
};

export default withAuthenticator(App, true, [], null, theme);
```

The second argument is assigned `true`, which means that we want a navbar at the top of the page once the user is signed in. Then `[]` specifies some preferences that we are not interested in, `null` - idem; and, finally, `theme`, with our modifications. Just by saving the file as is presented above we can see some slight changes to the sign in page. In order to modify some of its elements, one should inspect the page to check what is the name that is between the double underscore of the element's class:

```javascript
const theme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "red"
  }
}
```

The property of the `AmplifyTheme` spread into the element has always the same name as the class. In this case is `button`. This is a nice way to know all the elements that we can modify: `console.dir(AmplifyTheme)`.It's also possible to edit the navbar once logged in in the same way. There are some limitations with this HOC: we cannot add links to the automatically created navbar. It can only display the greeting and a sign out button. If we wanted to add links, we would need to add them below the created navbar.

**Tip**: Inspect the `:root` element to check all the variables that amazon defined for us, which can be used in the theme:

```javascript
backgroundColor: "var(--squidInk)" // squidInk is a variable existing in the :root element
```



## Authenticator

Downside of using this component - this component doesn't automatically detect the authentication of the user.
Upside - we can customize the navbar however we want to.

```javascript
import { Auth, Hub } from "aws-amplify";
import { Authenticator, AmplifyTheme } from "aws-amplify-react";

class App extends React.Component {
  state = { user: null };
  componentDidMount() {
    this.getUserData();
    Hub.listen("auth", this, "onHubCapsule"); // *
  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user ? this.setState({ user }) : this.setState({ user: null });
  };

  onHubCapsule = capsule => {
    switch (capsule.payload.event) {
      case "signIn":
        console.log("Signed in!");
        this.getUserData();
        break;
      case "signUp":
        console.log("Signed up!");
        break;
      case "signOut":
        console.log("Signed out!");
        this.setState({ user: null });
        break;
      default:
        return;
    }
  };

  render() {
    const { user } = this.state;
    return !user ? <Authenticator theme={theme} /> : <div>App</div>;
  }
}

const theme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "var(--darkAmazonOrange)"
  },
  nav: {
    ...AmplifyTheme.nav,
    backgroundColor: "black"
  }
};

export default App;
```

`*` Hub is the method provided to detect authentication changes.
`Hub.listen(a,b,c)`:

+ `a` - channel that we want to listen to
+ `b` - where we want to listen to events (in this case, `this` i.e. the App class)
+ `c` - function that will handle the event. This function will receive an argument (capsule) where info is available, mainly within `capsule.payload.event` which will be either `signIn`, `signOut` or `signUp`.



# CRUD operations

1. `import { API, graphqlOperation } from 'aws-amplify';`
   `import { createWhatever } from '../graphql/mutations';`
2. `const result = await  API.graphql(graphqlOperation(createWhatever, { what: ever }))`
   `console.info('Created whatever: ' + result.data.createWhatever.id)`

