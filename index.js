let express = require('express')
let app = express()
let cors = require('cors')

let db = require('./db')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

let userControllers = require('./controllers/userControllers')
let todoControllers = require('./controllers/todoControllers')

app.use("/user", userControllers)
app.use("/todo", todoControllers)

app.get("/",(req,res) => {
    res.send("Hello World!")
})

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

const port = process.env.PORT || 8000
app.listen(port,()=>console.log(`App is running on ${port}`))