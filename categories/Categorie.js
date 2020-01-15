var mongoose = require('mongoose');  
var Categorieschema = new mongoose.Schema({  
  id : mongoose.Schema.Types.ObjectId,
  cat_id: Number,
  nom: String,
  image: String,
  desc: String,
  keywords: String
});
mongoose.model('Categorie', Categorieschema);

module.exports = mongoose.model('Categorie');