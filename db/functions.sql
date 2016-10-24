--User Account
create or replace function new_user(p_email text, p_password text) returns text as
$$
declare
	v_email text;
	v_res text;

begin 
	select into v_email email_address from Userinfo where email_address = p_email;

		if v_email isnull then
			insert into Userinfo(email_address, password)
				values(p_email, p_password);
			v_res = 'Ok';
		else 
			v_res = 'User already exist';
		end if;
		return v_res;
	end;
$$
	language 'plpgsql' 

--Add User
--select new_user('email', 'password', 'fname', 'lname', 'is_admin', 'is_establishment', 'is_customer' );

create or replace function get_users(out int, out text, out text, out text, out text, out boolean, out boolean, out boolean, out boolean) returns setof record as
$$
	select user_id, email_address, password, fname, lname, is_admin, is_establishment, is_customer, is_active from Userinfo;
$$
	language 'sql';