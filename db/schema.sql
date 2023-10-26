CREATE TABLE purrpooddb.Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  user_role ENUM('customer', 'admin') NOT NULL
);

CREATE TABLE purrpooddb.PetFood (
  food_id INT AUTO_INCREMENT PRIMARY KEY,
  food_name VARCHAR(255) NOT NULL,
  fodd_description TEXT NOT NULL,
  category VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  food_image BLOB
);

CREATE TABLE purrpooddb.Carts (
  cart_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  food_id INT,
  quantity INT,
  added_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (customer_id) REFERENCES Users(user_id),
  FOREIGN KEY (food_id) REFERENCES PetFood(food_id)
);

ALTER TABLE purrpooddb.Carts
DROP FOREIGN KEY fk_customer_id;

ALTER TABLE purrpooddb.Carts
ADD CONSTRAINT fk_customer_id FOREIGN KEY (customer_id)
REFERENCES purrpooddb.Users(user_id)
ON DELETE CASCADE;

ALTER TABLE purrpooddb.Carts
DROP FOREIGN KEY fk_food_id;

ALTER TABLE purrpooddb.Carts
ADD CONSTRAINT fk_food_id FOREIGN KEY (food_id)
REFERENCES purrpooddb.PetFood(food_id)
ON DELETE CASCADE;

ALTER TABLE purrpooddb.Users
ADD CONSTRAINT UNIQUE (email);

ALTER TABLE purrpooddb.PetFood
MODIFY food_image VARCHAR(255); 

ALTER TABLE purrpooddb.PetFood
CHANGE fodd_description food_description TEXT NOT NULL;