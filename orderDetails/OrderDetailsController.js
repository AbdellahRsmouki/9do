var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var OrderDetails = require('./OrderDetails');

// CREATES A NEW OrderDetails
router.post('/', function (req, res) {
    OrderDetails.create({
        Customer_id: req.body.CustomerId,
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        price: req.body.price,
        state: req.body.state,
        quantity: req.body.quantity,
        }, 
        function (err, orderDetails) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(orderDetails);
        });
});

// RETURNS ALL THE OrderDetailss IN THE DATABASE
router.get('/', function (req, res) {
    OrderDetails.find({}, function (err, orderDetails) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(orderDetails);
    });
});

// GETS A SINGLE OrderDetails FROM THE DATABASE
router.get('/:id', function (req, res) {
    OrderDetails.findById(req.params.id, function (err, orderDetails) {
        if (err) return res.status(500).send("There was a problem finding the OrderDetails.");
        if (!orderDetails) return res.status(404).send("No OrderDetails found.");
        res.status(200).send(orderDetails);
    });
});

// DELETES A OrderDetails FROM THE DATABASE
router.delete('/:id', function (req, res) {
    OrderDetails.findByIdAndRemove(req.params.id, function (err, orderDetails) {
        if (err) return res.status(500).send("There was a problem deleting the OrderDetails.");
        res.status(200).send(orderDetails.order_details_order_id + " was  deleted.");
    });
});


// UPDATES A SINGLE OrderDetails IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    OrderDetails.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, orderDetails) {
        if (err) return res.status(500).send("There was a problem updating the OrderDetails.");
        res.status(200).send(orderDetails);
    });
});

module.exports = router;