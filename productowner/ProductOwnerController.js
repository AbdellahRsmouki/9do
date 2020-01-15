var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var ProductOwner = require('./ProductOwner');


// CREATES A NEW ProductOwner
router.post('/', function (req, res) {
    ProductOwner.create({
            nom: req.body.nom,
            details: req.body.details,
            phone_number: req.body.phone_number,
            featured: req.body.featured,
            location: req.body.location,
            email: req.body.email,
            images: req.body.images,
            keywords: req.body.keywords
        }, 
        function (err, customer) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            console.log("Customers were getted");
            res.status(200).send(customer);
        });
});

// RETURNS ALL THE CustomerS IN THE DATABASE
router.get('/', function (req, res) {
    ProductOwner.find({}, function (err, customers) {
        if (err) return res.status(500).send("There was a problem finding the Customers.");
        res.status(200).send(customers);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    ProductOwner.findById(req.params.id, function (err, customer) {
        if (err) return res.status(500).send("There was a problem finding the Customer.");
        if (!customer) return res.status(404).send("No Customer found.");
        res.status(200).send(customer);
    });
});

// DELETES A Customer FROM THE DATABASE
router.delete('/:id', function (req, res) {
    ProductOwner.findByIdAndRemove(req.params.id, function (err, customer) {
        if (err) return res.status(500).send("There was a problem deleting the Customer.");
        res.status(200).send("Customer: "+ customer.nom+" " +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    ProductOwner.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, customer) {
        if (err) return res.status(500).send("There was a problem updating the Customer.");
        res.status(200).send(customer);
    });
});


module.exports = router;