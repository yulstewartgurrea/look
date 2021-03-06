-- Login
create or replace function login(p_email text, p_password text) returns text as
$$
declare
	v_email text;
	v_res text;

begin
	select into v_email email_address from UserAccount where email_address = p_email and password = p_password;
		if v_email isnull or p_email = '' or p_password = '' then
			v_res = 'Invalid email or password';
		else
			v_res = 'Login successful';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get password
create or replace function get_password(p_email text) returns boolean as
$$
declare
	v_password text;
begin
	select into v_password password from UserAccount where email_address = p_email;
    if v_password isnull then
   		v_password = 'null';
    end if;
    return v_password;
end;
$$
	language 'plpgsql';

-- get info of user logged in

create or replace function get_loginrole(in p_email text, out boolean, out boolean,	out boolean,
										out boolean) returns setof record as
$$
	select is_admin, is_establishment, is_customer, is_active from UserAccount where email_address = p_email;
$$
	language 'sql';	

-- Login role with users email
create or replace function get_userbyemail(in p_email text, out text, out int, out boolean,
                                           out boolean, out boolean ,out boolean, out text, out text, out text) returns setof record as
$$
	select email_address, user_id, is_admin, is_establishment, is_customer, is_active, fname, lname, img from UserAccount where email_address = p_email;
$$
	language 'sql';

-- Get User by id
create or replace function get_userbyid(in p_user_id int, out text, out int, out boolean,
                                           out boolean, out boolean ,out boolean, out text, out text, out text) returns setof record as
$$
	select email_address, user_id, is_admin, is_establishment, is_customer, is_active, fname, lname, img from UserAccount where user_id = p_user_id;
$$
	language 'sql';

-- Get userprofile by id
create or replace function get_userprofile(in p_user_id int, out int, out text, out text, out text, out text,
							out text, out text, out text, out text, out text) returns setof record as
$$
	select UserAccount.user_id, UserAccount.email_address, UserAccount.fname, UserAccount.lname, UserAccount.img,
	BillingAddress.postalcode, BillingAddress.brgy, BillingAddress.city, BillingAddress.street, BillingAddress.pnum
	from UserAccount CROSS JOIN BillingAddress where UserAccount.user_id = p_user_id
	and BillingAddress.user_id = p_user_id;
$$
	language 'sql'

create or replace function get_userprofile(in p_user_id int, out int, out text, out text, out text, out text,
							out text, out text, out text, out text, out text,
							out text, out text, out text, out text, out text) returns setof record as
$$
	select UserAccount.user_id, UserAccount.email_address, UserAccount.fname, UserAccount.lname, UserAccount.img,
	BillingAddress.postalcode, BillingAddress.brgy, BillingAddress.city, BillingAddress.street, BillingAddress.pnum,
	PermanentAddress.postalcode, PermanentAddress.brgy, PermanentAddress.city, PermanentAddress.street, PermanentAddress.pnum 
	from UserAccount CROSS JOIN BillingAddress CROSS JOIN PermanentAddress where UserAccount.user_id = p_user_id
	and BillingAddress.user_id = p_user_id and PermanentAddress.user_id = p_user_id;
$$
	language 'sql'

--User Account
create or replace function new_admin(p_email text, p_password text) returns text as
$$
declare
	v_email text;
	v_res text;

begin
	select into v_email email_address from UserAccount where email_address = p_email;

		if v_email isnull then
			if p_email = '' then
				v_res = 'Error';
			else
				insert into UserAccount(email_address, password, is_admin)
					values(p_email, p_password, TRUE);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Email already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get admins
create or replace function get_admins(out int, out text, out boolean, out boolean) returns setof record as
$$
  select user_id, email_address, is_admin, is_active from UserAccount where is_admin = TRUE and is_active = TRUE;
$$
  language 'sql';

create or replace function new_establishment_personnel(p_email text, p_password text) returns text as
$$
declare
	v_email text;
	v_res text;

