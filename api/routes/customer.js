const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Customer = require('../models/customer');

router.get("/", (req, res, next) => {
    Customer.find()
      .exec()
      .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.post('/', (req, res, next) => {
    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        personOfContact: req.body.personOfContact,
        telephone: req.body.telephone,
        location: req.body.location,
        employees: req.body.employees
    });

    customer
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /Customers",
                createdCutomer: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get("/:customerId", (req, res, next) => {
    const id = req.params.customerId;
    console.log('--->>', id)
    Customer.findById(id)
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
});

router.patch("/:customerId", (req, res, next) => {
    const id = req.params.customerId;
    const updateOps = {};
    for (let [key, value] of Object.entries(req.body)) {
        updateOps[key] = value;
        console.log(key, value);
    }
    console.log('---->>', updateOps);
    Customer.updateOne({ _id: id }, {$set: updateOps} )
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});
  

router.delete("/:customerId", (req, res, next) => {
    const id = req.params.customerId;
    Customer.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

module.exports = router;