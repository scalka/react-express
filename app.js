// Server-side code
const express = require('express'); // imports express
const app = express(); // sets up an (express) app
const path = require('path');
const server = require('http').Server(app); // creates http server which is using (express) app
const MongoClient = require('mongodb').MongoClient; // import mongo and create mongo client
const bodyParser = require('body-parser'); // import body parser (to use in req.body)
require('dotenv').config(); // use environmental variables from .env

// define directories which are exposed to web
app.use(express.static(__dirname + '/node_modules'));
// serve files from the public build directory
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static('public'));

app.use(bodyParser.json()); // body parser to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

let db;
// mLab url
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}`;
// connect to the db and start the express server
MongoClient.connect(url, (err, database) => {
  if(err) { return console.log(err); }
  // Save database object from the callback for reuse
  db = database;
  // start the express web server
  server.listen(process.env.PORT || 8000, () => {
    let port = server.address().port;
    console.log('Well done, now I am listening on ', server.address().port);
  });
});

// ROUTING
// send back React's index.html file
/*app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});*/
// get boards and items assigned to boards
app.get('/boardsCollection', (req, res) => {
  // find entries in the database, find returns cursor so we need to use toArray method
  db.collection('boardsCollection').find().toArray((err, result) => {
    if (err) return console.log(err);
    // send result to the client
    res.send(result);
  });
});
//get categories for items
app.get('/categories', (req, res) => {
  db.collection('categories').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});
// post new board to db
app.post('/addBoardToCollection', (req, res) => {
  // create boards collection and saves entry if board name does not exist otherwise updates
  db.collection('boardsCollection').save(req.body, (err, result) => {
    if (err) { return console.log(err); }
    console.log('board added to db');
    // after saving redirect user to the index page
    res.sendStatus(201);
  });
});
// post item to a board in db
app.post('/addItemToBoard', (req, res) => {
  db.collection('boardsCollection').findOneAndUpdate(
    {boardName: req.body.boardName},
    {$push: {items: req.body.item}},
    (err, result) => {
      console.log(result);
      res.send(result);
      if (err) { return console.log(err); }
    });
});
// delete an item from board

app.delete('/delete/:boardName/:index', (req, res) => {
  console.log(req.params);
  db.collection('boardsCollection').update(
    { boardName: req.params.boardName},
    { $pull: {items : { listing_id: parseInt(req.params.index) }} },
    { safe: true},
    { upsert: true},
    (err, result) => {
      console.log(result);
      res.send(err);
    });
});
