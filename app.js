// Server-side code
console.log('Server-side code running');
const express = require('express'); // imports express
const app = express(); // sets up an (express) app
const server = require('http').Server(app); // creates http server which is using (express) app
const MongoClient = require('mongodb').MongoClient; // import mongo and create mongo client
const bodyParser = require('body-parser'); // import body parser (to use in req.body)
require('dotenv').config();

// define directories which are exposed to web
app.use(express.static(__dirname + '/node_modules'));
// serve files from the public directory
app.use(express.static('public'));
app.use(bodyParser.json()); // body parser to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

let db;
//const url = 'mongodb://localhost:27017/boards'; // db url
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}`;
// connect to the db and start the express server
MongoClient.connect(url, (err, database) => {
  if(err) { return console.log(err); }
  // Save database object from the callback for reuse
  db = database;
  // start the express web server listening on 8080
  server.listen(process.env.PORT || 8000, () => {
    let port = server.address().port;
    console.log('Well done, now I am listening on ', server.address().port);
  });
});


// ROUTING
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/public/index.html');
});

app.get('/boardsCollection', (req, res) => {
  // find entries in the database, sort it on score and limit to first six
  // find returns cursor so we need to use toArray method
  db.collection('boardsCollection').find().toArray((err, result) => {
    if (err) return console.log(err);
    // send result to the client
    //console.log(result);
    res.send(result);
  });
});

app.get('/categories', (req, res) => {
  // find entries in the database, sort it on score and limit to first six
  // find returns cursor so we need to use toArray method
  db.collection('categories').find().toArray((err, result) => {
    if (err) return console.log(err);
    // send result to the client
    //console.log(result);
    res.send(result);
  });
});

app.post('/addBoardToCollection', (req, res) => {
  // create boards collection and saves entry if board name does not exist otherwise updates
  db.collection('boardsCollection').save(req.body, (err, result) => {
    if (err) { return console.log(err); }
    console.log('board added to db');
    // after saving redirect user to the index page
    res.sendStatus(201);
  });
});

app.post('/addItemToBoard', (req, res) => {
  console.log(req.body);
  db.collection('boardsCollection').findOneAndUpdate(
    {boardName: req.body.boardName},
    {$push: {items: req.body.item}},
    (err, result) => {
      console.log('item added to db');
      console.log(result);
      res.send(result);
      if (err) { return console.log(err);
      }
    });
});
