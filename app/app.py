from flask import Flask, jsonify, request
from config import *
from __init__ import *
import json

# test if db is connected
@app.route("/sa")
def get_users():
	res = spcall('get_users', ())

	if 'Error' in str(res[0][0]):
		return jsonify({'status':'error', 'message': res[0][0]})

	recs = []
	for r in res:
		recs.append({'user_id': str(r[0]), 'email_address': str(r[1]), 'is_admin': str(r[2]), 'is_establishment': str(r[3]),
					'is_customer': str(r[4]), 'is_active': str(r[5])})

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

	res = spcall("new_establishment",(
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
			jsn['password']), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route("/new_gender", methods=['POST'])
def new_gender():
	jsn = json.loads(request.data)

	if invalid(jsn['gender_name']):
		return jsonify{('status': 'error', 'message': 'error')}

	res = spcall('new_gender', (
		jsn['gender_name']), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route("/new_catalog", methods=['POST'])
def new_catalog():
	jsn = json.loads(request.data)

	if invalid(jsn['catalog_name']):
		return jsonify({'status': 'error', 'message': 'error'})

	res = spcall('catalog_name', (
		jsn['catalog_name']), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route("/new_category", methods=['POST'])
def new_category():
	jsn = json.loads(request.data)

	if invalid(jsn['category_name']):
		return jsonify({'status': 'error', 'message': 'error'})

	res = spcall('category_name', (
		jsn['category_name']), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route("/new_subcategory", methods=['POST'])
def new_subcategory():
	jsn = json.laods(request.data)

	if invalid(jsn['subcategory_name']):
		return jsonify({'status': 'ok', 'message': res[0][0]})

	res = spcall('new_subcategory', (
		jsn['subcategory_name']), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route("/new_size", methods=['POST'])
def new_size():
	jsn = json.loads(request.data)

	if invalid(jsnn['size_num']):
		return jsonify({'status': 'ok', 'message': res[0][0]})

	res = spcall('new_size', (
		jsn['size_name']), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route("/new_product", methods=['POST'])
def new_product():
	jsn = json.loads(request.data)

	if invalid(jsn['product_name']):
		return jsonify({'status': 'ok', 'message': res[0][0]})

	res = spcall('new_product', (
		jsn['product_name'],
		jsn['product_description'],
		jsn['product_gender'],
		jsn['product_catalog'],
		jsn['product_category'],
		jsn['product_subcategory'],
		jsn['product_color']), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})