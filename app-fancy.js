const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const MongoClient = require('mongodb').MongoClient; // import mongo and create mongo client
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const boardsRouter = require('./routes/boards');
//const router = express.Router();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/boardsCollection', boardsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


let db;
const url = 'mongodb://localhost:27017/boards'; // db url
// connect to the db and start the express server
MongoClient.connect(url, (err, database) => {
  if(err) { return console.log(err); }
  db = database;
  console.log('db connected');
  // start the express web server listening on 8080
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
});

app.get('/boardsCollection', (req, res) => {
  // find entries in the database, sort it on score and limit to first six
  // find returns cursor so we need to use toArray method
  db.collection('boardsCollection').find().toArray((err, result) => {
    if (err) return console.log(err);
    // send result to the client
    console.log(result);
    res.send(result);
  });
});

app.post('/boardsCollection', (req, res) => {
  console.log('here');
  // assign request body values to the player
  /*const board = {
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
  });*/
});



module.exports = app;
