const express = require('express');
const app = express();

const customerRoutes = require('./api/routes/customer');

app.use('/customers', customerRoutes);

module.exports = app;