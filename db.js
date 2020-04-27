let mongoose = require('mongoose')

let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
// let uri = "mongodb+srv://RajDB:glrajv12@rajcluster1-oxvx4.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri, {
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useFindAndModify : false
})
.then(()=>{
    console.log("MongoDB is connected now")
}).catch(()=>{
    console.log("cant connect to db")
}) 