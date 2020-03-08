const graphql = require("graphql");
const _ = require('lodash');
const mongoose = require('mongoose');
const Author = require('../models/author');
const Book = require('../models/book');


mongoose.connect('mongodb+srv://tiago:comidamal.0@cluster0-zc3pp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }) // mongodb + srv://tiago:@cluster0-zc3pp.mongodb.net/admin
mongoose.connection.once('open', () => console.log("connected to database")
)

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        return Book.findById(args.id);
        // return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        return Author.findById(args.id);
        // return _.find(authors, { id: args.id })
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve() {
        return Author.find({});
        // return authors;
      }
    },
    books: {
      type: GraphQLList(BookType),
      resolve() {
        return Book.find({});
        // return books;
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