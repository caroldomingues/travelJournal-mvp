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
  db(`SELECT * FROM entries WHERE id = ${req.params.id} ;`)
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

// ok so apparently i can only an entry(city) into the entries table when that city has already been added to the cities table
// is that supposed to happen? do i want that to happen?

// INSERT a new entry into the DB
router.post("/", async function (req, res, next) {
  //your code here
  const { city } = req.body;
  let { city_id } = req.body;
  const { date } = req.body;
  const { description } = req.body;
  const { imgUrl } = req.body;
  try {
    //i have no idea why this works but ok slay im happy
    if (city_id === "0") {
      // res.send(city_id);
      await db(`INSERT INTO cities (city) VALUES ("${city}");`);
      // res.send(answer);
      const response = await db(
        `SELECT id FROM cities ORDER BY id DESC LIMIT 1;`
      );
      // console.log(response.data[0].id);
      //override the city_id from the params with the new city_id that was created
      city_id = response.data[0].id;
      // res.send(city_id);
      res.status(201).send({ message: "New city added correctly" });
    }
    //happy path
    await db(
      `INSERT INTO entries (city_id, date, description, imgUrl) VALUES ("${city_id}", "${date}", "${description}", "${imgUrl}");`
    );
    res.status(201).send({ message: "New entry created correctly" });
  } catch (err) {
    console.log(err);
  }
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
  db(`DELETE FROM entries WHERE id = ${req.params.id};`)
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
