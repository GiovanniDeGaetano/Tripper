import secrets
import pymongo
from flask import Flask, jsonify, request, session, render_template, redirect, url_for
from flask_cors import CORS
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from urllib.parse import quote_plus

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = True  # Imposta a True se stai usando HTTPS
app.config['SESSION_COOKIE_SAMESITE'] = 'None'

CORS(app, supports_credentials=True)
Session(app)

username = quote_plus('newUser')
password = quote_plus('RJ,5Ts_6Ct4mg5N')
uri = "mongodb+srv://"+username+":"+password+"@cluster0.vpbas6b.mongodb.net/?retryWrites=true&w=majority"

myClient = pymongo.MongoClient(uri)
mydb = myClient["test1"]
itinerary = mydb["itinerary"]
users = mydb["users"]


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/home')
def home():
    return render_template('index.html')


@app.route('/newItinerary',  methods=["GET", "POST"])
def newItineraryHTML():
    return render_template('newItinerary.html')


@app.route('/myItinerary')
def myItineraryHTML():
    return render_template('myItinerary.html')


@app.route('/loginPage', methods=['GET'])
def loginPage():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def login():
    email = request.form['emailIn']
    password = request.form['passwordIn']
    user = users.find_one({'email': email})
    if user:
        if check_password_hash(user['password'], password):
            # session['user_id'] = str(user['_id'])
            session['email'] = email
            return redirect(url_for('index'))
        else:
            return jsonify({'success': False, 'error': 'Invalid password. Please try again.'}), 401
    else:
        return jsonify({'success': False, 'error': 'A user with this email does not exist'}), 401


@app.route('/logout', methods=['GET'])
def logout():
    session.pop('email', None)
    return redirect(url_for('index'))


@app.route('/protected', methods=['GET'])
def protected():
    # Controlla se l'utente è autenticato
    if 'email' in session:
        email = session['email']
        return jsonify({'success': True, 'message': email}), 200
    else:
        return jsonify({'success': False, 'error': 'Accesso non autorizzato'}), 401


@app.route('/register', methods=['POST'])
def register():
    registerAccount = request.json
    email = registerAccount.get('email')
    existingUser = users.find_one({'email': email})
    if existingUser:
        return jsonify({'success': False, 'error': 'L\'utente esiste già'}), 400
    password = registerAccount.get('password')
    hashPsw = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = {
        "name": registerAccount.get('name'),
        "surname": registerAccount.get('surname'),
        "email": email,
        "password": hashPsw
    }
    users.insert_one(new_user)
    return jsonify({'success': True, 'message': 'Registrazione completata con successo'}), 201


@app.route('/api/getMyItinerary', methods=['POST'])
def get_itinerary():
    if 'email' in session:
        email = session['email']
        emailFilter = {"email": email}
        myIt = itinerary.find(emailFilter)
        itineraryJson = []
        for doc in myIt:
            doc['_id'] = str(doc['_id'])
            itineraryJson.append(doc)
        return jsonify(itineraryJson)
    else:
        return jsonify({'success': False, 'error': 'Accesso non autorizzato'}), 401


@app.route("/api/saveItinerary", methods=['POST'])
def insert():
    newItinerary = request.json
    if 'email' in session:  # se ha una sessiona attiva
        email = session['email']
        emailFilter = {"email": email}
        obj = itinerary.find_one(emailFilter)
        # del newItinerary['email']
        if obj:
            itinerary.update_one(emailFilter, {"$push": {"itinerary": newItinerary}})
        else:
            newObj = {
                "email": email,
                "itinerary": [
                    newItinerary
                ]
            }
            itinerary.insert_one(newObj)
    else:
        return jsonify({'success': False, 'error': 'Accesso non autorizzato'}), 401
    return jsonify({'success': True, 'message': 'Salvataggio completato con successo'}), 201


if __name__ == '__main__':
    app.run()
