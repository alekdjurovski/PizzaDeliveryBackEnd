const Order = require('../models/ordermodel');
const User = require('../models/user');
//const Custom = require('../models/custom');
//const Pizza = require('../models/pizza');
const userHelper = require('./../helper/user');
//const orderHelper = require('./../helper/order');
const waterfall = require('async-waterfall');



module.exports = function (router) {


    router.get('/order', userHelper.checkToken, function (req, res) {
        Order.find({ userId : req.user.id })
            .then(function (responseObj) {
                res.json({ data: responseObj});
            })
            .catch(function (err) {
                throw err;
            });
    });
    // Add items from Custom pizza menu
    // router.post('/add-to-cart/:order_id?', userHelper.checkToken, orderHelper.findLastOrder, function (req, res) {
    //     if (req.body.pizzaType && req.body.pizzaType === 'pizza') {
    //         Pizza.findOne({_id: req.body.id})
    //             .then(function (pizza) {
    //                 if (pizza && pizza.pizzaType === 'pizza') {
    //                     req.lastOrder.items.push({
    //                         quantity: req.body.quantity,
    //                         item: pizza._id,
    //                         name: pizza.name,
    //                         price: pizza.price
    //                     });
    //                     req.lastOrder.save().then(function () {
    //                         res.status(200).send('Successfully added');
    //                     });
    //                 }else{
    //                     res.status(500).send('Error');
    //                 }
    //             })
    //             .catch(function (err) {
    //                 throw err;
    //             })
    //     }
      /*  Order.findOne({ userId: req.user._id }, function (err, order) {

          /!*  order.items.push({
                item: req.body.custom_id,
                price: parseFloat(req.body.priceValue),
                quantity: parseInt(req.body.quantity)
            });

            order.total = (order.total + parseFloat(req.body.priceValue)).toFixed(2);

            order.save(function(err) {
                if (err) return next(err);
                return res.redirect('/order');*!/
            });
        });*/
  //  });
    //Add items from Pizza menu
/*    router.post('/add-to-cart/:pizza_id', function(req, res, next) {
        Order.findOne({ userId: req.user._id }, function(err, order) {
            order.items.push({
                item: req.body.pizza_id,
                price: parseFloat(req.body.priceValue),
                quantity: parseInt(req.body.quantity)
            });

            order.total = (order.total + parseFloat(req.body.priceValue)).toFixed(2);

            order.save(function(err) {
                if (err) return next(err);
                return res.redirect('/order');
            });
        });
    });*/
    // router.post('/remove-from-cart', userHelper.checkToken, orderHelper.findLastOrder, function(req, res, next) {
    //     Order.findOne({ userId: req.user._id }, function(err) {
    //         if (err) {
    //             return err;
    //         } else {
    //             findLastOrder.items.pull(String(req.body.item));
    //
    //             findLastOrder.total = (findLastOrder.total - parseFloat(req.body.price)).toFixed(2);
    //             findLastOrder.save(function (err) {
    //                 if (err) return next(err);
    //                 res.json({success: true, message: 'Successfully removed'});
    //                 res.redirect('/order');
    //             });
    //         }
    //     });
    // });
    router.post('/checkout', userHelper.checkToken, function(req, res, next) {

        let stripeToken = req.body.stripeToken;
        let currentCharges = Math.round(req.body.stripeMoney * 100);
        stripe.customers.create({
            source: stripeToken,
        }).then(function(customer) {
            return stripe.charges.create({
                amount: currentCharges,
                currency: 'usd',
                customer: customer.id
            });
        }).then(function(charge) {
            waterfall([
                function(callback) {
                    Order.findOne({ userId: req.user._id }, function(err, order) {
                        callback(err, order);
                    });
                },
                function(order, callback) {
                    User.findOne({ _id: req.user._id }, function(err, user) {
                        if (user) {
                            for (let i = 0; i < order.items.length; i++) {
                                user.history.push({
                                    item: cart.items[i].item,
                                    paid: cart.items[i].price
                                });
                            }

                            user.save(function(err, user) {
                                if (err) return next(err);
                                callback(err, user);
                            });
                        }
                    });
                },
                function(user) {
                    Order.update({ userID: user._id }, { $set: { items: [], total: 0 }}, function(err, updated) {
                        if (updated) {
                            res.redirect('/profile');
                        }
                    });
                }
            ]);
        });


    });
    router.get('/allOrders', function (req, res) {
        Order.find({}, function (err, order) {
            if (err) {
                throw err;
            }

            res.send(order);
        });
    });
    router.put('/editOrder', userHelper.checkToken, function (req, res) {
       let editOrder = req.body.id;
        let newStatus = req.body.orderStatus;
       if (req.user.role !== admin)   {
           req.status(403).send('Insufficient Permissions');
       }  else {
           if (newStatus) {
               Order.findOne({ _id: editOrder }, function (err, order) {
                   if (err) throw err;
                   if (!order) {
                       res.json({ success: false, message: 'No order found'});
                   } else {
                       order.orderStatus = newStatus;
                       order.save(function (err) {
                           if (err) {
                               console.log(err);
                           } else {
                               res.json({ success: true, message:'Order Status changed'});
                           }
                       });
                   }
               });
           }
       }
    });

    return router;
};