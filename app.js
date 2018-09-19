const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.promise = global.Promise;
app.use(bodyParser.json());

require('./models/Users');
require('./config/passport');
app.use(require('./routes'));

app.listen(3000, function() {
    console.log('Server is listening...');
});