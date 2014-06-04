/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var passport = require('passport');

var mongoURL = "mongodb://54.186.188.224:27017/test"

mongoose.connect(mongoURL, function(err){
  if(err) {
    console.log("err in connect");
    throw err;
  }
  else{
    console.log("connect success");
  }
}); // connect to our database

var Schema = mongoose.Schema;

var userObject = mongoose.model('userObject', new Schema({
  // Vote option, should be 0~6
  id: String,
  ip: String,
  // POST: { type : Array },
  // REPO: { type : Array }
  POST: { bbs: String, 
          title: String, 
          time: String,
          url: String,
          ip: String,
          res: String},
  REPO: { bbs: String, 
          title: String, 
          time: String,
          url: String,
          res: [Number]}
}, {collection : 'test'}));



  //   userObject.find({id:"email5566"}, function ( err, list ){
  //     if(err){  
  //       console.log("errrrrrr");
  //     }
  //     if(!list.length){
  //       console.log("failed");
  //     }
  //     else {
  //       console.log("fuck", list);
  //     }
  // });



// testing 
var fs = require('fs');
var data = fs.readFileSync('models/db/gossip1.json');
var tdata = JSON.parse(data);
console.log("Name List: ");
// var nn;
// for( nn=0; nn<tdata.length; nn++){
// 	console.log(tdata[nn].id);
// }
// // console.log(typeof(tdata));
// // console.log(tdata[0].id);
// // console.log(tdata.length);
// // console.log(tdata[1].POST.length);
// // console.log(tdata[1].REPO.length);
// // console.log(data.toString());


// // require('./models/db'); // TODO [DB] : Connect to database
// // require('./controllers/passport.js'); // TODO [FB] : Passport configuration

var app = express();
// var user = mongoose.model('user'); // TODO [DB] : Get Vote model

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
app.use('/search/', express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/1/:id', function(req, res){
    userObject.find({id:req.params.id}, function ( err, list ){
      if(err){  
        console.log("errrrrrr");
      }

    var ff = [];
    var ipp = "";
    var tp = 0;
    var tg = 0;
    var tb = 0 ;
    for(var www=0; www<list.length;www++){
      var ccc1 = JSON.stringify(list[www].REPO);
      var ddd1 = JSON.parse(ccc1);
      for( var eee in ddd1){
        ff.push(ddd1[eee]);
        tg += ddd1[eee].res[0];
        tb += ddd1[eee].res[1];
      }
      var ccc2 = JSON.stringify(list[www].POST);
      var ddd2 = JSON.parse(ccc2);
      tp += ddd2.length;
      for( var eee in ddd2){
        ff.push(ddd2[eee]);
        if( ddd2[eee].ip.length > 0){
          ipp = ddd2[eee].ip;
        }
      }
    }

    //gg = gg.concat(list[0].POST[0]);    console.log( typeof(cc[1][0]));
    res.json( {
        length: ff.length,
        ip: ipp,
        tp: tp,
        tg: tg, 
        tb: tb,
        final:ff
    });
  });

});

app.get('/', function(req, res){
  res.render('index');
});

app.get('/search/:id', function(req, res){
  if(0 <= req.params.id) {
      res.statusCode = 404;
    return res.send('Error 404: No quote found');
  };




// // ---
//   var id_itr;
//   for( id_itr=0; id_itr<tdata.length; id_itr++)
//     if( req.params.id === tdata[id_itr].id) break;
//   if( id_itr === tdata.length) {
//     res.statusCode = 404;
//     return res.send('Error 404: No quote found');
//   }
// // ---

// //   var tdata = Model.find({ 'id': 'ieyfung' }, function (err, docs) {
// //   // docs is an array
// // });

// // ---
//   var list = tdata[id_itr].POST.concat(tdata[id_itr].REPO);

//   // res.json(list);
//   var tg=0, tb=0, tgb_itr;
//   for(tgb_itr=0; tgb_itr<tdata[id_itr].REPO.length; tgb_itr++){
//   	tg += tdata[id_itr].REPO[tgb_itr].res[0];
//   	tb += tdata[id_itr].REPO[tgb_itr].res[1];
//   	//console.log(tdata[id_itr].REPO[tgb_itr].res);
//   }
//   var ip;
//   if( tdata[id_itr].POST.length > 0){
//   	ip = tdata[id_itr].POST[0].ip;
//   }
//   else {
//   	ip = "0.0.0.0";
//   }

  userObject.find({id:req.params.id}, function ( err, list ){
    if(err){  
      console.log("errrrrrr");
    }
    var ff = [];
    var ipp = "";
    var tp = 0;
    var tg = 0;
    var tb = 0 ;
    for(var www=0; www<list.length;www++){
      var ccc1 = JSON.stringify(list[www].REPO);
      var ddd1 = JSON.parse(ccc1);
      for( var eee in ddd1){
        ff.push(ddd1[eee]);
        tg += ddd1[eee].res[0];
        tb += ddd1[eee].res[1];
      }
      var ccc2 = JSON.stringify(list[www].POST);
      var ddd2 = JSON.parse(ccc2);
      tp += ddd2.length;
      for( var eee in ddd2){
        ff.push(ddd2[eee]);
        if( ddd2[eee].ip.length > 0){
          ipp = ddd2[eee].ip;
        }
      }
    }
    res.render('main', {id: req.params.id, ip: ipp, tp:tp, tg: tg, tb: tb, list: ff});

  });

// ---
  // res.json({id: tdata[id_itr].id, ip: tdata[id_itr].POST[0].ip, tp:tdata[id_itr].POST.length, tg: tg, tb: tb, list: list});
   // res.json(tdata)
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


