let express = require('express')
let router = express.Router()
let ToDo = require('../models/ToDo')
let auth = require('../middlewares/auth')

router.get('/', auth, (req, res)=>{
    let userId = req.user._id

    ToDo.find({"creator": userId, done:false})
    .then((todos)=>{res.send(todos)})
    .catch((err)=>{res.status(400).send(err)})
})

router.get('/editid/:id', auth, (req, res)=>{
    let userId = req.user._id
    let id = req.params.id

    ToDo.find({"creator": userId, "_id": id})
    .then((todo)=>{res.send(todo)})
    .catch((err)=>{res.status(400).send(err)})
})

router.get('/finished', auth, (req, res)=>{
    let userId = req.user._id

    ToDo.find({"creator": userId, done:true})
    .then((todos)=>{res.send(todos)})
    .catch((err)=>{res.status(400).send(err)})
})

router.post('/', auth, (req, res)=>{
    let {title, description} = req.body
    let creator = req.user._id
    let createDateTime = new Date()
    let done = false
    
    let todo = new ToDo({title, description, creator, createDateTime, done})

    todo.save().then(()=>{
        res.send("ToDo is added Successfully")
    })
    .catch((error)=>{
       res.status(400).send(err)
    })
})

router.put('/', auth, (req, res)=>{
    let {id,title, description} = req.body
    ToDo.findOneAndUpdate({"_id": id}, {title, description, createDateTime:new Date()})
    .then(()=>{res.send("ToDo is Updated")})
    .catch((err)=>{res.status(400).send(err)}) 
})

router.put('/archive', auth, (req, res)=>{
    let {id} = req.body
    ToDo.findOneAndUpdate({"_id": id}, {done: true})
    .then(()=>{res.send("ToDo is Archived")})
    .catch((err)=>{res.status(400).send(err)}) 
})

router.delete('/', auth, (req, res)=>{
    let {id} = req.body
    ToDo.findByIdAndDelete({"_id": id})
    .then(()=>{res.send("ToDo is deleted")})
    .catch((err)=>{res.status(400).send(err)}) 
})

module.exports = router