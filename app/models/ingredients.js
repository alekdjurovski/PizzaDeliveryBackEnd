const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// BASIC Ingredients SCHEMA
const IngredientsSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number}
});

module.exports = mongoose.model('Ingredients', IngredientsSchema);