var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET entry list
router.get("/", function (req, res, next) {
  db("SELECT * FROM entry;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// GET one entry
router.get("/:id", function (req, res, next) {
  //your code here
  db(`SELECT * FROM entry WHERE id = ${req.params.id} ;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// INSERT a new entry into the DB
router.post("/", function (req, res, next) {
  //your code here
  const { destination } = req.body;
  const { day } = req.body;
  const { description } = req.body;
  const { img_url } = req.body;
  db(
    `INSERT INTO entry (destination, day, description, img_url) VALUES ("${destination}", "${day}", "${description}", "${img_url}");`
  )
    .then((results) => {
      res.status(201).send({ message: "New entry created correctly" });
    })
    .catch((err) => res.status(500).send(err));
});

// DELETE a entry from the DB
router.delete("/:id", function (req, res, next) {
  //your code here
  db(`DELETE FROM entry WHERE id = ${req.params.id};`)
    .then((results) => {
      res.send({ message: "Entry was deleted successfully" });
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
