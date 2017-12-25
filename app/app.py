from flask import Flask, jsonify, request, session, render_template
import json, os, sys
import flask
from config import *
import paypalrestsdk as paypal
from paypalrestsdk import *

app = Flask(__name__)

paypal.configure({
    "mode": "sandbox",  # sandbox or live
    "client_id": "ATcNxfmVFttFZG3v6mnrjuGGL9RzZqBZeGpPUiiarEpdzXyoe1ecgKTljdnDNfuQzBsEq3yW_YpFc_2O",
    "client_secret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})

@app.route('/')
def helloworld():
    return 'hello world!'


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
        user = get_userbyemail(jsn['email_address'])
        # session['email_address'] = role[0][0]
        session['email_address'] = user[0][0]
        session['user_id'] = user[0][1]
        session['is_admin'] = user[0][2]
        session['is_establishment'] = user[0][3]
        session['is_customer'] = user[0][4]
        session['is_active'] = user[0][5]
        session['fname'] = user[0][6]
        session['lname'] = user[0][7]
        session['img'] = user[0][8]

        recsuser = []
        for r in user:
            recsuser.append({'email_address': session['email_address'], 'user_id': session['user_id'],
                'is_admin': session['is_admin'], 'is_customer': session['is_customer'], 'is_establishment': session['is_establishment'],
                'is_active': session['is_active'], 'fname': session['fname'], 'lname': session['lname'],
                'img': session['img']})

        rescatalog = spcall("get_catalog", ())

        recscatalog = []

        for r in rescatalog:
            recscatalog.append({'catalog_id': str(r[0]), 'catalog_name': str(r[1])})

        return jsonify({'status': 'Login successful', 'message': res[0][0], 'userinfo': recsuser, 'countuserinfo': len(recsuser),
                        'catalog':recscatalog, 'catalogcount': len(recscatalog)})


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('logged_in', None)
    session.clear()
    return jsonify({'message': 'Successfuly logged out'})

def get_userbyemail(email_address):
    return spcall('get_userbyemail', (email_address,))


# test if db is connected
@app.route('/api/get/users', methods=['GET'])
def get_users():
    res = spcall('get_users', ())

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

    recs = []
    for r in res:
        recs.append({'user_id': str(r[0]), 'email_address': str(r[1]), 'is_admin': str(r[2]), 'is_active':str(r[3])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


# Create new establishment personnels
@app.route("/api/add/establishment_personnel", methods=['POST'])
def new_establishment_personnel():
    jsn = json.loads(request.data)

    res = spcall("new_establishment_personnel", (
        jsn['email_address'],
        jsn['password']), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Error', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route('/api/get/establishment_personnels', methods=['GET'])
def get_establishment_personnels():
    res = spcall("get_establishment_personnels", ())

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

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route('/api/get/customers', methods=['GET'])
def get_customers():
    res = spcall("get_customers", ())

    recs = []
    for r in res:
        recs.append({'user_id': str(r[0]), 'email_address': str(r[1]), 'is_customer': str(r[2]), 'is_active':str(r[3])})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


@app.route('/account/<string:user_id>', methods=['GET'])
def useraccount(user_id):
    res = spcall('get_userbyid', (user_id,), )

    res_billingaddress = spcall('get_billingaddressbyid', (user_id,),)

    res_permananentaddress = spcall('get_permanentaddressbyid', (user_id,),)

    recs = []
    for r in res:
        recs.append({'email_address': str(r[0]), 'user_id': str(r[1]), 'is_admin': str(r[2]), 'is_establishment': str(r[3]),
            'is_customer': str(r[4]), 'is_active': str(r[5]), 'fname': str(r[6]), 'lname': str(r[7]), 'img': str(r[8])})

    recs_billingaddress = []
    for r in res_billingaddress:
        recs_billingaddress.append({'user_id': str(r[0]), 'postalcode': str(r[1]), 'brgy': str(r[2]), 'city': str(r[3]),
            'street': str(r[4]), 'pnum': str(r[5])})

    recs_permananentaddress = []
    for r in res_permananentaddress:
        recs_permananentaddress.append({'user_id': str(r[0]), 'postalcode': str(r[1]), 'brgy': str(r[2]), 'city': str(r[3]), 'street': str(r[4]), 'pnum': str(r[5])})

    print recs

    return jsonify({'status': 'Ok', 'useraccount': recs, 'useraccountcount': len(recs), 'billingaddress': recs_billingaddress,
        'billingaddresscount': len(recs_billingaddress),'permanentaddress': recs_permananentaddress, 'permanentaddresscount': len(recs_permananentaddress)}) 


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
            jsn['price'], 
            jsn['image'],
            jsn['product_name'],
            jsn['product_description'],
            jsn['catalog_id'],
            jsn['gender_id'],
            jsn['category_id'],
            jsn['subcategory_id'],
            jsn['establishment_id'],), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'Ok', 'message': res[0][0]})

    return jsonify({'status': 'Ok', 'message': res[0][0]})

@app.route("/api/update/product/<string:product_id>", methods=['PUT'])
def update_product(product_id):

    return jsonify({'status': 'Ok'})


@app.route("/api/get/product", methods=['GET'])
def get_product():
    res = spcall('get_product', ())

    rescatalog = spcall("get_catalog", ())   

    recs = []

    recscatalog = []

    for r in res:
        recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'product_description': str(r[2]), 'price': str(r[3]), 'image': str(r[4]),
            'catalog_id': str(r[5]), 'gender_id': str(r[6]), 'category_id': str(r[7]), 'subcategory_id': str(r[8]),
            'establishment_id': str(r[9])})

    for r in rescatalog:
        recscatalog.append({'catalog_id': str(r[0]), 'catalog_name': str(r[1])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs), 'catalog': recscatalog,
                    'catalogcount': len(recscatalog)})

