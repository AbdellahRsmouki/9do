var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Product = require('./Product');

// CREATES A NEW Product
router.post('/', function (req, res) {
    Product.create({
            nom: req.body.nom,
            category_id: req.body.category_id,
            owner_id: req.body.owner_id,
            details: req.body.details,
            featured : req.body.featured,
            unit_price: req.body.unit_price,
            images : req.body.images,
            keywords: req.body.keywords
        }, 
        function (err, product) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(product);
        });
});

// RETURNS ALL THE products IN THE DATABASE
router.get('/', function (req, res) {
    Product.find({}, function (err, products) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(products);
    });
});

// GETS A SINGLE Product FROM THE DATABASE
router.get('/:id', function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return res.status(500).send("There was a problem finding the Product.");
        if (!Product) return res.status(404).send("No Product found.");
        res.status(200).send(product);
    });
});

// DELETES A Product FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err, product) {
        if (err) return res.status(500).send("There was a problem deleting the Product.");
        res.status(200).send(product.nom + " was  deleted.");
    });
});


// UPDATES A SINGLE Product IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, product) {
        if (err) return res.status(500).send("There was a problem updating the Product.");
        res.status(200).send(product);
    });
});

module.exports = router;