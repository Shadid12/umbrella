const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


mongoose.connect(
   `mongodb://umbrella:SuperSecrect6@ds253468.mlab.com:53468/auth`
);
  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

const customerRoutes = require('./api/routes/customer');

app.use('/customers', customerRoutes);

module.exports = app;