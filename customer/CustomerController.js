var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Customer = require('./Customer');


// CREATES A NEW Customer
router.post('/', function (req, res) {
    Customer.create({
            nom: req.body.nom,
            prenom: req.body.prenom,
            details: req.body.details,
            phone_number: req.body.phone_number,
            ville: req.body.ville,
            pays: req.body.pays,
            featured: req.body.featured,
            email: req.body.email,
            image: req.body.image,
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
    Customer.find({}, function (err, customers) {
        if (err) return res.status(500).send("There was a problem finding the Customers.");
        res.status(200).send(customers);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Customer.findById(req.params.id, function (err, customer) {
        if (err) return res.status(500).send("There was a problem finding the Customer.");
        if (!customer) return res.status(404).send("No Customer found.");
        res.status(200).send(customer);
    });
});

// DELETES A Customer FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Customer.findByIdAndRemove(req.params.id, function (err, customer) {
        if (err) return res.status(500).send("There was a problem deleting the Customer.");
        res.status(200).send("Customer: "+ customer.nom+" "+customer.prenom +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    Customer.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, customer) {
        if (err) return res.status(500).send("There was a problem updating the Customer.");
        res.status(200).send(customer);
    });
});


module.exports = router;