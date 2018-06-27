//scema setup

var mongoose = require('mongoose');
var contentSchema=new mongoose.Schema({
    image:String,
    paragraph:String,
    tag:String,
    heading:String

    
 
});

module.exports=mongoose.model("content",contentSchema);