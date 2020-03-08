// This file is for MongoDB to know what kind of info is stored in its database

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
})

module.exports = mongoose.model("Book", bookSchema);