begin 
	select into v_email email_address from UserAccount where email_address = p_email;

		if v_email isnull then
			if p_email = '' then
				v_res = 'Error';
			else
				insert into UserAccount(email_address, password, is_establishment)
					values(p_email, p_password, TRUE);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Email already exists!';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get establishment_personnel
create or replace function get_establishment_personnels(out int, out text, out boolean, out boolean) returns setof record as
$$
  select user_id, email_address, is_establishment, is_active from UserAccount where is_establishment = TRUE and is_active = TRUE;
$$
  language 'sql';


create or replace function new_customer(p_email text, p_password text) returns text as
$$
declare
	v_email text;
	v_res text;

begin
	select into v_email email_address from UserAccount where email_address = p_email;

		if v_email isnull then
			if p_email = '' then
				v_res = 'Error';
			else
				insert into UserAccount(email_address, password, is_customer)
					values(p_email, p_password, TRUE);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Email Already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get customer
create or replace function get_customers(out int, out text, out boolean, out boolean) returns setof record as
$$
  select user_id, email_address, is_customer, is_active from UserAccount where is_customer = TRUE and is_active = TRUE;
$$
  language 'sql';

--Add UserAccount
--select new_admin('email', 'password');
--select new_establishment('email', 'password');
--select new_customer('email', 'password');

create or replace function get_users(out int, out text, out text, out boolean, out boolean, out boolean, out boolean) returns setof record as
$$
	select user_id, email_address, password, is_admin, is_establishment, is_customer, is_active from UserAccount;
$$
	language 'sql';

-- Get only Admin
-- select email_address from Useraccount where is_admin=True

-- Create billingaddress
create or replace function new_billingaddress(p_user_id int, p_postalcode text, p_brgy text, p_city text, p_street text, p_pnum text) returns text as
$$
declare
	v_user_id text;
	v_res text;

begin
	select into v_user_id BillingAddress.user_id from BillingAddress where BillingAddress.user_id = p_user_id;

		if v_user_id isnull or v_user_id = '' then	
			insert into BillingAddress(user_id,postalcode, brgy, city, street, pnum )
				values(p_user_id, p_postalcode, p_brgy, p_city, p_street, p_pnum);
				v_res = 'Ok';
		else 
			v_res = 'Billing Address already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- select new_billingaddress(4, '9200', 'Hinaplanon', 'Iligan', '#16 Purok 9 Bayug', '0995-631-9907');

-- Get Billing Address
create or replace function get_billingaddressbyid(in p_user_id int, out int, out text, out text, out text, out text, out text) returns setof record as
$$
	select user_id, postalcode, brgy, city, street, pnum from BillingAddress where user_id = p_user_id;
$$
	language 'sql';

-- Get Permanent Address
create or replace function get_permanentaddressbyid(in p_user_id int, out int, out text, out text, out text, out text, out text) returns setof record as
$$
	select user_id, postalcode, brgy, city, street, pnum from PermanentAddress where user_id = p_user_id;
$$
	language 'sql';

--Add Establishment
create or replace function new_establishment_name(p_establishment_name text, p_user_id int) returns text as
$$
declare
	v_establishment_name text;
	v_res text;

begin
	select into v_establishment_name establishment_name from Establishment where establishment_name = p_establishment_name;

		if v_establishment_name isnull then
			if p_establishment_name = '' then
				v_res = 'Error';
			else
				insert into Establishment(establishment_name, user_id)
					values(p_establishment_name, p_user_id);
					v_res = 'Ok';
			end if;
		else 
			v_res = 'Establishment name already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get all establishments
create or replace function get_establishment(out int, out text, out boolean, out int) returns setof record as
$$
	select establishment_id, establishment_name, establishment_is_active, user_id from Establishment;
$$
	language 'sql';

-- Get establishments by id
create or replace function get_establishmentbyid(In par_establishment_id int, out text, out boolean) returns setof record as
$$
	select establishment_name, establishment_is_active from Establishment where establishment_id = par_establishment_id;
$$
	language 'sql';

