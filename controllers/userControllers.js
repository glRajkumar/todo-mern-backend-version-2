const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')
require('dotenv').config()

router.post('/register', async (req,res) => {
    let {name, email, password} = req.body

    try {
        const userExist = await User.findOne({email})
        if(userExist) return res.status(400).json({ msg:"Email is already exists" })

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        let user = new User({email , name, password: hash})
        await user.save()
        res.send("User Saved successfully")
        
    } catch (error) {
        res.status(400).json({ error, msg:"User Creation failed" })
    }
    // let user = new User({email , name, password: hash})
    // user.password = hash
})

router.get('/me', auth, (req,res)=> res.send(req.user) )

router.post('/login', async (req, res)=>{
    let {email, password} = req.body
    
    try {
        let user = await User.findOne({email})
        if(!user) return res.status(401).send("cannot find user in db")
    
        let result = await bcrypt.compare(password, user.password)
        if(result){
            let payload = {userId : user._id}
            let token = jwt.sign(payload, process.env.jwtSecretKey , { expiresIn: '18h' })
        
            user.token = user.token.concat(token)
            await user.save()
            res.send(token)        
        }

    } catch (error) {
        res.status(400).json({ error, msg:"User LogIn failed" })
    }
})

router.post("/logout", auth, async (req, res)=>{
    let user = req.user
    let token = req.token
    
    try {
        user.token =  user.token.filter(t => t!=token)
        await user.save()
        res.send("User Logged Out successfully")
    } catch (error) {
        res.status(400).json({ error, msg:"User LogOut failed" })
    }
})

module.exports = router