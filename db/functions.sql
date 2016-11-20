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
			v_res = 'Admin already exist';
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
			v_res = 'Establishment personel already exist';
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
			v_res = 'Customer already exist';
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
			v_res = 'Establishment already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

--Add Gender 
create or replace function new_gender(p_gender_name text) returns text as
$$
declare
	v_gender_name text;
	v_res text;

begin
	select into v_gender_name gender_name from Gender where gender_name = p_gender_name;

		if v_gender_name isnull then
			insert into Gender(gender_name)
				values(p_gender_name);
			v_res = 'Ok';
		else 
			v_res = 'Gender already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

--Add Catalog
create or replace function new_catalog(p_catalog_name text, p_gender_id int) returns text as
$$
declare 
	v_catalog_name text;
	v_res text;

begin
	select into v_catalog_name catalog_name from Catalog where catalog_name = p_catalog_name;

		if v_catalog_name isnull then
			insert into Catalog(catalog_name, gender_id)
				values(p_catalog_name, p_gender_id);
			v_res = 'Ok';
		else
			v_res = 'Catalog already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';


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
			v_res = 'Category already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

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
			v_res = 'SubCategory already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

--Add Color
create or replace function new_color(p_color text) returns text as
$$
declare 
	v_color text;
	v_res text;

begin
	select into v_color color from Color where color = p_color;

		if v_color isnull then
			insert into Color(color)
				values(p_color);
			v_res = 'Ok';
		else
			v_res = 'Color already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';






