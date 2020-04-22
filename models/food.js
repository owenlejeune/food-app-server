let mongoose = require('mongoose');
let foodSchema = mongoose.Schema({
    name: String,
    description: String,
    foodType: {
        type: String,
        enum: ['fruit', 'vegetable', 'dairy', 'sauce', 'grain', 'meat', 'snack', 'sweet', 'spice', 'bread', 'meal', 'soup', 'drink', 'spead', 'protein', 'starch', 'other'],
        default: 'other'
    },
    packageType: {
        type: String,
        enum: ['piece', 'box', 'bag', 'container', 'bottle', 'pack', 'can', 'carton', 'other'],
        default: 'other'
    },
    quantity: Number
}, { collection: 'food' });
let Food = mongoose.model('Food', foodSchema);

module.exports = Food;
