const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

//POSTROUTES IMPORT
const postRoutes = require('./routes/posts.routes');

const app = express();

//MIDLEWARE

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//API ENDPOINTS

app.use('/api', postRoutes);

//API ERROR PAGE

app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...'});
});

//BUILD APP
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

//MONGOOSE

mongoose.connect('mongodb://localhost:27017/bulletinBoard', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to teh database');
});
db.on('error', err => console.log('Error: ' + err));

//START SERVER
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port : '+ port);
});
