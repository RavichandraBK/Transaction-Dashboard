const mong = require('mongoose');

const Products = mong.model('Products',{
    id:{type:Number,required:true},
    title:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
    sold:{type:Boolean,required:true},
    dateOfSale:{type:String,required:true},
    month:{type:String}
})

module.exports = Products