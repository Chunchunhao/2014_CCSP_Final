// models to db;

var fs = require('fs');
var itemPath = __dirname + '/ptt.json';


// start
module.exports.parseIDData = function (user, callback) {
  fs.readFile(itemPath, 'utf8', function( err, data) {

  });
  callback(user);
};
// end

// module.exports.addItem = function (user, callback) {
//   fs.readFile(itemPath, 'utf8', function (err, data) {
//     var items = []
//     if (!err) {
//       items = JSON.parse(data);
//     }

//     //push data 
//     user.id = items.length;
//     items.splice(0,0,user);//push from head

//     //reassign id number
//     var count=0;
//     items.forEach(function(item, key) {
//         item.id=count;
//         count++;
//     });

//     //items=items.reverse();

//     console.log(items);
//     fs.writeFile(itemPath, JSON.stringify(items), function (err) {
//       if (err) { throw err; }

//       callback(user);
//     });
//   });
// }