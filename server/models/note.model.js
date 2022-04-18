const {Schema, model} = require('mongoose');

const noteModel = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  completed: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    required: true,
  },
});

module.exports = model('Note', noteModel);
