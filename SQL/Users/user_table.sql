create table User
(
	id int auto_increment PRIMARY KEY ,
	school_id int not null,
	email varchar(120) not null,
	password binary(60) not null,
	salt char(16) not null,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	full_name VARCHAR(100) as (last_name + ", " + first_name),
	nick_name VARCHAR(50) null,
	avi VARCHAR(120) null,
	sid CHAR(64) null,
	UNIQUE (id, email)
)
comment 'The user''s basic account information.  Used to link personal information to each account (id)';
