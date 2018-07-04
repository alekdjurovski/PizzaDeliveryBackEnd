const Custom = require('../models/custom');

module.exports = function (router) {
    //Insert new CUSTOM Pizza
    router.post('/custom', function (req, res) {
        const custom = new Custom();
        console.log(req.body);
        custom.items = [];


        if(req.body.items && (req.body.items instanceof Array) === false) {
            res.send('You must provide items as array to create new Pizza');
        } else {
            custom.items = req.body.items;
            custom.price = 0;
            custom.save(function (err) {
                if (err) {
                    res.status(400).json({ success: false, message: err });
                } else {
                    res.json({ success: true, message: 'New Pizza has been added to Pizza list' });
                }
            });
        }
    });

    // DELETE Pizza
    router.delete('/deleteCustom/:id', function (req, res) {
        const deletedCustom = req.params.id;
        Custom.findOneAndRemove({ _id: deletedCustom }, function (err) {
            if (err) throw err;
            res.json({ success: true, message: 'Pizza has been Deleted from Cart !'});
        });
    });

    //Get ALL PIZZA's
    router.get('/customList', function (req, res) {
        Custom.find({}, function (err, custom) {
            if (err) {
                throw err;
            }

            res.send(custom);
        });
    });

    return router;
};