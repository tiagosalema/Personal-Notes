# Get Started

1. `ember new appName`
2. `cd appName`
3. `ember server`
4. Go to `localhost:4200`

# Routes

To generate a new route:
	`ember g route routeName` or `ember g route routeName/new`
This will (1) generate the file `appName/app/routes/routeName.js`; (2) add `this.route('routeName')` in the `Router.map()` function in `appName/app/templates/router.js`; and generate the template `appName/app/templates/components/routeName.hbs`, where `hbs` stands for handlebars, which is the default template engine that ember uses. It uses the html syntax, with the difference that we can add `{{outlet}}` and it will render all the `hbs` children files.

# Templates

All pages use the template written in `application.hbs`

# hbs

`{{outlet}}` renders children
`{{#link-to 'routeName'}}Title{{/link-to}}` 
`{{input type="text" value=myInput placeholder="..."}}`

`<button {{action 'someAction'}}>Click</button>` 
`someAction` can be added in the controller or in the route. Add in the controller:

1. `ember g controller routeName/page`

2. Inside `Ember.Controller.extend()` function, add

   ```json
   actions: {
     someAction: () => { //someAction was defined in routeName/page button
       const title = this.get('title'); // idem for 'title'
     }
   }
   ```

   

# Use packages

To use third party libraries, include them in `ember-cli.build.js`, inside `module.exports` e.g. `app.import("node_modules/bootstrap/dist/css/bootstrap.css")` after have done `npm i bootstrap`.