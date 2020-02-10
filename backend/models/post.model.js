const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {type: String, required: true, minlength: 6, maxlength: 20},
  content: {type: String, required: true, minlength: 10, maxlength: 200},
  pubDate: {type: String, required: true},
  actDate: {type: String},
  email: {type: String, required: true},
  status: {type: String, required: true},
  photo: {type: String},
  price: {type: String},
  phone: {type: String},
  local: {type: String},
  author: {type: String, required: true},
  id: {type: Number},
});

module.exports = mongoose.model('Post', postSchema);
