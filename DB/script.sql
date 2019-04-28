
CREATE TABLE `movie_lib`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `password` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `movie_lib`.`movie` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `ratings` VARCHAR(45) NULL,
  `overview` LONGTEXT NULL,
  `publish_date` DATETIME NULL,
  `published_language` VARCHAR(150) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `movie_lib`.`movie_cast` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movie_id` INT NULL,
  `cast_name` VARCHAR(100) NULL,
  `cast_role` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `movie_lib`.`user_fav_movie_assoc` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movie_id` INT NULL,
  `user_id` INT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `movie_lib`.`movie_cast` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL , RENAME TO  `movie_lib`.`movie_cast_assoc` ;

CREATE TABLE `movie_lib`.`genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `movie_lib`.`movie` 
ADD COLUMN `genres` INT NULL AFTER `published_language`;

ALTER TABLE `movie_lib`.`user` 
ADD COLUMN `email` VARCHAR(100) NULL AFTER `password`,
ADD COLUMN `role` VARCHAR(45) NULL AFTER `email`;

ALTER TABLE `movie_lib`.`user` 
ADD COLUMN `login_token` VARCHAR(100) NULL AFTER `role`;

CREATE TABLE `movie_lib`.`movie_genre_assoc` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movie_id` INT NULL,
  `genre_id` INT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `movie_lib`.`movie` 
DROP COLUMN `genres`;


ALTER TABLE `movie_lib`.`movie_cast_assoc` 
ADD INDEX `movie_id_idx` (`movie_id` ASC);
;
ALTER TABLE `movie_lib`.`movie_cast_assoc` 
ADD CONSTRAINT `movie_id`
  FOREIGN KEY (`movie_id`)
  REFERENCES `movie_lib`.`movie` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `movie_lib`.`movie_genre_assoc` 
