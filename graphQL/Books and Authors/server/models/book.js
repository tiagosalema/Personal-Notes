const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collection = "Book";// collection in mongoDB must start with lower case and be plural of this string

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
})

module.exports = mongoose.model(collection, bookSchema);