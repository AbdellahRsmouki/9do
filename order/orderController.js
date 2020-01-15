var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Order = require('./Order');

// CREATES A NEW Order
router.post('/', function (req, res) {
    Order.create({
        Customer_id: req.body.Customer_id,
        order_date: req.body.order_date,
        location: req.body.location,
        state: req.body.state,
        predected_deliver_time: req.body.predected_deliver_time
        }, 
        function (err, order) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(order);
        });
});

// RETURNS ALL THE Orders IN THE DATABASE
router.get('/', function (req, res) {
    Order.find({}, function (err, orders) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(orders);
    });
});

// GETS A SINGLE Order FROM THE DATABASE
router.get('/:id', function (req, res) {
    Order.findById(req.params.id, function (err, order) {
        if (err) return res.status(500).send("There was a problem finding the Order.");
        if (!order) return res.status(404).send("No Order found.");
        res.status(200).send(order);
    });
});

// DELETES A Order FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Order.findByIdAndRemove(req.params.id, function (err, order) {
        if (err) return res.status(500).send("There was a problem deleting the Order.");
        res.status(200).send(order.nom + " was  deleted.");
    });
});


// UPDATES A SINGLE Order IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    Order.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, order) {
        if (err) return res.status(500).send("There was a problem updating the Order.");
        res.status(200).send(order);
    });
});

module.exports = router;