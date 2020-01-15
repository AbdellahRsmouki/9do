var mongoose = require('mongoose');  
var ProductOwnerSchema = new mongoose.Schema({  
  id : mongoose.Schema.Types.ObjectId,
  nom: String,
  details: String,
  phone_number: Number,
  location: {
    country: String, city: String, state: String, latitude: String, longitude: String
  },
  featured: Boolean,
  email: String,
  images: [],
  keywords: String
});
mongoose.model('ProductOwner', ProductOwnerSchema);

module.exports = mongoose.model('ProductOwner');