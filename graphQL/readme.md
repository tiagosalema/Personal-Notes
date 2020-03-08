<h1 style="position: absolute; right:0px">GraphQL</h1>



# What is GraphQL

GraphQL is different to REST in the way that REST interacts with the server through HTTP requests (GET, POST, DELETE, PUSH, etc.) i.e. a whole endpoint is specified for each single request. This way, if a list of the users's names and their posts is wanted, the endpoints would look like `www.domain.com/users` and `www.domain.com/users/posts`. With graphQL, I could simply write:

```
{
  users {
    names
    posts
  }
}
```

GraphQL is, thus, faster and target oriented, since the REST requests will return a lot of info that is not wanted (all the info from the users, such like email, password, id...).

# Create a server 

1. Create the folder `server`
2. In it, generate `package.json`: 			  `npm init`
3. Create an express application: 			`npm i express`

# Adding items to the db

1. Create a `queries.js` file comprising all the queries:

   ```js
   import { gql } from 'apollo-boost';
   
   const getAuthorsQuery = gql`
   {
     authors {
       name
     }
   }
   `;
   const getBooksQuery = gql`...`;
   const addBookMutation = gql`...`;
   
   export { addBookMutation, getAuthorsQuery, getBooksQuery };
   ```

   Here, the `get` queries are the same as if typed in the `localhost:.../graphql`. When it comes to adding, though, the query has to be written in a different way since there are inputs:

   ```js
   const addBookMutation = gql`
     mutation(
   		$name: String!,
   		$genre: String!,
   		$authorId: ID!
   	) {
       addBook(
   			name: $name,
   			genre: $genre,
   			authorId: $authorId
   		)
       	{
         	name
         }
     }
   `;
   ```

2. In the event that is responsible for adding the document to the db, more than one query is going to be used. Binding more than one query to the `export default` is done with the `compose` higher level component:

   ```js
   import { graphql, compose } from 'react-apollo';
   export default compose(
     graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
     graphql(addBookMutation, { name: "addBookMutation" })
   )(Form);
   ```

   Note that the second input of `graphql` will be the name used instead of `this.props.data` (when it was only one query being bound) e.g. `this.props.getAuthorsQuery`.

3. Event handling the addition to the db:

   ```js
   const { name, genre, authorId } = this.state;
   this.props.addBookMutation({
         variables: { name, genre, authorId }, //same as { name: name, etc. }
         refetchQueries: [{ query: getBooksQuery }] // if there is a place to rerender the data
       });
   ```

4. 

# graphql-yoga

It's the JavaScript speaker in the backend to whom are given the resolvers.

## Resolvers

There are 2 resolvers: `Query.js` and `Mutation.js`. Each of them is like a paper that `YogaG` has with a set of uniquely named rules of what it should return. Each rule can have its own logic for the data to return or forward `YogaG` to the 'db', which has its own set of standardized rules. For the former case, it receives 4 inputs:

+ **`parent`**:
+ **`args`**: the arguments that are passed to when the rule is invoked elsewhere;

+ **`ctx`**: the context is formulated when the server is created. It is a convenient place to pass in it the whole database  (which comprises its own generated rules to return data) to teach `YogaG` the 'db' logic.
+ **`info`**: contains the query sent from the frontend. It enables us to receive only the info that we ask for in the frontend instead of all the data available in that database that respects the query. **It is specified as the second parameter to the rules used from db**.

<span style="color:red">Note</span> that the resolvers are **asynchronous**, so that has to be specified with an `async` / `await` every time we invoke / assign a variable with that from them.
**Everything specified in the resolvers has to be defined in `schema.graphql`.**

## Schema (.graphql)

It is where we specify what are the queries available for us (in the playground, frontend, etc.). If it is not specified here as the output, we cannot access it, even if the info is there

```graphql
# import * from './generated/prisma.graphql'

type Mutation {
  createItem(
    title: String
    description: String
  ): Item!
  updateItem(
    id: ID!
    title: String
    description: String
  ): Item!
}

type Query {
  items: [Item]!														 # Item is specified in the import
  item(where: ItemWhereUniqueInput!): Item		 # idem for ItemWhereUniqueInput
}
```

In this `schema.graphql` example, I can go to the playground and:

+ create items: `createItem(title: "..." description: "....") {...}`
+ update items: `updateItem(id: "..." ...) {...}`
+ get all the items: `items {...}`
+ get a specific item: `item(where: {id: "..."})`

## datamodel (.prisma)

It's here that we tell prisma what our data will consist of. We do it by providing types. Prisma will take those types and:

1. acknowledge them
2. build a huge API for all these types. It will build a new one every time we run `prisma deploy`.This API is stored in `prisma.graphql`.