DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(100) NOT NULL,
  dept VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) default 0.00,
  stock INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item, dept, price, stock)
 VALUES
  ('Clarks','Shoes',59.99,19),
  ('Gold Nugget','Jewelery',1286.11,1),
  ('Samsung 4kHD 32inch TV','Electroncis',369.99,4),
  ('Souls (Human)','Human Resources',83116.66,19),
  ('Pearl Necklace','Jewelery',249.99,9),
  ('Boot to the Head','Customer Service',00.00,999),
  ('Converse Hightops','Shoes',29.99,13),
  ('iHome','Electronics',149.99,6),
  ('Water of Youth','Beauty',9999.99,0),
  ('PUR Foundation','Beauty',21.49,16),
  ('M&M Peanut Big Pack','Customer Service',14.49,27);

SELECT * FROM products