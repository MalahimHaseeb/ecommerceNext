const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    address:{type:String, default:''},
    pincode:{type:String, default:''},
    friend:{type:String, required:true},
    phone:{type:String, default:''},
    role:{ type:Number, default:0 }
    
  },{timestamps:true});
  
  mongoose.models={}
  module.exports = mongoose.model('User',UserSchema)