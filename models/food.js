let mongoose = require('mongoose');
let foodSchema = mongoose.Schema({
    name: String,
    description: String,
    foodType: {
        type: String,
        enum: ['fruit', 'vegetable', 'dairy', 'sauce', 'grain', 'meat', 'snack', 'sweet', 'spice'],
        default: 'other'
    },
    quantity: Number
}, { collection: 'food' });
let Food = mongoose.model('Food', foodSchema);

module.exports = Food;
