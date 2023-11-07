--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists entries;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE entry(
    id INT NOT NULL AUTO_INCREMENT,
    destination VARCHAR(255) not null,
    day DATE not null,
    description VARCHAR(255) not null,
    img_url VARCHAR(255) not null,
    PRIMARY KEY (id)
    );
