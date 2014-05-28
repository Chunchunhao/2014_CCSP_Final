var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model('user', new Schema({
  // Vote option, should be 0~6
  id: { type: String, required: true, unique: true },
  ip: { type: Number, required: true},
  POST: { type:Object},
  REPO: {type:Object}

}));