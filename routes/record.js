const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("ident");
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("records")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get records by user
recordRoutes.route("/records/:user").get(function (req, res) {
  let db_connect = dbo.getDb();
  console.log("dpca: " + req.params.user);
  let myquery = { "user": req.params.user };
  db_connect
    .collection("records")
    .find(myquery)
    .toArray(function (err, result) {
      console.log("dpca: " + myquery);
      console.log("dpca: " + result);
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/user/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("users")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    clinic: req.body.clinic,
    doctor: req.body.doctor,
    patient: req.body.patient,
    age: req.body.age,
    name: req.body.name,
    rehabType: req.body.rehabType,
    description: req.body.description,
    colour: req.body.colour,
    enum_mold: req.body.enum_mold,
    doc: req.body.doc,
    sent_to_email: req.body.sent_to_email,
    trials: req.body.trials,
    user: req.body.user,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      clinic: req.body.clinic,
      doctor: req.body.doctor,
      patient: req.body.patient,
      age: req.body.age,
      name: req.body.name,
      rehabType: req.body.rehabType,
      description: req.body.description,
      colour: req.body.colour,
      enum_mold: req.body.enum_mold,
      doc: req.body.doc,
      sent_to_email: req.body.sent_to_email,
      trials: req.body.trials,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;