let express = require('express')
let router = express.Router()
let ToDo = require('../models/ToDo')
let auth = require('../middlewares/auth')

router.get('/', auth, async (req, res)=>{
    let userId = req.user._id
    try {
       let todos = await ToDo.find({"creator": userId, done:false})
       res.send(todos) 
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/findbyid/:id', auth, async (req, res)=>{
    let userId = req.user._id
    let id = req.params.id

    try {
        let todo = await ToDo.find({"creator": userId, "_id": id})
        res.send(todo) 
    } catch (error) {
         res.status(400).send(error)
    }
})

router.get('/finished', auth, async (req, res)=>{
    let userId = req.user._id
    try {
        let todos = await ToDo.find({"creator": userId, done:true})
        res.send(todos) 
    } catch (error) {
         res.status(400).send(error)
    }
})

router.post('/', auth, async (req, res)=>{
    let {title, description} = req.body
    let creator = req.user._id
    let done = false
    try {
        let todo = new ToDo({title, description, creator, done})
        await todo.save()
        res.send("ToDo is added Successfully")
     } catch (error) {
         res.status(400).send(error)
     }
})

router.put('/', auth, async (req, res)=>{
    let {id,title, description} = req.body
    try {
        await ToDo.findOneAndUpdate({"_id": id}, {title, description})
        res.send("ToDo is Updated") 
     } catch (error) {
         res.status(400).send(error)
     }
})

router.put('/archive', auth, async (req, res)=>{
    let {id} = req.body
    try {
        await ToDo.findOneAndUpdate({"_id": id}, {done: true})
        res.send("ToDo is Archived")
    } catch (error) {
         res.status(400).send(error)
    }
})

router.delete('/', auth, async (req, res)=>{
    let {id} = req.body
    try {
        await ToDo.findByIdAndDelete({"_id": id})
        res.send("ToDo is deleted") 
     } catch (error) {
         res.status(400).send(error)
     }
})

module.exports = router