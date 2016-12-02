--User Account
create or replace function new_admin(p_email text, p_password text) returns text as
$$
declare
	v_email text;
	v_res text;

begin 
	select into v_email email_address from UserAccount where email_address = p_email;

		if v_email isnull then
			insert into UserAccount(email_address, password, is_admin)
				values(p_email, p_password, TRUE);
			v_res = 'Ok';
		else 
			v_res = 'Error';
		end if;
		return v_res;
end;
$$
	language 'plpgsql'; 

create or replace function new_establishment_personnel(p_email text, p_password text) returns text as
$$
declare
	v_email text;
	v_res text;

begin 
	select into v_email email_address from UserAccount where email_address = p_email;

		if v_email isnull then
			insert into UserAccount(email_address, password, is_establishment)
				values(p_email, p_password, TRUE);
			v_res = 'Ok';
		else 
			v_res = 'Error';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';


create or replace function new_customer(p_email text, p_password text, p_is_customer boolean) returns text as
$$
declare
	v_email text;
	v_res text;

begin 
	select into v_email email_address from UserAccount where email_address = p_email;

		if v_email isnull then
			insert into UserAccount(email_address, password, is_customer)
				values(p_email, p_password, TRUE);
			v_res = 'Ok';
		else 
			v_res = 'Error';
		end if;
		return v_res;
end;
$$
	language 'plpgsql'; 


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

--Add Establishment
create or replace function new_establishment(p_establishment_name text, p_user_id int) returns text as
$$
declare
	v_establishment_name text;
	v_res text;

begin
	select into v_establishment_name establishment_name from Establishment where establishment_name = p_establishment_name;

		if v_establishment_name isnull then
			insert into Establishment(establishment_name, user_id)
				values(p_establishment_name, p_user_id);
			v_res = 'Ok';
		else 
			v_res = 'Error';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get all establishments
create or replace function get_establishment(out int, out text, out boolean, out int) returns setof record as
$$
	select establishment_id, establishment_name, is_active, user_id from Establishment;
$$
	language 'sql'

-- Get establishments by id
create or replace function get_establishmentbyid(In par_establishment_id int, par_establishment_name text, par_establishment_is_active boolean) returns setof record as
$$
	select establishment_name, establishment_is_active from Establishment where establishment_id = par_establishment_id

-- Update establishment
create or replace function update_establishment(par_establishment_id int, par_establishment_name text, par_establishment_is_active boolean) returns setof records as
$$
	update Establishment
	set 
		establishment_name = par_establishment_name,
		establishment_is_active = par_establishment_is_active

	where establishment_id = par_establish_id;

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
			insert into Catalog(catalog_name)
				values(p_catalog_name);
			v_res = 'Ok';
		else
			v_res = 'Error';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get all catalog
create or replace function get_catalog(out int, out text) returns setof record as
$$ 
	select catalog_id, catalog_name from  Catalog;
$$
	language 'sql'

--Add Gender 
create or replace function new_gender(p_gender_name text, p_catalog_id int) returns text as
$$
declare
	v_gender_name text;
	v_res text;

begin
	select into v_gender_name gender_name from Gender where gender_name = p_gender_name;

		if v_gender_name isnull then
			insert into Gender(gender_name, catalog_id)
				values(p_gender_name, p_catalog_id);
			v_res = 'Ok';
		else 
			v_res = 'Error';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

--Get gender
create or replace function get_gender(out int, out text, out int) returns setof record as
$$
	select gender_id, gender_name, catalog_id from Gender;
$$
	language 'sql'

--Add Category
create or replace function new_category(p_category_name text, p_catalog_id int) returns text as
$$
declare 
	v_category_name text;
	v_res text;

begin
	select into v_category_name category_name from Category where category_name = p_category_name;

		if v_category_name isnull then
			insert into Category(category_name, catalog_id)
				values(p_category_name, p_catalog_id);
			v_res = 'Ok';
		else
			v_res = 'Error';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get all category
create or replace function get_category(out int, out text) returns setof record as
$$
	select category_id, category_name from Gender;
$$
	language 'sql'

--Add Subcategory
create or replace function new_subcategory(p_subcategory_name text, p_category_id int) returns text as
$$
declare 
	v_subcategory_name text;
	v_res text;

begin
	select into v_subcategory_name subcategory_name from SubCategory where subcategory_name = p_subcategory_name;

		if v_subcategory_name isnull then
			insert into SubCategory(subcategory_name, category_id)
				values(p_subcategory_name, p_category_id);
			v_res = 'Ok';
		else
			v_res = 'Error';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get all subcategory
create or replace function get_subcategory(out int, out text) returns setof record as
$$
	select subcategory_id, subcategory_name from Subcategory;
$$
	language 'sql'

--Add Color
create or replace function new_color(p_color_name text) returns text as
$$
declare 
	v_color_name text;
	v_res text;

begin
	select into v_color_name color_name from Color where color_name = p_color_name;

		if v_color_name isnull then
			insert into Color(color_name)
				values(p_color_name);
			v_res = 'Ok';
		else
			v_res = 'Error';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get all color
create or replace function get_color(out int, out text) returns setof record as
$$
declare 
	select color_id, color_name from Color;
$$
	language 'sql'

-- Add product
create or replace function new_product(p_product_name text, p_product_description text, p_product_catalog text, p_product_gender text, p_product_category text,
									   p_product_subcategory text, p_product_color text) returns text as
&&
declare 
	v_product_name text,
	v_res text;

begin 
	select into v_product_name product_name from Product where product_name = p_product_name;

		if v_product_name isnull then
			insert into Product(product_name, product_description, product_catalog, product_gender, product_category,
								product_subcategory, product_color)
				values(p_product_name, p_product_description, p_product_catalog, p_product_gender, p_product_category,
						p_product_subcategory, p_product_color);
			v_res = 'Ok';
		else
			v_res = 'Error'
		end if;
		return v_res;
end;
$$ 
	language 'plpgsql';

-- Get product by id 

create or replace function get_productby_id(In par_id, out text out text) returns setof record as
$$
	select product_name, product_description from Product where product_id = par_id;
$$
	language 'sql'

-- Get product by catalog
create or replace function get_productby_catalog(out int, out text, In par_prodcut_catalog int) returns setof record as
$$
	select product_id, product_name, product_catalog from Product where par_product_catalog=catalog_id;
$$
	language 'sql'

-- Get product by catalog and gender
create or replace function get_productby_catalog_gender(out int, out text, In par_product_catalog int, In par_prodcut_gender int) returns setof record as
$$
	select product_id, product_name, product_catalog, product_gender from Product where par_product_catalog=product_catalog, par_prodcut_gender=product_gender;
$$
	language 'sql'	

-- Get product by catalog, gender and category
create or replace function get_productby_catalog_gender_category(out int, out text, In par_product_catalog int, In par_prodcut_gender int,
							In par_product_category int) returns setof record as
$$
	select product_id, product_name, product_catalog, product_gender from Product where par_product_catalog=product_catalog, par_prodcut_gender=product_gender,
			par_product_category = product_category;
$$
	language 'sql'	

-- Get product by catalog, gender, category and subcategory
create or replace function get_productby_catalog_gender_category_subcategory(out int, out text, In par_product_catalog int, In par_prodcut_gender int,
							In par_product_category int, In par_product_subcategory) returns setof record as
$$
	select product_id, product_name, product_catalog, product_gender from Product where par_product_catalog=product_catalog, par_prodcut_gender=product_gender,
			par_product_category = product_category, par_product_subcategory;
$$
	language 'sql'
