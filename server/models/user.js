const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  date: {
    type: Date,
    default: Date.now
  }  
});

module.exports = User = mongoose.model('user', UserSchema);