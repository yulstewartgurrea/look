from flask import Flask, jsonify, request, session, render_template
import json, os, sys
import flask
from config import *



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
        # if str(res) == 'Login successful':
        status = True
        role = get_loginrole(jsn['email_address'])
        # session['email_address'] = role[0][0]
        session['is_admin'] = role[0][0]
        session['is_establishment'] = role[0][1]
        session['is_customer'] = role[0][2]
        session['is_active'] = role[0][3]
        return jsonify({'status': status, 'message': res[0][0], 'admin': session['is_admin'],
                        'establishment': session['is_establishment'], 'customer': session['is_customer'],
                        'active': session['is_active']})


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.clear()
    return jsonify({'message': 'Successfuly logged out'})


def get_loginrole(email_address):
    return spcall('get_loginrole', (email_address,))


# test if db is connected
@app.route('/get_users', methods=['GET'])
def get_users():
    res = spcall('get_users', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'user_id': str(r[0]), 'email_address': str(r[1]), 'password': str(r[2]), 'is_admin': str(r[3]),
                     'is_establishment': str(r[4]), 'is_customer': str(r[5]), 'is_active': str(r[6])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


# create user
@app.route("/new_admin", methods=['POST'])
def new_admin():
    jsn = json.loads(request.data)

    if invalid(jsn['email_address']):
        return jsonify({'status': 'error', 'message': 'Error'})


    res = spcall("new_admin", (
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

    res = spcall("new_establishment_personnel", (
        jsn['email_address'],
        jsn['password']), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'ok', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route("/new_customer", methods=['POST'])
def new_customer():
    jsn = json.loads(request.data)

    # if invalid(jsn['email_address']):
    # 	return jsonify({'status': 'error', 'message': 'Error'})

    res = spcall("new_customer", (
        jsn['email_address'],
        jsn['password'],), True)
    #
    # if invalid(jsn['email_address']):
    #     return jsonify({'status': 'error', 'message': 'Error'})

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'ok', 'message': res[0][0]})

    entries = []
    for r in res:
        entries.append({'user_id': str(r[0]), 'email_address': str(r[1]), 'password': str(r[2]), 'is_admin': str(r[3]),
                        'is_establishment': str(r[4]), 'is_customer': str(r[5]), 'is_active': str(r[6])})

    status_code = 200

    return jsonify({'status': 'ok', 'message': "Ok"}), status_code


@app.route('/new_gender/<string:gender_n>', methods=['POST'])
def add_gender(gender_n):
    # jsn = json.loads(request.data)

    # res = spcall("new_gender",
                 # (jsn['gender_name'],), True)
    res = spcall('new_gender', (gender_n,), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'ok', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route('/get_gender', methods=['GET'])
def get_gender():
    res = spcall("get_gender", ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'gender_id': str(r[0]), 'gender_name': str(r[1])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


@app.route("/new_catalog", methods=['POST'])
def new_catalog():
    jsn = json.loads(request.data)

    res = spcall("new_catalog", (
        jsn['catalog_name'],), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'ok', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route("/get_catalog", methods=['GET'])
def get_catalog():
    res = spcall("get_catalog", ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'category_id': str(r[0]), 'category_name': str(r[1])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


@app.route("/new_category", methods=['POST'])
def new_category():
    jsn = json.loads(request.data)

    res = spcall('new_category', (
        jsn['category_name'],), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'ok', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route("/get_category", methods=['GET'])
def get_category():
    res = spcall("get_category", ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append(
            {'category_id': str(r[0]), 'category_name': str(r[1]), 'catalog_id': str(r[2]), 'gender_id': str(r[3])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


@app.route("/new_subcategory", methods=['POST'])
def new_subcategory():
    jsn = json.loads(request.data)

    res = spcall('new_subcategory', (
        jsn['subcategory_name'],), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'ok', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route("/get_subcategory", methods=['GET'])
def get_subcategory():
    res = spcall("get_subcategory", ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'ok', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'subcategory_id': str(r[0]), 'subcategory_name': str(r[1]), 'category_id': str(r[2])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


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
        jsn['gender_id'],
        jsn['catalog_id'],
        jsn['category_id'],
        jsn['subcategory_id'],
        jsn['establishment_id'],-
        jsn['image'],
        jsn['price'],), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'ok', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route('/api/new_product/users/update/', methods=['PUT'])
def update_new_product();
	jsn = json.loads(request.data)

	new_product = jsn.get('new_product','')
	product_name = jsn.get('product_name','')
	product_description = jsn.get('product_description','')
	product_gender = jsn.get('product_gender','')
	product_catalog = jsn.get('product_catalog','')
	product_category = jsn.get('product_category','')
	product_subcategory = jsn.get ('product_subcategory','')

	spcalls.spcall('update_new_product', (
        new_product,
        product_name,
        product_description,
        product_gender,
        product_catalog,
        product_category,
        product_subcategory
    ), True)

    return jsonify({'status': 'OK'})																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																					www	a]])
=======
@app.route("/get_product", methods=['GET'])
def get_product():
    res = spcall('get_product', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'ok', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'price': str(r[2]), 'image': str(r[3])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})

@app.route("/getproductbycatalog", methods=['GET'])
def get_productbycatalog():
    res = spcall('get_productby_catalog', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'ok', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'price': str([2]), 'image': str([3])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})

@app.route("/getproductbycatalogandgender", methods=['GET'])
def get_productbycatalogandgender():
    res = spcall('get_productby_catalog_gender', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'ok', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'price': str([2]), 'image': str([3])})

    return jsonify({'status': 'ok', 'entires': recs, 'count': len(recs)})

@app.route("/getproductbycatalogandgenderandcategory")
def get_productbycatalogandgenderandcategory():
    res = spcall('get_productby_catalog_gender_category', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'ok', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'price': str([2]), 'image': str([3])})

    return jsonify({'status': 'ok', 'entires': recs, 'count': len(recs)})

# @app.route()



@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin', '*')
    resp.headers['Access-Control-Allow-Credentials'] = True
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET, PUT, DELETE'
    resp.headers['Access-Control-Allow-Headers'] = flask.request.headers.get('Access-Control-Request-Headers',
                                                                             'Authorization')
    # set low for debugging

    if app.debug:
        resp.headers["Access-Control-Max-Age"] = '1'
    return resp


if __name__ == '__main__':
    app.secret_key = 'B1Zr98j/3yX R~XHH!jmN]LWX/,?RT'
    app.run(debug=True, threaded=True)
