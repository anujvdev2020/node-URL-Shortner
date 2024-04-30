const mongoose =require("mongoose")


//Schema
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:'NORMAL'

    }
  },{timestamps:true})

// create a model
const USER=mongoose.model('user',userSchema)  


module.exports = USER;