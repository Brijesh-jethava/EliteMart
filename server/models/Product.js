const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image:String,
    title:String,
    descreption:String,
    category:String,
    brand:String,
    price:Number,
    salePrice:Number,
    totalStock:Number,
},
{
    timestamps:true
});

module.exports = mongoose.model('Product',ProductSchema);