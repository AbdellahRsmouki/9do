var mongoose = require('mongoose');  
var Orderschema = new mongoose.Schema({  
  id : mongoose.Schema.Types.ObjectId,
  Customer_id: String,
  order_date: String,
  location: {
    country: String, city: String, state: String, latitude: String, longitude: String
  },
  predected_deliver_time: String,
  state:Number
});
mongoose.model('Order', Orderschema);

module.exports = mongoose.model('Order');