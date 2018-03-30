// Server-side code
console.log('Server-side code running');
const express = require('express'); // imports express
const app = express(); // sets up an (express) app
const server = require('http').Server(app); // creates http server which is using (express) app
const MongoClient = require('mongodb').MongoClient; // import mongo and create mongo client
const bodyParser = require('body-parser'); // import body parser (to use in req.body)

// define directiories which are exposed to web
app.use(express.static(__dirname + '/node_modules'));
// serve files from the public directory
app.use(express.static('public'));
app.use(bodyParser.json()); // body parser to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

let db;
const url = 'mongodb://localhost:27017/boards'; // db url
// connect to the db and start the express server
MongoClient.connect(url, (err, database) => {
  if(err) { return console.log(err); }
  db = database;
  // start the express web server listening on 8080
  server.listen(8000, () => {
    console.log('Well done, now I am listening on ', server.address().port);
  });
});

// ROUTING
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
  console.log("here we are");
  console.log(req.body);

  db.collection('boardsCollection').findOneAndUpdate(
    {boardName: req.body.boardName},
    {$push: {items: req.body.item}},
    (err, result) => {
      console.log('item added to db');
      console.log(req.body.boardName);
      if (err) { return console.log(err);
    }
  });
});


// serve the game page
app.get('/game', (req, res) => {
  res.sendFile(__dirname + '/public/game.html');
});

// add a document to the DB collection recording the player event
app.post('/leaderboardUpdate', (req, res) => {
  // assign request body values to the player
  const player = {
    username: req.body.nickname,
    score: req.body.score,
    time: new Date()
  };
  // create players collection and saves entry if user name does not exist otherwise updates
  db.collection('players').update( { username: player.username }, player, { upsert:true }, (err, result) => {
    if (err) { return console.log(err); }
    console.log('user added to db');
    // after saving redirect user to the index page
    res.redirect('/');
  });
});

// get the player data from the database
app.get('/players', (req, res) => {
  // find entries in the database, sort it on score and limit to first six
  // find returns cursor so we need to use toArray method
  db.collection('players').find().sort({'score': -1}).limit(6).toArray((err, result) => {
    if (err) return console.log(err);
    // send result to the client
    res.send(result);
  });
});