-- Update establishment
create or replace function update_establishment(par_establishment_id int, par_establishment_name text, par_establishment_is_active boolean) returns void as
$$
	update Establishment
	set
		establishment_name = par_establishment_name,
		establishment_is_active = par_establishment_is_active

	where establishment_id = par_establishment_id;

$$
	language 'sql';

-- UPDATE COMPANY SET SALARY = 15000 WHERE ID = 3;

--Add Catalog
create or replace function new_catalog(p_catalog_name text) returns text as
$$
declare 
	v_catalog_name text;
	v_res text;

begin
	select into v_catalog_name catalog_name from Catalog where catalog_name = p_catalog_name;

		if v_catalog_name isnull then
			if p_catalog_name = '' then
				v_res = 'Error';
			else
				insert into Catalog(catalog_name)
					values(p_catalog_name);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Catalog already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get all catalog
create or replace function get_catalog(out int, out text) returns setof record as
$$ 
	select catalog_id, catalog_name from Catalog;
$$
	language 'sql';

-- Update Catalog

create or replace function update_catalog(p_catalog_id int, p_catalog_name text) returns void as 
$$
	update Catalog
	set 
		catalog_name = p_catalog_name

	where 
		catalog_id = p_catalog_id;
$$
	language 'sql';

--Add Gender 
create or replace function new_gender(p_gender_name text) returns text as
$$
declare
	v_gender_name text;
	v_res text;

begin
	select into v_gender_name gender_name from Gender where gender_name = p_gender_name;

		if v_gender_name isnull then
			if p_gender_name = '' then
				v_res = 'Error';
			else
				insert into Gender(gender_name)
					values(p_gender_name);
				v_res = 'Ok';
			end if;
		else 
			v_res = 'Gender already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

--Get gender
create or replace function get_gender(out int, out text) returns setof record as
$$
	select gender_id, gender_name from Gender;
$$
	language 'sql';

create or replace function get_gender2(out int, out text) returns setof record as
$$
	select gender_id, gender_name 
	from Gender
	where gender_name = 'Male' or gender_name ='Female';
$$
	language 'sql';

create or replace function update_gender(p_gender_id int, p_gender_name) returns void as
$$
	update Gender
	set
		gender_name = p_gender_name
	where
		gender_id = p_gender_id;
$$
	language 'sql';

--Add Category
create or replace function new_category(p_category_name text, p_catalog_id int, p_gender_id int) returns text as
$$
declare 
	v_category_name text;
	v_res text;

begin
	if v_category_name isnull or v_category_name = '' then
		insert into Category(category_name, catalog_id, gender_id)
			values(p_category_name, p_catalog_id, p_gender_id);
				v_res = 'Ok';
	end if;
	return v_res;
end;
$$
	language 'plpgsql';

# Get category by catalog and gender Note: Not only male but also female
create or replace function get_categorymale(out int, out text, out int, out int, In par_catalog_id int, In par_gender_id int ) returns setof record as
$$
	select category_id, category_name, catalog_id, gender_id
	from Category
	where catalog_id = par_catalog_id and gender_id = par_gender_id;
$$
	language 'sql';

create or replace function get_categorybycatalog(out int, out text, out int, out int, In par_catalog_id int) returns setof record as
$$
	select category_id, category_name, catalog_id, gender_id
	from Category
	where catalog_id = par_catalog_id;
$$
	language 'sql';

-- Get all category
create or replace function get_category(out int, out text, out int, out int) returns setof record as
$$
	select category_id, category_name, catalog_id, gender_id from Category;
$$
	language 'sql';

create or replace function update_category(p_category_id int, p_category_name text, p_catalog_id int, p_gender_id int) returns void as
$$
	update Category
	set 
		category_name = p_category_name,
		catalog_id = p_catalog_id,
		gender_id = p_gender_id
	where
		category_id = p_category_id;
$$
	language 'sql';

--Add Subcategory
create or replace function new_subcategory(p_subcategory_name text, p_category_id int) returns text as
$$
declare 
	v_subcategory_name text;
	v_res text;

