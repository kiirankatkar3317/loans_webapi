const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
firstName : String,
lastName : String,
emailAddress : String,
phoneNumber : Number,
dob : String,
department: String
});

var customerModel = mongoose.model('customers', customerSchema);
module.exports = customerModel;