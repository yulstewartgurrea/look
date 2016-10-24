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
			v_res = 'User already exist';
		end if;
		return v_res;
	end;
$$
	language 'plpgsql' 

create or replace function new_establishment(p_email text, p_password text) returns text as
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
			v_res = 'User already exist';
		end if;
		return v_res;
	end;
$$
	language 'plpgsql'


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
			v_res = 'User already exist';
		end if;
		return v_res;
	end;
$$
	language 'plpgsql' 


--Add UserAccount
--select new_admin('email', 'password');
--select new_establishment('email', 'password');
--select new_customer('email', 'password');

create or replace function get_users(out int, out text, out text, out boolean, out boolean, out boolean, out boolean) returns setof record as
$$
	select user_id, email_address, password, is_admin, is_establishment, is_customer, is_active from UserAccount;
$$
	language 'sql';