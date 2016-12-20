from flask import Flask, jsonify, request, session, render_template
import json, os, sys
import flask
from config import *

app = Flask(__name__)


@app.route('/')
def helloworld():
    return "hello world"


@app.route('/login', methods=['POST'])
def login():
    jsn = json.loads(request.data)

    res = spcall("login", (
        jsn["email_address"],
        jsn["password"],), True)

    if len(res) == 0:
        return jsonify({'status': 'Invalid email or password'})

    if 'Invalid email or password' in str(res):
        return jsonify({'status': 'Invalid email or password', 'message': res[0][0]})

    if 'Login successful' in str(res):
        # role = get_loginrole(request.form.get('email_address'))
        role = get_loginrole(jsn['email_address'])
        # session['email_address'] = role[0][0]
        session['is_admin'] = role[0][0]
        session['is_establishment'] = role[0][1]
        session['is_customer'] = role[0][2]
        session['is_active'] = role[0][3]
        return jsonify({'status': 'Login successful', 'message': res[0][0], 'admin': session['is_admin'],
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
@app.route('/api/get/users', methods=['GET'])
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
@app.route("/api/add/admin", methods=['POST'])
def new_admin():
    jsn = json.loads(request.data)

    res = spcall("new_admin", (
        jsn['email_address'],
        jsn['password']), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})

# Get admins
@app.route('/api/get/admins', methods=['GET'])
def get_admins():
    res = spcall("get_admins", ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'user_id': str(r[0]), 'email_address': str(r[1]), 'is_admin': str(r[2]), 'is_active':str(r[3])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})

# Create new establishment personnels
@app.route("/api/add/establishment_personnel", methods=['POST'])
def new_establishment_personnel():
    jsn = json.loads(request.data)

    res = spcall("new_establishment_personnel", (
        jsn['email_address1'],
        jsn['password1']), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route('/api/get/establishment_personnels', methods=['GET'])
def get_establishment_personnels():
    res = spcall("get_establishment_personnels", ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'user_id': str(r[0]), 'email_address': str(r[1]), 'is_establishment': str(r[2]), 'is_active':str(r[3])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})

@app.route("/api/add/customer", methods=['POST'])
def new_customer():
    jsn = json.loads(request.data)

    res = spcall("new_customer", (
        jsn['email_address'],
        jsn['password'],), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'Error', 'message': res[0][0]})

    entries = []
    for r in res:
        entries.append({'user_id': str(r[0]), 'email_address': str(r[1]), 'is_customer': str(r[2]), 'is_active': str(r[3])})

    status_code = 200

    return jsonify({'status': 'ok', 'message': "Ok"}), status_code

@app.route('/api/get/customers', methods=['GET'])
def get_customers():
    res = spcall("get_customers", ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'user_id': str(r[0]), 'email_address': str(r[1]), 'is_customer': str(r[2]), 'is_active':str(r[3])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


@app.route('/api/add/establishment', methods=['POST'])
def add_establishment():
    jsn = json.loads(request.data)

    res = spcall("new_establishment_name", (
        jsn['establishment_name'],
        jsn['user_id'], ), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Ok', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})


@app.route('/api/get/establishment', methods=['GET'])
def get_establishment():
    res = spcall("get_establishment", ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'establishment_id': str(r[0]), 'establishment_name': str(r[1]),
                     'user_id': str(r[3]), 'establishment_is_active': str(r[2])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})

@app.route('/api/add/gender', methods=['POST'])
def add_gender():
    jsn = json.loads(request.data)

    res = spcall("new_gender", (
        jsn['gender_name'],), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'ok', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route('/api/get/gender', methods=['GET'])
def get_gender():
    res = spcall("get_gender", ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({'gender_id': str(r[0]), 'gender_name': str(r[1])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


@app.route("/api/add/catalog", methods=['POST'])
def new_catalog():
    jsn = json.loads(request.data)

    res = spcall("new_catalog", (
        jsn['catalog_name'],), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})


@app.route("/api/get/catalog", methods=['GET'])
def get_catalog():
    res = spcall("get_catalog", ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'catalog_id': str(r[0]), 'catalog_name': str(r[1])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


@app.route("/api/add/category", methods=['POST'])
def new_category():
    jsn = json.loads(request.data)

    res = spcall('new_category', (
        jsn['category_name'],
        jsn['catalog_id'],
        jsn['gender_id'], ), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})


@app.route("/api/get/category", methods=['GET'])
def get_category():
    res = spcall("get_category", ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'category_id': str(r[0]), 'category_name': str(r[1]), 'catalog_id': str(r[2]), 'gender_id': str(r[3])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


@app.route("/api/add/subcategory", methods=['POST'])
def new_subcategory():
    jsn = json.loads(request.data)

    res = spcall('new_subcategory', (
        jsn['subcategory_name'],
        jsn['category_id']), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})


@app.route("/api/get/subcategory", methods=['GET'])
def get_subcategory():
    res = spcall("get_subcategory", ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'subcategory_id': str(r[0]), 'subcategory_name': str(r[1]), 'category_id': str(r[2])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


@app.route("/api/add/size", methods=['POST'])
def new_size():
    jsn = json.loads(request.data)

    res = spcall('new_size', (
        jsn['size_name'],), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'ok', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route("/api/add/product", methods=['POST'])
def new_product():
    jsn = json.loads(request.data)

    res = spcall('new_product', (
        jsn['product_name'],
        jsn['product_description'],
        jsn['catalog_id'],
        jsn['category_id'],
        jsn['subcategory_id'],
        jsn['establishment_id'],
        jsn['image'],
        jsn['price'],), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'error', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})


# @app.route('/api/new_product/users/update/', methods=['PUT'])
# def update_new_product():
#   jsn = json.loads(request.data)
#
#   new_product = jsn.get('new_product','')
#   product_name = jsn.get('product_name','')
#   product_description = jsn.get('product_description','')
#   product_gender = jsn.get('product_gender','')
#   product_catalog = jsn.get('product_catalog','')
#   product_category = jsn.get('product_category','')
#   product_subcategory = jsn.get ('product_subcategory','')
#
#   spcall('update_new_product', (
#         new_product,
#         product_name,
#         product_description,
#         product_gender,
#         product_catalog,
#         product_category,
#         product_subcategory), True)
#
#     return jsonify({'status': 'OK'})

@app.route("/api/get/product", methods=['GET'])
def get_product():
    res = spcall('get_product', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'price': str(r[2]), 'image': str(r[3])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})

@app.route("/api/get/productbycatalog", methods=['GET'])
def get_productbycatalog():
    res = spcall('get_productby_catalog', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'ok', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'price': str([2]), 'image': str([3])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})

@app.route("/api/get/productbycatalogandgender", methods=['GET'])
def get_productbycatalogandgender():
    res = spcall('get_productby_catalog_gender', ())

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'ok', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'price': str([2]), 'image': str([3])})

    return jsonify({'status': 'ok', 'entires': recs, 'count': len(recs)})

@app.route("/api/get/productbycatalogandgenderandcategory")
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
    app.run(debug=False)
