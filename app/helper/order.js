// const Order = require('../models/ordermodel');
//
// module.exports.findLastOrder = findLastOrder;
//
// function findLastOrder (req, res, next) {
//     if (req.params.order_id) {
//         Order.findOne({_id: req.params.order_id, orderStatus: 'open', userId: req.user.id})
//             .then(function (resp) {
//                 if (resp) {
//                     req.lastOrder = resp;
//                     next();
//                 } else {
//                     res.status(400).send('Invalid order_id parameter')
//                 }
//             })
//             .catch(function (err) {
//                 throw err;
//             });
//     } else {
//         Order.findOne({}, {}, { sort: { 'date' : -1 } })
//             .then(function (resp) {
//                 if (resp){
//                     req.lastOrder = resp;
//                     next();
//                 }else{
//                     let order = new Order ({
//                         userId : req.user.id,
//                         date: new Date(),
//                         items: [],
//                     });
//                     order.save().then(function (resp) {
//                         req.lastOrder = resp;
//                         next();
//                     }).catch(function (err) {
//                         throw err;
//                     });
//
//                 }
//             })
//             .catch(function (err) {
//                 throw err;
//             });
//     }
//     // let total = 0;
//     //
//     // Order.findOne({userId: req.user.id}, function (err, order) {
//     //     if (order) {
//     //         for (let i = 0; i < order.items.length; i++) {
//     //             total += order.items[i].quantity;
//     //         }
//     //         res.locals = res.locals || {};
//     //         res.locals.order = total;
//     //     } else {
//     //         res.locals.order = 0;
//     //     }
//     //     next();
//     // });
// }