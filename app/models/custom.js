const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ingredients = require('mongoose').model('Ingredients').schema;
const Ingredient = require('../models/ingredients');

// BASIC Custom Pizza SCHEMA
const CustomSchema = new Schema({
    name: {type: String, default: 'Custom Pizza'},
    items: [], // array of ingredients
    price: Number,
    pizzaType: {type: String, default: 'custom'}
});

// CustomSchema.pre('save', function (next) {
//     let customObj = this;
//     let ingredientsIdArr = customObj.items.map((ingredientObj) => {
//         return ingredientObj.id;
//     });
//
//     Ingredient.find({'_id': { '$in': ingredientsIdArr}})
//         .then(function (ingredients) {
//             let sum = 0;
//             ingredients.forEach((ingredient, index) => {
//                 sum += (ingredient.price * customObj.items[index].quantity);
//             });
//             customObj.price = sum;
//
//             next();
//         })
//         .catch(function (err) {
//             throw err;
//         });
// });

module.exports = mongoose.model('Custom', CustomSchema);