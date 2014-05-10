var express = require('express');
var controllers = require('./controllers/control')

var host = '127.0.0.1';
var port = 5000;

express()
.use(express.static(__dirname+"/"))//get static file
.use(express.bodyParser())
.get('/search/:id',controllers.searchId)
.listen(port, host);


// .post('/items',controllers.addItem)
// .put('/items/:id',controllers.updateItem)
// .put('/items/:id/reposition/:new_position',controllers.repoItem)
// .delete('/items/:id',controllers.deleteItem)