@app.route("/api/get/product/<string:product_id>/<string:establishment_id>", methods=['GET'])
def get_productby_id(product_id, establishment_id):
    res = spcall('get_productby_id', (product_id, establishment_id,),)

    recs = []

    for r in res:
        recs.append({'product_id': str(r[0]),
                    'product_name': str(r[1]),
                    'product_description': str(r[2]),
                    'image': str(r[3]),
                    'price': str(r[4]),
                    'establishment_id': str(r[5]),
                    'establishment_name': str(r[6]),
                    'latitude': str(r[7]),
                    'longitude': str(r[8]),
                    'establishment_location': str(r[9]),
                    'image_id': str(r[10]),
                    'image1': str(r[11]),
                    'image2': str(r[12]),
                    'image3': str(r[13]),
                    'image4': str(r[14]) })

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})


# @app.route("/api/get/catalog/<string:catalog_id>", methods=['GET'])
# def get_productby_catalog(catalog_id):
#     res = spcall('get_productby_catalog', (catalog_id,),)

#     recs = []

#     for r in res:
#         recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'price': str(r[2]), 'image': str(r[3])})

#     return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})

@app.route("/api/get/catalog/<string:catalog_id>", methods=['GET'])
def get_productby_catalog(catalog_id):
    res = spcall('get_productby_catalog', (catalog_id,),)
    resgender = spcall('get_gender2', ())
    rescategory = spcall('get_categorybycatalog', (catalog_id,),)

    recs = []

    for r in res:
        recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'price': str(r[2]), 'image': str(r[3]),
                    'catalog_id': str(r[4]), 'establishment_id': str(r[5])})

    recsgender = []

    for r in resgender:
        recsgender.append({'gender_id': str(r[0]), 'gender_name': str(r[1])})

    recscategory = []

    for r in rescategory:
        recscategory.append({'category_id': str(r[0]), 'category_name': str(r[1]), 'catalog_id': str(r[2]), 'gender_id': str(r[3])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs),
                    'genderentries':recsgender, 'gendercount': len(recsgender),
                    'categoryentries':recscategory, 'categorycount': len(recscategory)})

@app.route("/api/get/catalog/<string:catalog_id>/gender/<string:gender_id>", methods=['GET'])
def get_productby_catalog_gender(catalog_id, gender_id):
    res = spcall('get_productby_catalog_gender', (catalog_id, gender_id,),)
    resgender = spcall('get_gender2', ())
    rescategory = spcall('get_categorymale', (catalog_id, gender_id,),)

    recs = []

    for r in res:
        recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'price': str(r[2]), 'image': str(r[3]),
                    'catalog_id': str(r[4]), 'gender_id': str(r[5]), 'establishment_id': str(r[6])})

    recsgender = []

    for r in resgender:
        recsgender.append({'gender_id': str(r[0]), 'gender_name': str(r[1])})

    recscategory = []

    for r in rescategory:
        recscategory.append({'category_id': str(r[0]), 'category_name': str(r[1]), 'catalog_id': str(r[2]), 'gender_id': str(r[3])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs),
                    'genderentries':recsgender, 'gendercount': len(recsgender),
                    'categoryentries': recscategory, 'categorycount': len(recscategory)})

