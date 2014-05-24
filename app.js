/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var passport = require('passport');

// testing 
var fs = require('fs');
var data = fs.readFileSync('models/db/gossip1.json');
var tdata = JSON.parse(data);
// console.log(typeof(tdata));
// console.log(tdata[0].id);
console.log(tdata.length);
console.log(tdata[1].POST.length);
console.log(tdata[1].REPO.length);
// console.log(data.toString());


// require('./models/db.js'); // TODO [DB] : Connect to database
// require('./controllers/passport.js'); // TODO [FB] : Passport configuration

var app = express();
// var Vote = mongoose.model('Vote'); // TODO [DB] : Get Vote model

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use > sequential middleware
app.use(express.favicon()); //As far as I can tell, it loads the /favicon.ico file from your site
                            // (like it would if you have the static handler loaded) but then caches it.
app.use(express.logger('dev')); // store each http request
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.use(express.cookieParser(process.env.COOKIE_SECRET));
app.use(express.cookieParser("abcdefghijklmnopqrstuvwxyz"));
app.use(express.session());

// https://github.com/jaredhanson/passport#middleware
app.use(passport.initialize());
app.use(passport.session());
// Session based flash messages
app.use(flash());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
  res.render('index');
});

app.get('/s/:id', function(req, res){
  if(0 <= req.params.id) {
      res.statusCode = 404;
    return res.send('Error 404: No quote found');
  };
  var id_itr;
  for( id_itr=0; id_itr<tdata.length; id_itr++)
    if( req.params.id === tdata[id_itr].id) break;
  if( id_itr === tdata.length) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }
  var list = tdata[id_itr].POST.concat(tdata[id_itr].REPO);
  // var times_itr;
  // for( times_itr=0; times_itr<list.length; times_itr++)
  //   list[times_itr].time = toSecond(list[times_itr].time);
  
  //sortTime(list[0].time, list[1].time);

  // res.json(list);
  res.render('main', {id: tdata[id_itr].id, ip: tdata[id_itr].ip, list: list});
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



// function sortTime( time1, time2){
//   var res1=time1.split(" ");
//   var res2=time2.split(" ");
//   console.log(res1);
//   console.log(res2);

// }