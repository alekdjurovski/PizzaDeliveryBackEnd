const Ingredients = require('../models/ingredients');
const userHelper = require('./../helper/user');


module.exports = function (router) {

    // INSERT NEW INGREDIENT
    router.post('/ingredient', userHelper.checkToken,  function (req, res) {
        const ingredient = new Ingredients();
        ingredient.name = req.body.name;
        ingredient.description = req.body.description;
        ingredient.price = req.body.price;

        if (req.body.name === null || req.body.name === '') {
            res.send('You must provide required information to create new ingredient');
        } else {
            ingredient.save(function (err) {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    res.json({ success: true, message: 'New ingredient has been added to Ingredients list' });
                }
            });
        }
    });

    // CHECK IF INGREDIENT ALREADY EXIST IN DATABASE
    router.post('/checkIngredient', function (req, res) {
        Ingredients.findOne({ name: req.body.name }).select('name').exec(function (err, ingredient) {
            if (err) throw err;
            if (ingredient) {
                res.json({ success: false, message: 'This Ingredient already exists in the Ingredients List' });
            } else {
                res.json({ success: true, message: 'Ingredient name is free to use' });
            }
        });
    });

    // DELETE INGREDIENT
    router.delete('/deleteIngredient/:_id', function (req, res) {
        // mozis da proveris za permission pokasno
        const deletedIngredient = req.params.id;
        Ingredients.findOneAndRemove({ id: deletedIngredient }, function (err) {
            if (err) throw err;
            res.json({ success: true, message: 'Ingredient has been Deleted from Ingredients List !'});
        });
    });

    // EDIT INGREDIENT
    router.put('/editIngredient/', function (req, res) {
        let editIngredient = req.body.id;
        let newName = req.body.name;
        let newDescription = req.body.description;
        let newPrice = req.body.price;

        if (newName) {
            Ingredients.findOne({ _id: editIngredient }, function (err, ingredient) {
                if (err) throw err;
                if (!ingredient) {
                    res.json({ success: false, message: 'No ingredient found' });
                } else {
                    ingredient.name = newName;
                    ingredient.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ success: true, message: 'Ingredient Name has been changed' });
                        }
                    });
                }
            });
        }
        if (newDescription) {
            Ingredients.findOne({ _id: editIngredient }, function (err, ingredient) {
                if (err) throw err;
                if (!ingredient) {
                    res.json({ success: false, message: 'No ingredient found' });
                } else {
                    ingredient.description = newDescription;
                    ingredient.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ success: true, message: 'Ingredient Description has been changed' });
                        }
                    });
                }
            });
        }
        if (newPrice) {
            Ingredients.findOne({ _id: editIngredient }, function (err, ingredient) {
                if (err) throw err;
                if (!ingredient) {
                    res.json({ success: false, message: 'No ingredient found' });
                } else {
                    ingredient.price = newPrice;
                    ingredient.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ success: true, message: 'Ingredient Price has been changed' });
                        }
                    });
                }
            });
        }
    });
    //Get ALL INGREDIENTS
    router.get('/ingredients', function (req, res) {
        Ingredients.find({}, function (err, ingredient) {
            if (err) {
                throw err;
            }

            res.send(ingredient);
        });
    });

    return router;
}; // Module exports router