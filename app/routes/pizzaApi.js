const Pizza = require('../models/pizza');
const Ingredient = require('../models/ingredients');

module.exports = function (router) {
    //Insert new Pizza
    router.post('/pizza', function (req, res) {
        const pizza = new Pizza();
        console.log(req.body);
        pizza.name = req.body.name;
        pizza.items = [];

        if (req.body.name === null || req.body.name === '') {
            res.send('You must provide required information to create new Pizza');
        } else if(req.body.items && (req.body.items instanceof Array) === false){
            res.send('You must provide items as array to create new Pizza');
        }
        else {
            pizza.items = req.body.items;
            pizza.price = 0;
            pizza.save(function (err) {
                if (err) {
                    res.status(400).json({ success: false, message: err });
                } else {
                    res.json({ success: true, message: 'New Pizza has been added to Pizza list' });
                }
            });
        }
    });
    // CHECK IF PIZZA ALREADY EXIST IN DATABASE
    router.post('/checkPizza', function (req, res) {
        Pizza.findOne({ name: req.body.name }).select('name').exec(function (err, pizza) {
            if (err) throw err;
            if (pizza) {
                res.json({ success: false, message: 'This pizza already exists in the PIZZA List' });
            } else {
                res.json({ success: true, message: 'Pizza name is free to use' });
            }
        });
    });
    // DELETE Pizza
    router.delete('/deletePizza/:id', function (req, res) {
        // mozis da proveris za permission pokasno
        const deletedPizza = req.params.id;
        Pizza.findOneAndRemove({ _id: deletedPizza }, function (err) {
            if (err) throw err;
            res.json({ success: true, message: 'Pizza has been Deleted from Pizza List !'});
        });
    });
    // EDIT Pizza
    router.put('/editPizza/', function (req, res) {
        let editPizza = req.body.id;
        let newName = req.body.name;
        let newItems = [];


        if (newName) {
            Pizza.findOne({ _id: editPizza }, function (err, pizza) {
                if (err) throw err;
                if (!pizza) {
                    res.json({ success: false, message: 'No Pizza found' });
                } else {
                    pizza.name = newName;
                    pizza.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ success: true, message: 'Pizza Name has been changed' });
                        }
                    });
                }
            });
        }
        if (newItems) {
            Pizza.findOne({ _id: editPizza }, function (err, pizza) {
                if (err) throw err;
                if (!pizza) {
                    res.json({ success: false, message: 'No Pizza found' });
                } else if (req.body.items && (req.body.items instanceof Array) === false) {
                    res.send('You must provide items as array to create new Pizza');
                } else {
                    newItems = req.body.items;
                    custom.price = 0;
                    pizza.items = newItems;
                   pizza.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ success: true, message: 'Pizza Ingredients have been updated' });
                        }
                    });
                }
            });
        }
     /*   if (newPrice) {
            Pizza.findOne({ _id: editPizza }, function (err, pizza) {
                if (err) throw err;
                if (!pizza) {
                    res.json({ success: false, message: 'No Pizza found' });
                } else {
                    pizza.price = newPrice;
                    pizza.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ success: true, message: 'Pizza Price has been changed' });
                        }
                    });
                }
            });
        } */
    });
    //Get ALL PIZZA's
    router.get('/pizzaList', function (req, res) {
          Pizza.find({}, function (err, pizza) {
            if (err) {
                throw err;
            }

            res.send(pizza);
        });
    });
    router

    return router;
}; //