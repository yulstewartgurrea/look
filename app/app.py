from flask import Flask, jsonify, request, session
from config import *
from __init__ import *
import json, os, sys

app = Flask(__name__)

GENERIC_DOMAINS = "aero", "asia", "biz", "cat", "com", "coop", \
                  "edu", "gov", "info", "int", "jobs", "mil", "mobi", "museum", \
                  "name", "net", "org", "pro", "tel", "travel"


def invalid(emailaddress, domains=GENERIC_DOMAINS):
    """Checks for a syntactically invalid email address."""

    # Email address must be 7 characters in total.
    if len(emailaddress) < 7:
        return True  # Address too short.

    # Split up email address into parts.
    try:
        localpart, domainname = emailaddress.rsplit('@', 1)
        host, toplevel = domainname.rsplit('.', 1)
    except ValueError:
        return True  # Address does not have enough parts.

    # Check for Country code or Generic Domain.
    if len(toplevel) != 2 and toplevel not in domains:
        return True  # Not a domain name.

    for i in '-_.%+.':
        localpart = localpart.replace(i, "")
    for i in '-_.':
        host = host.replace(i, "")

    if localpart.isalnum() and host.isalnum():
        return False  # Email address is fine.
    else:
        return True  # Email address has funny characters.

@app.route('/')
def helloworld():
	return "hello world"

@app.route('/login', methods=['POST'])
def login():
	jsn = json.loads(request.data)
	res = spcall('login', (jsn['email_address'], jsn['password']))

	if 'Invalid email or password' in str(res):
		status = False
		return jsonify({'status': status, 'message': res[0][0]})

	if 'Login successful' in str(res):
		status = True
		role = get_loginrole(jsn['email_address'])
		# session['email_address'] = role[0][0]
		session['is_admin'] = role[0][0]
		session['is_establishment'] = role[0][1]
		session['is_customer'] = role[0][2]
		session['is_active'] = role[0][3]
		return jsonify({'status': status, 'message': res[0][0], 'admin': session['is_admin'],
						'establishment':session['is_establishment'], 'customer': session['is_customer'],
						'active': session['is_active']})

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.clear()
    return jsonify({'message': 'Successfuly logged out'})

def get_loginrole(email_address):
	return spcall('get_loginrole', (email_address,))

# test if db is connected
@app.route('/sa', methods=['GET'])
def get_users():
	res = spcall('get_users', ())

	if 'Error' in str(res[0][0]):
		return jsonify({'status':'error', 'message': res[0][0]})

	recs = []
	for r in res:
		recs.append({'user_id': str(r[0]), 'email_address': str(r[1]), 'password': str(r[2]), 'is_admin': str(r[3]),
					 'is_establishment': str(r[4]), 'is_customer': str(r[5]), 'is_active': str(r[6]) })

	return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})

# create user
@app.route("/new_admin", methods=['POST'])
def new_admin():
	jsn = json.loads(request.data)

	if invalid(jsn['email_address']):
		return jsonify({'status': 'error', 'message': 'Error'})

	res = spcall("new_admin",(
			jsn['email_address'],
			jsn['password']), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route("/new_establishment", methods=['POST'])
def new_establishment():
	jsn = json.loads(request.data)

	if invalid(jsn['email_address']):
		return jsonify({'status': 'error', 'message': 'Error'})

	res = spcall("new_establishment_personnel",(
			jsn['email_address'],
			jsn['password']), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route("/new_customer", methods=['POST'])
def new_customer():
	jsn = json.loads(request.data)

	if invalid(jsn['email_address']):
		return jsonify({'status': 'error', 'message': 'Error'})

	res = spcall("new_customer",(
			jsn['email_address'],
			jsn['password'],), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route("/new_gender", methods=['POST'])
def new_gender():
	jsn = json.loads(request.data)

	res = spcall("new_gender",
			(jsn['gender_name'],), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route("/new_catalog", methods=['POST'])
def new_catalog():
	jsn = json.loads(request.data)

	res = spcall("new_catalog",(
			jsn['catalog_name'],), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route("/new_category", methods=['POST'])
def new_category():
	jsn = json.loads(request.data)

	res = spcall('new_category', (
		jsn['category_name'],), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route("/new_subcategory", methods=['POST'])
def new_subcategory():
	jsn = json.laods(request.data)

	res = spcall('new_subcategory', (
		jsn['subcategory_name'],), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route("/new_size", methods=['POST'])
def new_size():
	jsn = json.loads(request.data)

	res = spcall('new_size', (
		jsn['size_name'],), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route("/new_product", methods=['POST'])
def new_product():
	jsn = json.loads(request.data)

	res = spcall('new_product', (
		jsn['product_name'],
		jsn['product_description'],
		jsn['product_gender'],
		jsn['product_catalog'],
		jsn['product_category'],
		jsn['product_subcategory'],
		jsn['product_color'],), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

if __name__ == '__main__':
	app.secret_key = 'B1Zr98j/3yX R~XHH!jmN]LWX/,?RT'
	app.run(debug=True)