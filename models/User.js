let mongoose = require('mongoose')

let User = mongoose.model('User',{
    name : { 
         type : String,
         required : [true, "Name is required"],
         minlength : [3, "Name should atleast 3 letter"]        
        },

    email : { 
         type : String,
         required : [true, "Email is required"],
         unique : true, 
         match : [/\S+@\S+\.\S+/, "Email is not valid"]  
        },

    password : {
         type : String,
         required : [true, "Password is required"]
        },

    token : [{ type : String }]
})

module.exports = User