@app.route("/api/get/catalog/<string:catalog_id>/category/<string:category_id>", methods=['GET'])
def get_productby_catalog_category(catalog_id, category_id):
    res = spcall('get_productby_catalog_category', (catalog_id, category_id,),)

    recs = []

    for r in res:
        recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'price': str(r[2]), 'image': str(r[3]),
                    'establishment_id': str(r[4])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

@app.route("/api/get/catalog/<string:catalog_id>/gender/<string:gender_id>/category/<string:category_id>")
def get_productby_catalog_gender_category(catalog_id, gender_id, category_id):
    res = spcall('get_productby_catalog_gender_category', (catalog_id, gender_id, category_id,),)

    recs = []

    for r in res:
        recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'price': str(r[2]), 'image': str(r[3]), 'establishment_id': str(r[4])})

    return jsonify({'status': 'Ok', 'entries': recs, 'count': len(recs)})

@app.route("/api/get/catalog/<string:catalog_id>/gender/<string:gender_id>/category/<string:category_id>/subcategory/<string:subcategory_id>")
def get_productby_catalog_gender_category_subcategory(catalog_id, gender_id, category_id, subcategory_id):
    res = spcall('get_productby_catalog_gender_category_subcategory', (catalog_id, gender_id, category_id, subcategory_id,),)

    recs = []

    for r in res:
        recs.append({'product_id': str(r[0]), 'product_name': str(r[1]), 'price': str(r[2]), 'image': str(r[3])})

    return jsonify({'status': 'ok', 'entires': recs, 'count': len(recs)})

# @app.route('/api/add/cart', methods=['POST'])
# def addtocart():
#     jsn = json.loads(request.data)

#     res = spcall('addtocart', (
#         jsn['cart_id'],
#         jsn['product_id'],
#         jsn['user_id']), True)

#     if 'Error' in str(res[0][0]):
#         return jsonify({'status': 'Error', 'message': res[0][0]})

#     return jsonify({'status': 'Ok', 'message': res[0][0]})

@app.route('/api/add/cart', methods=['POST'])
def addtocart():
    jsn = json.loads(request.data)

    inc = 0

    # res = spcall('addtocart', (
    #     jsn['cart_id'],
    #     jsn['product_id'],
    #     jsn['user_id'],), False)

    cart = get_productbycartuser(jsn['cart_id'], jsn['user_id'],)
    if cart[0][0] == 1:
        res = spcall('addtocart', (
                jsn['cart_id'],
                jsn['product_id'],
                jsn['user_id'],), True)
        # if cart[0][2] == True:
        #     # newcartid = jsn['cart_id'] + 1
        #     res = spcall('addtocart', (
        #         jsn['cart_id'],
        #         jsn['product_id'],
        #         jsn['user_id'],), True)
        #     # return cart[0][2]
        # else:
        #     res = spcall('addtocart', (
        #         jsn['cart_id'],
        #         jsn['product_id'],
        #         jsn['user_id'],), True)
        # return cart[0][2]
        
    return jsonify({'status': 'Ok', 'message': res[0][0]})

def get_productbycartuser(cart_id, user_id):
    return spcall('get_productbycartuser', (cart_id, user_id,),)



@app.route("/api/get/cart/<string:cart_id>/<string:user_id>")
def get_productbycartuser2(cart_id, user_id):
    total = 0
    res = spcall('get_productbycartuser', (cart_id, user_id,),)

    recs = []

    for r in res:
        recs.append({'cart_id': str(r[0]), 'user_id': str(r[1]), 'is_checkedout': str(r[2]), 'product_id': str(r[3]),
                    'product_name': str(r[4]), 'product_description': str(r[5]), 'product_price': str(r[6]),
                    'product_image': str(r[7]), 'establishment_id': str(r[8])})
        total = total + r[6]

    print total

    return jsonify({'status': 'ok', 'entires': recs, 'count': len(recs), 'total': str(total)})

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
    # app.run(host='localhost', debug=True)
    app.run(host='0.0.0.0', debug=True)
