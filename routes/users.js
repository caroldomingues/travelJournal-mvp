var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET entries list
router.get("/", async function (req, res, next) {
  const { id } = req.params;
  try {
    const results = await db(
      //oop this is wrong, help
      `SELECT
  cities.id,
  cities.city,
  MIN(entries.date) AS minDate,
  MIN(entries.description),
  MIN(entries.imgUrl)
FROM
  cities
LEFT JOIN
  entries ON cities.id = entries.city_id
WHERE
  cities.id = entries.city_id
GROUP BY
  cities.id, cities.city
ORDER BY
  minDate;`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
  // db("SELECT * FROM entries;")
  //   .then((results) => {
  //     res.send(results.data);
  //   })
  //   .catch((err) => res.status(500).send(err));
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
router.get("/:id", async function (req, res, next) {
  //your code here
  try {
    const results = await db(
      `SELECT * FROM entries WHERE city_id = ${req.params.id} ;`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET one city
router.get("/cities/:id", function (req, res, next) {
  const { id } = req.params;
  //your code here
  db(`SELECT * FROM cities WHERE id = ${id} ;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// GET all the entries of ONE city
router.get("/cities/:id/entries", async function (req, res, next) {
  const { id } = req.params;
  try {
    const results = await db(
      `SELECT cities.*, entries.description, entries.date, entries.imgUrl
    FROM cities
    LEFT JOIN entries ON cities.id = entries.city_id
    WHERE cities.id = ${id}
    ORDER BY entries.date;`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET the last entry of EVERY city
router.get("/cities/entries", async function (req, res, next) {
  const { id } = req.params;
  try {
    const results = await db(
      //oop this is wrong, help
      `SELECT
  cities.id,
  cities.city,
  MIN(entries.date) AS minDate,
  MIN(entries.description),
  MIN(entries.imgUrl)
FROM
  cities
LEFT JOIN
  entries ON cities.id = entries.city_id
WHERE
  cities.id = entries.city_id
GROUP BY
  cities.id, cities.city
ORDER BY
  minDate;`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// INSERT a new entry into the DB
router.post("/", async function (req, res, next) {
  //your code here
  console.log(req.body);
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
