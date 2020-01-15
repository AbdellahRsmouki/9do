var mongoose = require('mongoose');  
var CustomerSchema = new mongoose.Schema({  
  id : mongoose.Schema.Types.ObjectId,
  nom: String,
  prenom: String,
  details: String,
  phone_number: Number,
  ville: String,
  pays: String,
  poste: String,
  featured: Boolean,
  email: String,
  image: String,
  keywords: String
});
mongoose.model('Customer', CustomerSchema);

module.exports = mongoose.model('Customer');