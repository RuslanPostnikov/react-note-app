const {Schema, model} = require('mongoose');

const userModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    required: true,
  },
});

module.exports = model('User', userModel);