ADD INDEX `movie_id_idx` (`movie_id` ASC),
ADD INDEX `FK_genre_id_idx` (`genre_id` ASC);
;
ALTER TABLE `movie_lib`.`movie_genre_assoc` 
ADD CONSTRAINT `FK_movie_id`
  FOREIGN KEY (`movie_id`)
  REFERENCES `movie_lib`.`movie` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_genre_id`
  FOREIGN KEY (`genre_id`)
  REFERENCES `movie_lib`.`genres` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `movie_lib`.`user_fav_movie_assoc` 
ADD INDEX `FK_movie_id_user_1idx` (`movie_id` ASC),
ADD INDEX `FK_user_id__1idx` (`user_id` ASC);
;
ALTER TABLE `movie_lib`.`user_fav_movie_assoc` 
ADD CONSTRAINT `FK_movie_id_user`
  FOREIGN KEY (`movie_id`)
  REFERENCES `movie_lib`.`movie` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `movie_lib`.`user` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


insert into user(`name`,`password`,`email`,`role`) values('tom',password('tom'),'tom.modi@gmail.com','user');
insert into user(`name`,`password`,`email`,`role`) values('jack',password('jack'),'jack.patel@gmail.com','user');
insert into user(`name`,`password`,`email`,`role`) values('admin',password('admin'),'admin.admin@gmail.com','admin');

UPDATE `movie_lib`.`user` SET `login_token` = '815000e6-68f1-11e9-af27-02b32a972428' WHERE (`id` = '1');
UPDATE `movie_lib`.`user` SET `login_token` = '877cec91-68f1-11e9-af27-02b32a972428' WHERE (`id` = '2');
UPDATE `movie_lib`.`user` SET `login_token` = '8eac39ff-68f1-11e9-af27-02b32a972428' WHERE (`id` = '3');

INSERT INTO `movie_lib`.`movie` (`name`, `ratings`, `overview`, `publish_date`, `published_language`) VALUES ('Andhadhun', '8.5', 'A series of mysterious events change the life of a blind pianist who now must report a crime that was actually never witnessed by him.', '05-10-2018', 'Hindi');
INSERT INTO `movie_lib`.`movie` (`name`, `ratings`, `overview`, `publish_date`, `published_language`) VALUES ('Avengers: Infinity War', '8.5', 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.', '26-04-2018', 'Hindi,English');

UPDATE `movie_lib`.`movie` SET `publish_date` = '2018-10-05' WHERE (`id` = '1');
UPDATE `movie_lib`.`movie` SET `publish_date` = '2018-04-26' WHERE (`id` = '2');


INSERT INTO `movie_lib`.`genres` (`name`) VALUES ('Crime');
INSERT INTO `movie_lib`.`genres` (`name`) VALUES ('Thriller');
INSERT INTO `movie_lib`.`genres` (`name`) VALUES ('Action');
INSERT INTO `movie_lib`.`genres` (`name`) VALUES ('Adventure');
INSERT INTO `movie_lib`.`genres` (`name`) VALUES ('Sci-Fi');

INSERT INTO `movie_lib`.`movie_cast_assoc` (`id`, `movie_id`, `cast_name`, `cast_role`) VALUES ('1', '1', 'Sriram Raghavan', 'Director');
INSERT INTO `movie_lib`.`movie_cast_assoc` (`id`, `movie_id`, `cast_name`, `cast_role`) VALUES ('2', '1', 'Yogesh Chandekar', 'Writer');
INSERT INTO `movie_lib`.`movie_cast_assoc` (`id`, `movie_id`, `cast_name`, `cast_role`) VALUES ('3', '1', 'Arijit Biswas', 'Writer');
INSERT INTO `movie_lib`.`movie_cast_assoc` (`id`, `movie_id`, `cast_name`, `cast_role`) VALUES ('4', '1', 'Ayushmann Khurrana', 'Star');
INSERT INTO `movie_lib`.`movie_cast_assoc` (`id`, `movie_id`, `cast_name`, `cast_role`) VALUES ('5', '1', 'Tabu', 'Star');
INSERT INTO `movie_lib`.`movie_cast_assoc` (`id`, `movie_id`, `cast_name`, `cast_role`) VALUES ('6', '1', 'Radhika Apte', 'Star');
INSERT INTO `movie_lib`.`movie_cast_assoc` (`id`, `movie_id`, `cast_name`, `cast_role`) VALUES ('7', '2', 'Anthony Russo', 'Director');
INSERT INTO `movie_lib`.`movie_cast_assoc` (`id`, `movie_id`, `cast_name`, `cast_role`) VALUES ('8', '2', 'Joe Russo', 'Director');
INSERT INTO `movie_lib`.`movie_cast_assoc` (`id`, `movie_id`, `cast_name`, `cast_role`) VALUES ('9', '2', 'Christopher Markus', 'Writer');
INSERT INTO `movie_lib`.`movie_cast_assoc` (`id`, `movie_id`, `cast_name`, `cast_role`) VALUES ('10', '2', 'Stephen McFeely', 'Writer');
INSERT INTO `movie_lib`.`movie_cast_assoc` (`id`, `movie_id`, `cast_name`, `cast_role`) VALUES ('11', '2', 'Robert Downey Jr.', 'Star');
INSERT INTO `movie_lib`.`movie_cast_assoc` (`id`, `movie_id`, `cast_name`, `cast_role`) VALUES ('12', '2', 'Chris Hemsworth', 'Star');
INSERT INTO `movie_lib`.`movie_cast_assoc` (`id`, `movie_id`, `cast_name`, `cast_role`) VALUES ('13', '2', 'Mark Ruffalo', 'Star');

INSERT INTO `movie_lib`.`movie_genre_assoc` (`id`, `movie_id`, `genre_id`) VALUES ('1', '1', '1');
INSERT INTO `movie_lib`.`movie_genre_assoc` (`id`, `movie_id`, `genre_id`) VALUES ('2', '1', '2');
INSERT INTO `movie_lib`.`movie_genre_assoc` (`id`, `movie_id`, `genre_id`) VALUES ('3', '2', '3');
INSERT INTO `movie_lib`.`movie_genre_assoc` (`id`, `movie_id`, `genre_id`) VALUES ('4', '2', '4');
INSERT INTO `movie_lib`.`movie_genre_assoc` (`id`, `movie_id`, `genre_id`) VALUES ('5', '2', '5');
