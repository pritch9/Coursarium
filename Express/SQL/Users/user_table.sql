CREATE TABLE `User` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `school_id` int(11) unsigned NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` binary(60) NOT NULL,
  `salt` char(16) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `full_name` varchar(100) AS (last_name + ", " + first_name) VIRTUAL,
  `nick_name` varchar(50) DEFAULT NULL,
  `avi` varchar(120) DEFAULT NULL,
  `sid` char(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`email`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='The UserRepository''s basic account information.  Used to link personal information to each account (id)';