begin
	select into v_subcategory_name subcategory_name from SubCategory where subcategory_name = p_subcategory_name;

		if v_subcategory_name isnull then
			if p_subcategory_name = '' or p_category_id = null then
				v_res = 'Error';
			else
				insert into SubCategory(subcategory_name, category_id)
					values(p_subcategory_name, p_category_id);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Subcategory already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get all subcategory
create or replace function get_subcategory(out int, out text, out int ) returns setof record as
$$
	select subcategory_id, subcategory_name, category_id from Subcategory;
$$
	language 'sql';

create or replace function update_subcategory(p_subcategory_id int, p_subcategory_name text, p_category_id int) returns void as
$$
	update Subcategory
	set 
		subcategory_name = p_subcategory_name,
		category_id = p_category_id
	where 
		subcategory_id = p_subcategory_id;
$$
	language 'sql';

--Add Color
create or replace function new_color(p_color_name text) returns text as
$$
declare 
	v_color_name text;
	v_res text;

begin
	select into v_color_name color_name from Color where color_name = p_color_name;

		if v_color_name isnull then
			if p_color_name = '' then
				v_res = 'Error';
			else
				insert into Color(color_name)
					values(p_color_name);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Color already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get all color
create or replace function get_color(out int, out text) returns setof record as
$$
	select color_id, color_name from Color;
$$
	language 'sql';

-- Add product
create or replace function new_product(p_price numeric, p_image text, p_product_name text, p_product_description text, p_product_catalog int, p_product_gender int,
										p_product_category int, p_product_subcategory int, p_establishment_id int) returns text as
$$
declare 
	v_product_name text;
	v_res text;

begin 
	select into v_product_name product_name from Product where product_name = p_product_name;

		if v_product_name isnull then
			if p_product_name = '' or p_image = '' or p_product_description = '' or p_price = null or p_product_catalog = null or
				 p_product_gender = null or p_product_category = null or p_product_subcategory = null then
				v_res = 'Error';
			else
				insert into Product(product_name, image, product_description, price, catalog_id, gender_id, category_id,
								subcategory_id, establishment_id)
				values(p_product_name, p_image, p_product_description, p_price, p_product_catalog, p_product_gender, p_product_category,
							 p_product_subcategory, p_establishment_id);
							 v_res = 'Ok';
				end if;
		else
			v_res = 'Product already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- select new_product(9.00, 'prod', 'prod', 'prod', 1 , 2, 4, 4, 1);
-- select new_product(9.00, 'prod1', 'prod', 'prod', 1 , 2, 4, 4, 1);
-- select new_product(9.00, 'prod2', 'prod', 'prod', 1 , 2, 4, 4, 1);
-- select new_product(9.00, 'prod3', 'prod', 'prod', 1 , 2, 4, 4, 1);


create or replace function update_product(p_product_id int, p_product_name text, p_product_description text, p_price numeric,
							p_product_image text, p_catalog_id int, p_gender_id int, p_category_id int, p_subcategory_id int,
							p_establishment_id int) returns void as
$$
	update Product
	set 
		product_name = p_product_name,
		product_description = p_product_description,
		price = p_price,
		product_image = p_product_image,
		catalog_id = p_catalog_id,
		gender_id = p_gender_id,
		category_id = p_category_id,
		subcategory_id = p_subcategory_id,
		establishment_id = p_establishment_id

		where
		product_id = p_product_id

$$
	language 'sql';

-- Get all product
create or replace function get_product(out int, out text, out text, out numeric, out text, out int,
						out int, out int, out int, out int) returns setof record as
$$
	select product_id, product_name, product_description, price, image, catalog_id,
	gender_id, category_id, subcategory_id, establishment_id
	from Product;
$$
	language 'sql'; 

-- Get product by id 
create or replace function get_productby_id(In par_productid int, In par_establishmentid int, out int, out text, out text, out text, out numeric, out int,
                                           out text, out numeric, out numeric, out text,
                                            out int, out text, out text, out text, out text) returns setof record as
