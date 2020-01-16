var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abde:abdrs@9do-23jfy.mongodb.net/test?retryWrites=true&w=majority',
{ useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('Connected')).
catch(err => console.log('Caught', err.stack));
// mongodb://127.0.0.1:27017/9do
