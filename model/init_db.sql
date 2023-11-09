--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists entries;
SET foreign_key_checks = 1;

--
-- Create Tables
--

-- CREATE TABLE entry(
--     id INT NOT NULL AUTO_INCREMENT,
--     destination VARCHAR(255) not null,
--     day DATE not null,
--     description VARCHAR(255) not null,
--     img_url VARCHAR(255) not null,
--     );

    CREATE TABLE entries(
    id INT NOT NULL AUTO_INCREMENT,
    city VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE city(
    id INT NOT NULL AUTO_INCREMENT,
    city VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    description MEDIUMTEXT NOT NULL,
    imgUrl VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
ALTER TABLE
    city ADD CONSTRAINT city_city_foreign FOREIGN KEY(city) REFERENCES entries(city);
