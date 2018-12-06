const express = require("express");

const Phone = require("../models/phone-model.js");

const router = express.Router();

// GET /phones - Retrieve the list of phones
router.get("/phones", (req, res, next) => {
  Phone.find() // you can filter the data in the find({ price: {$gt: 999} }) query
    // sort the newest ones first
    .sort({createdAt: -1})
    .limit(20)
    // send the query results as a JSON to the client
    .then(phoneResults => res.json(phoneResults))
    .catch(err => next(err));
})

// -----------------------------r

// POST /phones - Create a new phone (add to the list)
router.post("/phones", (req, res, next) => {
  const { brand, model, price, image, specs } = req.body;

  Phone.create({ brand, model, price, image, specs })
    // send the query results as a JSON response to the client
    .then(phoneDoc => res.json(phoneDoc))
    .catch(err => next(err));
})

// -----------------------------

// GET /phones/:id - Retrieve the details of ONE phone
router.get("/phones/:id", (req, res, next) => {
  const { id } = req.params;
  Phone.findById(id)
    // send the query results as a JSON response to the client
    .then(phoneDoc => res.json(phoneDoc))
    .catch(err => next(err))
})

// -----------------------------

// PUT /phones/:id ) Update ONE phone
router.put("/phones/:id", (req, res, next) => {
  const { id } = req.params;
  const { brand, model, price, image, specs } = req.body;

  Phone.findByIdAndUpdate(
    id,
    { $set: {brand, model, price, image, specs} },
    // "new" gets the update version of the document
    { runValidators: true, new: true },
  )
  .then(phoneDoc => res.json(phoneDoc))
  .catch(err => next(err));
})

// -----------------------------

// DELETE /phones/:id - Delete ONE phone
router.delete("/phones/:id", (req, res, next) => {
  const { id } = req.params;
  
  Phone.findByIdAndRemove(id)
  .then(phoneDoc => res.send.phoneDoc)
  .catch(err => next(err));
})

module.exports = router;