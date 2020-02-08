CREATE DATABASE `wishlistmanager`;

use wishlistmanager;

CREATE TABLE `users` (
	id int unsigned PRIMARY KEY AUTO_INCREMENT,
	name varchar(128) NOT NULL,
	email varchar(128) NOT NULL
);

CREATE TABLE `items` (
	id int unsigned PRIMARY KEY AUTO_INCREMENT,
	ownerEmail varchar(128),
	description varchar(1024),
	buyerComments varchar(1024)
);

CREATE TABLE `secret_santa_themes` (
    `year` int(10) unsigned NOT NULL,
    `theme` varchar(128) NOT NULL,
    PRIMARY KEY (`year`)
);

CREATE TABLE `secret_santas` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `email` varchar(128) NOT NULL,
    `year` int(10) unsigned NOT NULL,
    `person` varchar(128) NOT NULL,
    PRIMARY KEY (`id`)
);
