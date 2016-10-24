-- CREATE TABLE Userinfo (
-- 	user_id SERIAL PRIMARY KEY,
-- 	email_address TEXT UNIQUE NOT NULL,
-- 	password TEXT,
-- 	fname TEXT,
-- 	lname TEXT, 
-- 	is_admin BOOLEAN DEFAULT FALSE,
-- 	is_establishment BOOLEAN DEFAULT FALSE,
-- 	is_customer BOOLEAN DEFAULT TRUE,
-- 	is_active BOOLEAN DEFAULT TRUE

-- );


CREATE TABLE UserAccount(
	user_id SERIAL PRIMARY KEY,
	email_address TEXT UNIQUE NOT NULL,
	password TEXT
	is_admin BOOLEAN DEFAULT FALSE,
	is_establishment BOOLEAN DEFAULT FALSE,
	is_customer BOOLEAN DEFAULT TRUE,
	is_active BOOLEAN DEFAULT TRUE

);

CREATE TABLE UserProfile(
	user_id INT REFERENCES UserAccount(user_id),
	fname TEXT,
	lname TEXT,
	user_id INT REFERENCES UserAccount(user_id)


);

CREATE TABLE Establishment(
	establishment_name TEXT,
	establishment_is_active BOOLEAN DEFAULT TRUE,
	user_id INT REFERENCES UserAccount(user_id)

);

CREATE TABLE BillingAddress(
	postalcode TEXT,
    brgy TEXT,
    city TEXT,
    state TEXT,
    pnum TEXT,
    user_id INT REFERENCES	Userinfo(user_id)
    street TEXT,

);

CREATE TABLE PermanentAddress(
	postalcode TEXT,
    brgy TEXT,
    city TEXT,
    state TEXT,
    pnum TEXT,
    user_id INT REFERENCES	Userinfo(user_id)
    street TEXT,

);


CREATE TABLE Product(
	product_id SERIAL PRIMARY KEY,
	product_name TEXT,
	product description TEXT,
	product_gender INT REFERENCES Gender(gender_id),
	product_catalog INT REFERENCES Catalog(catalog_id),
	product_category INT REFERENCES Category(category_id),
	product_subcategory INT REFERENCES SubCategory(subcategory_id)
	product_color INT REFERENCES Color(color_id)

);

CREATE TABLE Gender(
	gender_id SERIAL PRIMARY KEY,
	gender_name TEXT
	 
);

CREATE TABLE Catalog(
	catalog_id SERIAL PRIMARY KEY,
	catalog_name TEXT
	gender_id INT REFERENCES Gender(gender_id)

);

CREATE TABLE Category(
	category_id SERIAL PRIMARY KEY,
	category_name TEXT,
	catalog_id INT REFERENCES Catalog(catalog_id)

);

CREATE TABLE SubCategory(
	subcategory_id SERIAL PRIMARY KEY,
	category_name TEXT,
	category_id INT REFERENCES Catalog(category_id)

);

CREATE TABLE Color(
	color_id SERIAL PRIMARY KEY,
	color TEXT,
);

CREATE TABLE PriceRange(

);

CREATE TABLE Image(
);

CREATE TABLE Size(

);


