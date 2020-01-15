var mongoose = require('mongoose');  
var ProductSchema = new mongoose.Schema({  
  id : mongoose.Schema.Types.ObjectId,
  nom: String,
  category_id:String,
  owner_id:String,
  details: String,
  featured : Boolean,
  unit_price: String,
  images : [],
  keywords: String

});
mongoose.model('Product', ProductSchema);

module.exports = mongoose.model('Product');