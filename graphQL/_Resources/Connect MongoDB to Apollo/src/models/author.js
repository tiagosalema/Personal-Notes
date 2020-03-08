// This file is for MongoDB to know what kind of info is stored in its database

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number
})

module.exports = mongoose.model("Author", authorSchema); // We are making a model (aka collection)