import mongoose from 'mongoose'

const userSkema=new mongoose.Schema({
    image:String,
    name:String,
    email:String
})
const User=mongoose.model('user',userSkema)
export default User;