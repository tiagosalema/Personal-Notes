const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collection = "Author"; // collection in mongoDB must start with lower case and be plural of this string

const authorSchema = new Schema({
  name: String,
  age: Number
})

module.exports = mongoose.model(collection, authorSchema);