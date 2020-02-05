const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  pubDate: {type: String, required: true},
  actDate: {type: String},
  email: {type: String, required: true},
  status: {type: String, required: true},
  photo: {type: String},
  price: {type: String},
  phone: {type: String},
  local: {type: String},
  author: {type: String, required: true},
});

module.exports = mongoose.model('Post', postSchema);
