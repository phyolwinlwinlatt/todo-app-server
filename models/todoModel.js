const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: String,
  userId: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  date: Date
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo