const mongoose = require('mongoose'); // Erase if already required
const { ObjectId } = mongoose.Schema.Types;

var postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  postedBy: {
    type: ObjectId,
    ref: 'User'
  },
});

mongoose.model('Post', postSchema);