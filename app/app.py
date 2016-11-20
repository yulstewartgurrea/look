from flask import Flask, render_template, jsonify
from config import *
app = Flask(__name__)

@app.route("/")
def index():
	return render_template("index.html")

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

	if invalid(jsn['email']):
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

	if invalid(jsn['email']):
		return jsonify({'status': 'error', 'message': 'Error'})

	res = spcall("new_customer",(
			jsn['email_address'],
			jsn['password']), True)

	if 'Error' in res[0][0]:
		return jsonify({'status': 'ok', 'message': res[0][0]})

	return jsonify({'status': 'ok', 'message': res[0][0]})



if __name__ == '__main__':
	app.run(debug=True)
