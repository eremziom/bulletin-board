const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');

//ENDPOINT FOR ALL POSTS RENDER
router.get('/posts', async (req, res) => {
  try {
    const result = await Post
    .find()
    .select('title pubDate local status photo id author')
    .sort({pubDate: -1});
    if(!result) res.status(404).json({ post: 'Not found...'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
    .findById(req.params.id)
    if(!result) res.status(404).json({ post: 'Not found...'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {
  try {
    const { title, content, photo, pubDate, email, phone, local,
      status, price, author, id, actDate} = req.body;

    const newPost = new Post({ title: title, content: content,
      photo: photo, pubDate: pubDate, email: email, phone: phone,
      local: local, status: status, price: price, author: author,
      id: id, actDate: actDate
    })
    await newPost.save();
    res.json({ message: 'POST ADDED'});
  }
  catch(err) {
    res.status(500).json(err)
  }
})

router.delete('/posts/:id', async (req, res) => {
  try {
    const result = await Post
    .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found...'});
    else {
      await Post.deleteOne({_id: req.params.id});
      res.json({ message: 'POST DELETED'});
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
})

router.put('/posts/:id', async (req, res) => {
  try {
    const { title, content, photo, actDate, pubDate, email, phone, local,
      status, price, author, id, _id} = req.body;
    const ed = await Post.findById(req.params.id);
    if(!ed) res.status(404).json({message: 'Not found...'});
    else{
      await Post.updateOne({ _id: req.params.id}, {$set: {title: title, content: content,
        photo: photo, pubDate: pubDate, email: email, phone: phone,
        local: local, status: status, price: price, author: author,
        id: id, actDate: actDate, _id: _id
      }})
      res.json({message: 'POST UPDATED'});
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
})

module.exports = router
