const mongoose = require('mongoose');

const OrderSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    orderId:{type:String, required:true},
    pincode:{type:String, required:true},
    products:{type:Object,required:true},
    address:{type:String, required:true},
    phone:{type:String, required:true},
    amount:{type:Number, required:true},
    status:{type:String, default:'Pending', required:true},
    deliveryStatus:{type:String, default:'unshipped', required:true},
  },{timestamps:true});
  
  mongoose.models={}
  module.exports = mongoose.model('Order',OrderSchema)