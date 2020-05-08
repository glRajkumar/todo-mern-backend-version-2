let mongoose = require('mongoose')
let User = require('./User')

let ToDoSchema = new mongoose.Schema({
    title: String,
    description: String,
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    done: Boolean
}, {timestamps: true})

let ToDo = mongoose.model('ToDo', ToDoSchema)

module.exports =ToDo