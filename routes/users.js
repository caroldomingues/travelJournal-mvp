var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET entries list
router.get("/", function (req, res, next) {
  db("SELECT * FROM entries;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// GET cities list
router.get("/cities", function (req, res, next) {
  db("SELECT * FROM cities;")
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

// GET one city
router.get("cities/:id", function (req, res, next) {
  //your code here
  db(`SELECT * FROM cities WHERE id = ${req.params.id} ;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// INSERT a new entry into the DB
router.post("/", function (req, res, next) {
  //your code here
  const { city_name } = req.body;
  const { date } = req.body;
  const { description } = req.body;
  const { imgUrl } = req.body;
  db(
    `INSERT INTO entry (destination, day, description, img_url) VALUES ("${city_name}", "${date}", "${description}", "${imgUrl}");`
  )
    .then((results) => {
      res.status(201).send({ message: "New entry created correctly" });
    })
    .catch((err) => res.status(500).send(err));
});

// INSERT a new city into the DB
router.post("/cities", function (req, res, next) {
  //your code here
  const { city } = req.body;
  db(`INSERT INTO cities (city) VALUES ("${city}");`)
    .then((results) => {
      res.status(201).send({ message: "New city entered correctly" });
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

// DELETE a city from the DB
router.delete("/cities/:id", function (req, res, next) {
  //your code here
  db(`DELETE FROM entry WHERE id = ${req.params.id};`)
    .then((results) => {
      res.send({ message: "Entry was deleted successfully" });
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
