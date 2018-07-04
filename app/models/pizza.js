const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ingredients = require('mongoose').model('Ingredients').schema;
const Ingredient = require('../models/ingredients');

// BASIC Pizza SCHEMA
const PizzaSchema = new Schema({
    name: {type: String, required: true, unique: true},
    items: [], //array of ingredients
    price: Number,
    pizzaType: {type: String, default: 'pizza'}
});

PizzaSchema.pre('save', function (next) {
    let pizzaObj = this;
    let ingredientsIdArr = pizzaObj.items.map((ingredientObj) => {
        return ingredientObj.id;
    });

    Ingredient.find({'_id': { '$in': ingredientsIdArr}})
        .then(function (ingredients) {
            let sum = 0;
            ingredients.forEach((ingredient, index) => {
                sum += (ingredient.price * pizzaObj.items[index].quantity);
            });
            pizzaObj.price = sum;

            next();
        })
        .catch(function (err) {
            throw err;
        });
});

module.exports = mongoose.model('Pizza', PizzaSchema);

/* var getBalance = function(accountId) {
    AccountModel.aggregate([
        { $match: {
            _id: accountId
        }},
        { $unwind: "$records" },
        { $group: {
            _id: "$_id",
            balance: { $sum: "$records.amount"  }
        }}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
} */