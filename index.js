const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
require('dotenv').config()

const app = express()
connectDB()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const userControllers = require('./controllers/userControllers')
const todoControllers = require('./controllers/todoControllers')

app.use("/user", userControllers)
app.use("/todo", todoControllers)

app.get("/", (req,res) => res.send("Hello World!") )

app.use((req,res,next)=>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message : error.message || "Internal Server Error"
        }
    })
})

const port = process.env.PORT
app.listen(port,()=>console.log(`App is running on ${port}`))