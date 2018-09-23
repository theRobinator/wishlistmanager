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
