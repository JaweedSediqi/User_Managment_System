import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoute from './routes/userRoute.js'
const app=express()
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb://localhost:27017/User')
.then(()=>{
    console.log('successfuuly connected to the mondodb');
    app.listen(5000,()=>{
    console.log('port 5000 is running');
})
})
.catch(()=>{
    console.log('can not conected to the mongodb');
})

// _______________________________
app.use('/',userRoute)
// ___________________________