const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Custom = require('./custom');
const Pizza = require('./pizza');
const User = require('./user');

// BASIC Order SCHEMA
const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    items: [{
          name: { type: String},
          amount: { type: Number},
          price: { type: Number, default: 0},
          size: { type: String },
    }],
    total: {type: Number, default: 0},
    orderStatus: { type: String, default: 'Open'}
});



module.exports = mongoose.model('Order', OrderSchema);