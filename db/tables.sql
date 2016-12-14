CREATE TABLE UserAccount(
	user_id SERIAL PRIMARY KEY,
	email_address TEXT UNIQUE NOT NULL,
	password TEXT,
	is_admin BOOLEAN DEFAULT FALSE,
	is_establishment BOOLEAN DEFAULT FALSE,
	is_customer BOOLEAN DEFAULT FALSE,
	is_active BOOLEAN DEFAULT TRUE

);

CREATE TABLE UserProfile(
	user_id INT REFERENCES UserAccount(user_id),
	fname TEXT,
	lname TEXT,
	img TEXT

);

CREATE TABLE BillingAddress(
	postalcode TEXT,
	brgy TEXT,
	city TEXT,
	street TEXT,
	pnum TEXT,
	user_id INT REFERENCES UserAccount(user_id)

);

CREATE TABLE PermanentAddress(
	postalcode TEXT,
	brgy TEXT,
	city TEXT,
	street TEXT,
	pnum TEXT,
	user_id INT REFERENCES UserAccount(user_id)

);

CREATE TABLE Establishment(
	establishment_id SERIAL PRIMARY KEY,
	establishment_name TEXT,
	establishment_is_active BOOLEAN DEFAULT TRUE,
	user_id INT REFERENCES UserAccount(user_id)

);

CREATE TABLE Catalog(
	catalog_id SERIAL PRIMARY KEY,
	catalog_name TEXT

);

CREATE TABLE Gender(
	gender_id SERIAL PRIMARY KEY,
	gender_name TEXT

);

CREATE TABLE Category(
	category_id SERIAL PRIMARY KEY,
	category_name TEXT,
	catalog_id INT REFERENCES Catalog(catalog_id),
	gender_id INT REFERENCES Gender(gender_id)

);

CREATE TABLE SubCategory(
	subcategory_id SERIAL PRIMARY KEY,
	subcategory_name TEXT,
	category_id INT REFERENCES Category(category_id)

);

CREATE TABLE Color(
	color_id SERIAL PRIMARY KEY,
	color_name TEXT
);

CREATE TABLE Product(
	product_id SERIAL PRIMARY KEY,
	image TEXT,
	price NUMERIC,
	product_name TEXT,
	product_description TEXT,
	date_added DATE DEFAULT CURRENT_DATE,
	catalog_id INT REFERENCES Catalog(catalog_id),
	gender_id INT REFERENCES Gender(gender_id),
	category_id INT REFERENCES Category(category_id),
	subcategory_id INT REFERENCES SubCategory(subcategory_id),
	establishment_id INT REFERENCES Establishment(establishment_id)

);

CREATE TABLE Color_Product(
	color_id INT REFERENCES Color(color_id),
	product_id INT REFERENCES Product(product_id),
	CONSTRAINT color_product_id PRIMARY KEY (color_id, product_id)

);

CREATE TABLE Stocks(
	stocks_id SERIAL PRIMARY KEY,
	num INT,
	size_id INT REFERENCES Size(size_id)

);

CREATE TABLE Size(
	size_id SERIAL PRIMARY KEY,
	size_num TEXT,
	product_count NUMERIC,
	product_id INT REFERENCES Product(product_id)
);

CREATE TABLE Image(
	image_id SERIAL PRIMARY KEY,
	image1 TEXT,
	image2 TEXT,
	image3 TEXT,
	image4 TEXT,
	product_id INT REFERENCES Product(product_id)

);

CREATE TABLE PriceRange(

);

CREATE TABLE Image(
);

CREATE TABLE Cart(
  cart_id SERIAL PRIMARY KEY,
  total NUMERIC ,
  date_added DATE DEFAULT CURRENT_DATE,
  product_id INT REFERENCES Product(product_id)
);

-- CREATE TABLE Cart_items(
--   cart_id INT REFERENCES Cart(cart_id),
--   product_id INT REFERENCES Product(product_id),
--   quantity INT,
--   date_added DATE DEFAULT CURRENT_DATE
-- );



