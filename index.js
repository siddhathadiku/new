const express = require('express')
const mongoose = require('mongoose')
const adminroutes = require('./router/admin');
const employeeroutes = require('./router/emp');
const personroutes= require('./router/person');
const app = express()
const port = process.env.PORT || 1001

app.use(express.json())   

//api end point start//
app.use('/api/admin',adminroutes)
// app.use('/api/emp',employeeroutes)
// app.use('/api/person',personroutes)

//mongoose link/string
// const url ='mongodb+srv://Siddhartha_123:Siddhartha_123@hospital.wfn5l.mongodb.net/?retryWrites=true&w=majority&appName=hospital'
const url ='mongodb+srv://Siddhartha_123:Siddhartha_123@hospital.wfn5l.mongodb.net/Mydata'
mongoose.connect(url)
    .then(()=>{
        app.listen(port,()=>{
            console.log(`app is running on ${port}`)
        })
    })
    .catch((error)=>{
        console.log(error)
    })