$$
	select Product.product_id, Product.product_name, Product.product_description, Product.image, Product.price, Product.establishment_id,
	Establishment.establishment_name, Establishment.latitude, Establishment.longitude, Establishment.establishment_location,
	Image.image_id, Image.image1, Image.image2, Image.image3, Image.image4
	from Product
	INNER JOIN Establishment ON Product.establishment_id = Establishment.establishment_id
	INNER JOIN Image ON Product.product_id = Image.product_id 
	where Product.product_id = par_productid and Establishment.establishment_id = par_establishmentid;
$$
	language 'sql';

-- -- Get product by catalog
create or replace function get_productby_catalog(In par_product_catalogid int, out int, out text, out numeric, out text, out int, out int) returns setof record as
$$
	select product_id, product_name, price, image, Product.catalog_id, Product.establishment_id
	from Product 
	where Product.catalog_id = par_product_catalogid;
$$
	language 'sql'; 

-- -- Get product by catalog and gender
create or replace function get_productby_catalog_gender(out int, out text, out numeric, out text, out int, out int, out int, In par_product_catalog int, In par_product_gender int) returns setof record as
$$
	select product_id, product_name, price, image, catalog_id, gender_id, Product.establishment_id
	from Product
	where Product.catalog_id = par_product_catalog and Product.gender_id = par_product_gender;
$$
	language 'sql';

create or replace function get_productby_catalog_category(out int, out text, out numeric, out text,
									out int, In par_product_catalog int, In par_product_category int) returns setof record as
$$
	select Product.product_id, Product.product_name, Product.price, Product.image, Product.establishment_id
	from Product
	where Product.catalog_id = par_product_catalog and Product.category_id = par_product_category;
$$
	language 'sql';

-- -- Get product by catalog, gender and category
create or replace function get_productby_catalog_gender_category(out int, out text, out numeric, out text, out int, In par_product_catalog int, In par_product_gender int,
							In par_product_category int) returns setof record as
$$
	select product_id, product_name, price, image, Product.establishment_id from Product where catalog_id = par_product_catalog and gender_id = par_product_gender and
			category_id = par_product_category;
$$
	language 'sql';

-- -- Get product by catalog, gender, category and subcategory
create or replace function get_productby_catalog_gender_category_subcategory(out int, out text, out numeric, out text, In par_product_catalog int, In par_product_gender int,
							In par_product_category int, In par_product_subcategory int) returns setof record as
$$
	select product_id, product_name, price, image from Product where catalog_id = par_product_catalog and gender_id = par_product_gender and
			category_id = par_product_category and subcategory_id = par_product_subcategory;
$$
	language 'sql';

-- Get product image 
create or replace function get_product_image(out int, out text, out text, out text, out text, In par_image_id int) returns setof record as
$$
	select image_id, image1, image2, image3, image4 from Image where product_id = par_image_id;
$$
	language 'sql';

create or replace function addtocart(p_cart_id int, p_product_id int, p_user_id int) returns text as
$$
declare 
	v_product_id text;
	v_res text;

begin 
	if v_product_id isnull or v_product_id = '' then
		insert to Cart(cart_id, product_id, user_id)
			values(p_cart_id, p_product_id, p_user_id);
				v_res = 'Ok';
	end if;
		return v_res;
end;
$$
	language 'plpgsql';

create or replace function get_allcart(out int, out int, out int, out numeric, out boolean) returns setof record as
$$
	select cart_id, product_id, user_id, is_checkedout from Cart;
$$
	language 'sql';

create or replace function get_productbycartuser(in p_cartid int, in p_userid int, out int, out int, out boolean,
					out int, out text, out text, out numeric, out text, out int) returns setof record as
$$
	select Cart.cart_id, Cart.user_id, is_checkedout,
	Product.product_id, Product.product_name, Product.product_description, Product.price, Product.image, Product.establishment_id
	from Cart INNER JOIN Product ON Cart.product_id = Product.product_id
	where cart_id = p_cartid and user_id = p_userid and Cart.product_id = Product.product_id;
$$
	language 'sql';