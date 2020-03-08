

<h1 style="position: absolute; right:0px">RESTful APIs</h1>


[What's a RESTful API?](https://www.mulesoft.com/resources/api/restful-api)

# CRUD

Create-Read-Update-Delete

| Task   |             |
| ------ | ----------- |
| Create | POST        |
| Read   | GET         |
| Update | PUT / PATCH |
| Delete | DELETE      |

+ PUT - updates the data with that id entirely, even if we changed just one entry
+ PATCH - updates just the entries that were changed

# RESTful conventions

![1563975450740](C:\Users\tiago\AppData\Roaming\Typora\typora-user-images\1563975450740.png)

# Useful packages

[JSON server](https://www.npmjs.com/package/json-server) is an alternative way to create REST APIs to express that follows the above convention (hence, it doesn't need coding):

This package will use our computer as a database server.

1. Create the `api` folder

2. `npm init`

3. In `package.json`

   ```json
     "scripts": {
       "start": "json-server -p 3001 -w db.json" // the server is running in port 3001
     }
   ```

   Where `-p` specifies the port and `-w` tells the script to watch for changes in `db.json`

4. Add `db.json` to the `api` folder

   ```json
   {
     "streams": [] // will be available in localhost:3001/streams
   }
   ```

5. `npm start`

6. Follow the conventions for the server `localhost:3001` e.g. a `GET` http request to `localhost:3001/streams` to get all the streams.
   To post a stream with React/Redux (by making an AJAX (i.e. network) request to the API - running on localhost:3001)

   1. define an action-creator in the component comprising the form. This action-creator will use `axios` for the network request
   2. wire up that action-creator to our component with  the `connect` helper
   3. call it in the `onSubmit` function

   **Every time we create a stream, the JSON server will automatically assign it an `id`.**

**Tip**: It's handy to save data in an array and convert it to an object whenever we need to work with it. To do so, there's a useful function in lodash: `mapKeys`, that accepts 2 arguments: 1st is the array to put into an object and the 2nd is the key we want for each element.

```
const data =
[
	{ id: 1, name: "Tiago" },
	{ id: 2, name: "Zé" }
]
```

`_.mapKeys(data,"id")` will output the object

```
{
  1: {id: 1, name:"Tiago"},
  2: {id: 2, name: "Zé"}
}
```

