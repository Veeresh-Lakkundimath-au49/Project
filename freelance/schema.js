const mongoose = require("mongoose");
const { Schema } = require('mongoose')

let buyerSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
    type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{

        type:String,
    
    },
    cartInfo:[
        {
            id:Number,
            
            gigName:String,
            price:Number
        }
    ]

})


let sellerSchema=new Schema({
    id:{
        type:Number,
       
    },
    name:{
        type:String,
        required:true
    },
    email:{
    type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{

        type:String,
    
    },
    gigInfo:[
        {
            id:Number,
            gigName:String,
            description:String,
            price:Number
        }
    ]

})



let buyerModel=mongoose.model('buyer',buyerSchema);
let sellerModel=mongoose.model('seller',sellerSchema)

module.exports={buyerModel,sellerModel}