/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var passport = require('passport');

// require('./config/db'); // TODO [DB] : Connect to database
// require('./config/passport'); // TODO [FB] : Passport configuration
var app = express();
// var Vote = mongoose.model('Vote'); // TODO [DB] : Get Vote model

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
// app.use > sequential middleware
app.use(express.logger('dev')); // store each http request
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

//app.use(express.cookieParser(process.env.COOKIE_SECRET));
app.use(express.cookieParser("abcdefghijklmnopqrstuvwxyz"));
app.use(express.session());
// // https://github.com/jaredhanson/passport#middleware
// app.use(passport.initialize());
// app.use(passport.session());
// // Session based flash messages
app.use(flash());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/** Restful **/
app.get('/', function(req, res){
  res.render('index');
});
app.get('/search', function(req, res){
  res.render('main');
});


// .post('/items',controllers.addItem)
// .put('/items/:id',controllers.updateItem)
// .put('/items/:id/reposition/:new_position',controllers.repoItem)
// .delete('/items/:id',controllers.deleteItem)


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express 幹你媽的 on port ' + app.get('port'));
});
