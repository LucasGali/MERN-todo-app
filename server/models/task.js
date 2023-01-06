const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = Task = mongoose.model('task', TaskSchema);