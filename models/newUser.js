const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const NewUserSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        default:0,
        required:true,
    },
    role:{
        type:String,
        required:true,
    }
    
   
});
const newUser = mongoose.model("newUser",NewUserSchema);
module.exports = newUser;