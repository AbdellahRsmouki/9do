var express = require('express');
var app = express();
var db = require('./db');
global.__root   = __dirname + '/'; 
const bodyParser = require('body-parser');


app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
      'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT,DELETE,PATCH,POST,GET');
      return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var CustomerController = require(__root + 'customer/CustomerController');
app.use('/api/customers', CustomerController);

var ProductOwnerController = require(__root + 'productowner/ProductOwnerController');
app.use('/api/ProductOwner', ProductOwnerController);

var OrderController = require(__root + 'order/OrderController');
app.use('/api/orders', OrderController);

var OrderDetailsController = require(__root + 'OrderDetails/OrderDetailsController');
app.use('/api/ordersdetails', OrderDetailsController);

var ProductController = require(__root + 'product/ProductController');
app.use('/api/products', ProductController);

var CategoriesController = require(__root + 'categories/CategorieController');
app.use('/api/categories', CategoriesController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

var StatisticController = require(__root + 'statistic/StatisticController');
app.use('/api/statistic', StatisticController);

module.exports = app;