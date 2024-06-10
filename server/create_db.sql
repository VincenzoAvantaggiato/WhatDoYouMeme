CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  salt varchar(255) NOT NULL,
  PRIMARY KEY (id)
) DEFAULT CHARSET=utf8;

CREATE TABLE images (
  id INT(11) NOT NULL AUTO_INCREMENT,
  image_path VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) DEFAULT CHARSET=utf8;

CREATE TABLE captions (
  id INT(11) NOT NULL AUTO_INCREMENT,
  caption VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) DEFAULT CHARSET=utf8;

CREATE TABLE image_caption (
  image_id INT(11) NOT NULL,
  caption_id INT(11) NOT NULL,
  PRIMARY KEY (image_id, caption_id),
  FOREIGN KEY (image_id) REFERENCES images(id),
  FOREIGN KEY (caption_id) REFERENCES captions(id)
) DEFAULT CHARSET=utf8;

