var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Customer = require('../customer/Customer');
var ProductOwner = require('../productowner/ProductOwner')

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

router.post('/login', function(req, res) {

  Customer.findOne({ email: req.body.email }, function (err, customer) {
    if (err) return res.status(500).send('Error on the server.');
    if (!customer) return res.status(404).send('No Customer found.');
    
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, customer.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // if Customer is found and password is valid
    // create a token
    var token = jwt.sign({ id: customer._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', function(req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  Customer.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  }, 
  function (err, customer) {
    if (err) return res.status(500).send("There was a problem registering the Customer`.");

    // if Customer is registered without errors
    // create a token
    var token = jwt.sign({ id: customer._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/me', VerifyToken, function(req, res, next) {

  Customer.findById(req.customerId, { password: 0 }, function (err, customer) {
    if (err) return res.status(500).send("There was a problem finding the Customer.");
    if (!customer) return res.status(404).send("No Customer found.");
    res.status(200).send(customer);
  });

});

module.exports = router;