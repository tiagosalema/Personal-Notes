const _ = require('lodash');
const Author = require('../models/author');
const Book = require('../models/book');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull // use new GraphQLNonNull(__) everytime a variable is required 
} = require("graphql");



// Let's define one of the objects
const BookType = new GraphQLObjectType({
  name: "Book",
  // since BookType and AuthorType invoke each other (infinite loop) it is necessary to define their fields as functions
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, id) {
        return Author.findById(parent.authorId);
        // return _.find(authors, { id: parent.authorId })
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, id) {
        return Book.find({ authorId: parent.id })
        // return _.filter(books, { authorId: parent.id })
      }
    }
  })
})

// This object defines the queries that I will want to do using the objects that are defined above
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // book is the name that we use to query the following object
    book: {
      type: BookType,
      // graphql will expect the following args after "book" -> book(id:__){ params I want }
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // return _.find(books, { id: args.id })
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // return _.find(authors, { id: args.id })
        return Author.findById(args.id);
      }
    },
    authors: {
      type: GraphQLList(AuthorType), // i.e. a list of authors
      resolve() {
        // return authors;
        return Author.find({});
      }
    },
    books: {
      type: GraphQLList(BookType), // i.e. a list of books
      resolve() {
        // return books;
        return Book.find({});
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
        // author.save() would be enough to save in the database. But, to see
        // the result in graphiQL, it is necessary to return it as well
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });

        return book.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

// Example of implementation of a mutation:
//
// mutation {
//   addAuthor(name: "Tiago", age: 27) {
//     name
//   }
// }