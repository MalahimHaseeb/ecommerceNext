// getting-started.js
const mongoose = require('mongoose');

const ProductSchema=new mongoose.Schema({
    title:{type:String, required:true},
    slug:{type:String, required:true, unique:true},
    description:{type:String, required:true},
    img: { type: String, required: true },
    category:{type:String, required:true},
    size:{type:String},
    color:{type:String},
    tPrice:{type:Number},
    price:{type:Number, required:true},
    availableQty:{type:Number, required:true},
    
  },{timestamps:true});
  mongoose.models={}
  module.exports = mongoose.model('Product', ProductSchema);