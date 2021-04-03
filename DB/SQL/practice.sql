CREATE TABLE products (
  id INT,
  name VARCHAR(50),
  price INT,
  on_sale BOOLEAN
)

ALTER TABLE products ADD COLUMN featured boolean;

CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range > 0 and price_range < 6)
);

INSERT INTO restaurants (name, location, price_range) VALUES ('mcdonalds', 'ny', 3);

CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGSERIAL NOT NULL,
  author VARCHAR(50) NOT NULL,
  rating INT NOT NULL check(rating > 0 and rating < 6),
  text TEXT NOT NULL,
  CONSTRAINT fk_restaurant
    FOREIGN KEY(restaurant_id)
      REFERENCES restaurants(id)
);

INSERT INTO reviews (restaurant_id, author, rating, text) VALUES (123, 'xxx', 3, 'xxx');
 
SELECT AVG(rating) from reviews WHERE restaurant_id = 71;

SELECT restaurants.id, name, location, price_range, TRUNC(AVG(rating), 2) AS reviews_average, COUNT(rating) AS reviews_count
FROM restaurants
LEFT JOIN reviews
ON restaurants.id = reviews.restaurant_id
GROUP BY restaurants.id;