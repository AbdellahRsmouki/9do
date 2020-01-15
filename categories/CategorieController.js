var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Categorie = require('./Categorie');


// RETURNS ALL THE categories IN THE DATABASE
router.get('/', function (req, res) {
    Categorie.find({}, function (err, profiles) {
        if (err) return res.status(500).send("There was a problem finding the profiles.");
        res.status(200).send(profiles);
    });
});


// CREATES A NEW PROFILE
router.post('/', function (req, res) {
    Categorie.create({
            nom: req.body.nom,
            desc: req.body.desc,
            cat_id: req.body.cat_id,
            image: req.body.image,
            keywords: req.body.keywords
        }, 
        function (err, categorie) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            console.log("categoies were getted");
            res.status(200).send(categorie);
        });
});
/*
// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Profile.findById(req.params.id, function (err, profile) {
        if (err) return res.status(500).send("There was a problem finding the profile.");
        if (!profile) return res.status(404).send("No profile found.");
        res.status(200).send(profile);
    });
});

// DELETES A PROFILE FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Profile.findByIdAndRemove(req.params.id, function (err, profile) {
        if (err) return res.status(500).send("There was a problem deleting the profile.");
        res.status(200).send("Profile: "+ profile.nom+" "+profile.prenom +" was deleted.");
    });
});


// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id',  function (req, res) {
    Profile.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, profile) {
        if (err) return res.status(500).send("There was a problem updating the profile.");
        res.status(200).send(profile);
    });
});
*/

module.exports = router;