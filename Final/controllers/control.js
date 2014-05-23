var fs = require('fs');
var User = require('../models/user');

module.exports.searchId = function (req, res) {
  var pttid=req;
  User.parseIDData(req.body, function (user) {
      res.json(user);
  });
};