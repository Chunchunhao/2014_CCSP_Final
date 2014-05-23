var express = require('express');
var controllers = require('./controllers/control')

var host = '127.0.0.1';
var port = 5000;

express()
// .use(express.bodyParser())
.set('view engine','ejs')
.use(express.static(__dirname+"/static"))//get static file
.get('/search/:id',controllers.searchId)
.listen(port, host);



// .post('/items',controllers.addItem)
// .put('/items/:id',controllers.updateItem)
// .put('/items/:id/reposition/:new_position',controllers.repoItem)
// .delete('/items/:id',controllers.deleteItem)