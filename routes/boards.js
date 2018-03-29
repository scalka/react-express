var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('get');
  //res.send('respond with a resource');
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
});

// add a document to the DB collection recording the player event
router.post('/boardsCollection', (req, res) => {
  console.log('here');
  // assign request body values to the player
  const board = {
    username: req.body.nickname,
    name: req.body.boardName,
    date: new Date()
  };
  // create boards collection and saves entry if board name does not exist otherwise updates
  db.collection('boardsCollection').update( { username: player.username }, board, { upsert:true }, (err, result) => {
    if (err) { return console.log(err); }
    console.log('board added to db');
    // after saving redirect user to the index page
    res.redirect('/');
  });
});


module.exports = router;
