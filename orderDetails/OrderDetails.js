var mongoose = require('mongoose');  
var OrderDetailschema = new mongoose.Schema({  
  id : mongoose.Schema.Types.ObjectId,
  order_id: String,
  product_id: String,
  price: Number,
  quantity: Number,
  state: String
});
mongoose.model('OrderDetails', OrderDetailschema);

module.exports = mongoose.model('OrderDetails');