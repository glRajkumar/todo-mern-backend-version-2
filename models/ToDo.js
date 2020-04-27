let mongoose = require('mongoose')
let User = require('./User')

let ToDo =mongoose.model('ToDo', {
    title: String,
    description: String,
    createDateTime: Date,
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    done: Boolean
},{timestamps: true})

module.exports =ToDo