-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema.js mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema.js ClassHub-Development
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema.js ClassHub-Development
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ClassHub-Development` DEFAULT CHARACTER SET utf8mb4 ;
USE `ClassHub-Development` ;

-- -----------------------------------------------------
-- Table `ClassHub-Development`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassHub-Development`.`Users` (
  `id` INT(11) UNSIGNED NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `password` BINARY(60) NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `nick_name` VARCHAR(20) NULL DEFAULT NULL,
  `avi` VARCHAR(120) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ClassHub-Development`.`Active_Sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassHub-Development`.`Active_Sessions` (
  `user_id` INT(11) UNSIGNED NOT NULL,
  `sid` CHAR(60) NOT NULL,
  INDEX `user2active_session_idx` (`user_id` ASC),
  CONSTRAINT `user2active_session`
    FOREIGN KEY (`user_id`)
    REFERENCES `ClassHub-Development`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ClassHub-Development`.`School`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassHub-Development`.`School` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `address1` VARCHAR(60) NOT NULL,
  `address2` VARCHAR(60) NULL DEFAULT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(20) NOT NULL,
  `zip` VARCHAR(10) NOT NULL,
  `logo` VARCHAR(70) NULL DEFAULT NULL,
  `banner` VARCHAR(70) NULL DEFAULT NULL,
  `contact` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `School_ID_UNIQUE` (`id` ASC),
  INDEX `contact2school_idx` (`contact` ASC),
  CONSTRAINT `contact2school`
    FOREIGN KEY (`contact`)
    REFERENCES `ClassHub-Development`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ClassHub-Development`.`Courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassHub-Development`.`Courses` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` INT(11) UNSIGNED NOT NULL,
  `semester` ENUM('FAL', 'WIN', 'SPR', 'SUM') NOT NULL,
  `year` INT(4) NOT NULL,
  `subject` VARCHAR(4) NOT NULL,
  `code` INT(4) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `seats_available` INT(5) NULL DEFAULT NULL,
  UNIQUE INDEX `Course_ID_UNIQUE` (`id` ASC),
  INDEX `school2course_idx` (`school_id` ASC),
  CONSTRAINT `school2course`
    FOREIGN KEY (`school_id`)
    REFERENCES `ClassHub-Development`.`School` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ClassHub-Development`.`Announcements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassHub-Development`.`Announcements` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `course_id` INT(11) UNSIGNED NOT NULL,
  `user_id` INT(11) UNSIGNED NOT NULL,
  `date` DATETIME NOT NULL,
  `title` VARCHAR(80) NOT NULL,
  `body` LONGTEXT NOT NULL,
  `term` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `ID_UNIQUE` (`id` ASC),
  INDEX `course2announcement_idx` (`course_id` ASC),
  INDEX `user2announcement_idx` (`user_id` ASC),
  CONSTRAINT `course2announcement`
    FOREIGN KEY (`course_id`)
    REFERENCES `ClassHub-Development`.`Courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user2announcement`
    FOREIGN KEY (`user_id`)
    REFERENCES `ClassHub-Development`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ClassHub-Development`.`Course_History`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassHub-Development`.`Course_History` (
  `user_id` INT(11) UNSIGNED NOT NULL,
  `course_id` INT(11) UNSIGNED NOT NULL,
  `role` ENUM('PROFESSOR', 'STUDENT', 'TA') NOT NULL,
  `grade` FLOAT NULL DEFAULT NULL,
  INDEX `user2course_history_idx` (`user_id` ASC),
  CONSTRAINT `user2course_history`
    FOREIGN KEY (`user_id`)
    REFERENCES `ClassHub-Development`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ClassHub-Development`.`Message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassHub-Development`.`Message` (
  `id` INT(11) UNSIGNED NOT NULL,
  `sender_id` INT(11) UNSIGNED NOT NULL,
  `recipient_id` INT(11) UNSIGNED NOT NULL,
  `read` TINYINT(4) NOT NULL,
  `deleted` TINYINT(4) NOT NULL,
  `reported` TINYINT(4) NULL DEFAULT NULL,
  `reviewer_id` INT(11) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `ID_UNIQUE` (`id` ASC),
  INDEX `sender2message_idx` (`sender_id` ASC),
  INDEX `recipient2message_idx` (`recipient_id` ASC),
  INDEX `reviewer2message_idx` (`reviewer_id` ASC),
  CONSTRAINT `recipient2message`
    FOREIGN KEY (`recipient_id`)
    REFERENCES `ClassHub-Development`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `reviewer2message`
    FOREIGN KEY (`reviewer_id`)
    REFERENCES `ClassHub-Development`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `sender2message`
    FOREIGN KEY (`sender_id`)
    REFERENCES `ClassHub-Development`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ClassHub-Development`.`Office_Hours`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassHub-Development`.`Office_Hours` (
  `user_id` INT(11) UNSIGNED NOT NULL,
  `course_id` INT(11) UNSIGNED NOT NULL,
  `date` DATE NOT NULL,
  `start` TIME NOT NULL,
  `end` TIME NOT NULL,
  `location` VARCHAR(50) NOT NULL,
  INDEX `user2office_hours_idx` (`user_id` ASC),
  INDEX `course2office_hours_idx` (`course_id` ASC),
  CONSTRAINT `course2office_hours`
    FOREIGN KEY (`course_id`)
    REFERENCES `ClassHub-Development`.`Courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user2office_hours`
    FOREIGN KEY (`user_id`)
    REFERENCES `ClassHub-Development`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ClassHub-Development`.`Password_Reset`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassHub-Development`.`Password_Reset` (
  `user_id` INT(11) UNSIGNED NOT NULL,
  `token` CHAR(60) NOT NULL,
  INDEX `user2pass_reset_idx` (`user_id` ASC),
  CONSTRAINT `user2pass_reset`
    FOREIGN KEY (`user_id`)
    REFERENCES `ClassHub-Development`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ClassHub-Development`.`School_Enrollment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassHub-Development`.`School_Enrollment` (
  `user_id` INT(10) UNSIGNED NOT NULL,
  `school_id` INT(10) UNSIGNED NOT NULL,
  `primary_role` ENUM('STUDENT', 'PROFESSOR', 'ADMINISTRATOR') NOT NULL,
  INDEX `user_id_idx` (`user_id` ASC),
  INDEX `school2enrollment_idx` (`school_id` ASC),
  CONSTRAINT `school2enrollment`
    FOREIGN KEY (`school_id`)
    REFERENCES `ClassHub-Development`.`School` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user2enrollment`
    FOREIGN KEY (`user_id`)
    REFERENCES `ClassHub-Development`.`School` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ClassHub-Development`.`Temp_Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClassHub-Development`.`Temp_Users` (
  `email` VARCHAR(120) NOT NULL,
  `school_id` INT(11) UNSIGNED NOT NULL,
  `token` VARCHAR(60) NOT NULL,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `school2temp_user_idx` (`school_id` ASC),
  CONSTRAINT `school2temp_user`
    FOREIGN KEY (`school_id`)
    REFERENCES `ClassHub-Development`.`School` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
