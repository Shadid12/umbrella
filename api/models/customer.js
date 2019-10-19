const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    personOfContact: String,
    telephone: Number,
    location: String,
    employees: Number
});

module.exports = mongoose.model('Product', customerSchema);