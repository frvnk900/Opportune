from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import json
import os
from pathlib import Path
import sys
p = Path(__file__).resolve().parents[1]
sys.path.append(str(p))
import uuid
import jwt
from ai_src.main import match_client_to_organisation
from datetime import datetime , timedelta
from ai_src.main import match_organisation_to_clients
from configuration.Config import Config
from path import org_url, cli_url
from data.db import (
    write_into_client,
    write_into_organisation,
    read_data_cli,
    read_data_org
)

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

 
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def allowed_extension(filename):
    return os.path.splitext(filename)[1].lower() in Config.ALLOWED_EXTENSIONS

def generate_jwt(payload):
    exp = datetime.utcnow() + timedelta(seconds=Config.JWT_EXP_DELTA_SECONDS)
    payload.update({"exp": exp})
    token = jwt.encode(payload, Config.JWT_SECRET_KEY, algorithm=Config.JWT_ALGORITHM)
    return token

@app.before_request
def load_database():
    
    if not os.path.exists(org_url()):
        with open(org_url(), 'w') as f:
            json.dump([], f)
 
    if not os.path.exists(cli_url()):
        with open(cli_url(), 'w') as f:
            json.dump([], f)


# Get all organisations
@app.route('/organisations/data', methods=['GET'])
def get_organisations():
    try:
        return jsonify(read_data_org()), 200
    except FileNotFoundError:
        return jsonify({"error": "Organisation data file not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get all clients
@app.route('/clients/data', methods=['GET'])
def get_clients():
    try:
        return jsonify(read_data_cli()), 200
    except FileNotFoundError:
        return jsonify({"error": "Client data file not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Organisation Signup
@app.route("/organisation/signup", methods=["POST"])
def organisation_sign_up():
    items = request.form.to_dict()
    # logo = request.files.get('organisation_logo')

    # Check required fields
    required_fields = [
        "organisation_name", "organisation_email", "organisation_password",
        "organisation_phone", "organisation_location", "organisation_owner",
        "orgnaisation_service"
    ]
    for field in required_fields:
        if field not in items:
            return jsonify({"error": f"Missing field: {field}"}), 400

    # Check if org name or email already exists
    existing_orgs = read_data_org()
    for org in existing_orgs:
        if org["organisation_email"] == items["organisation_email"]:
            return jsonify({"error": "Email already registered"}), 409
        if org["organisation_name"].lower() == items["organisation_name"].lower():
            return jsonify({"error": "Organisation name already exists"}), 409

    logo = request.files.get('organisation_logo')
    if logo and allowed_extension(logo.filename):
        filename = secure_filename(logo.filename)
        ext = filename.rsplit('.', 1)[1].lower()
        unique_filename = f"{uuid.uuid4().hex}.{ext}"
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        
        # Save the file
        logo.save(save_path)
        
        # Store path in data
        items["organisation_logo"] = unique_filename  # just the filename

    else:
        items["organisation_logo"] = ""

    items["organisation_id"] = f"{uuid.uuid4().hex}"
    items["organisation_conversation_ai"] = []
    # items["organisation_client_requests"] = []

    existing_orgs.append(items)
    write_into_organisation(existing_orgs)

    return jsonify({"message": "Organisation registered successfully"}), 201
 
# Organisation Signin
@app.route("/organisation/signin", methods=["POST"])
def organisation_sign_in():
    items = request.get_json()
    email = items.get("organisation_email")
    password = items.get("organisation_password")

    for org in read_data_org():
        if org["organisation_email"] == email and org["organisation_password"] == password:
            token_payload = {
                "organisation_email": org["organisation_email"],
                "organisation_id": org.get("organisation_id", None),
                "role": "organisation"
            }
            token = generate_jwt(token_payload)
            return jsonify({"message": "Login successful", "token": token}), 200

    return jsonify({"error": "Invalid Email or Password"}), 401


# ----------------------------
# Client Signup
# ----------------------------
@app.route("/client/signup", methods=["POST"])
def client_sign_up():
    items = request.form.to_dict()
    image = request.files.get('client_profile_image')

    required_fields = [
        "client_email", "client_name" , "client_username","client_description", "client_age" , "client_profile",
        "client_location", "client_gender", "client_languages","client_password", "client_nationality"
    ]
    for field in required_fields:
        if field not in items:
            return jsonify({"error": f"Missing field: {field}"}), 400

    # Handle profile image
    if image and allowed_extension(image.filename):
        filename = secure_filename(image.filename)
        ext = filename.rsplit('.', 1)[1].lower()
        image_name = f"{uuid.uuid4().hex}.{ext}"
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        image.save(image_path)
        items["client_profile_image"] = image_path
    else:
        items["client_profile_image"] = ""

    
    # items["client_languages"] = []
    items['client_id'] = f"{uuid.uuid4().hex}"
    items["client_conversation_ai"] = []
 

    clients = read_data_cli()
    for cli in clients:
        if cli["client_email"] == items["client_email"] and cli["client_username"] == items["client_username"] :
            return jsonify({"error": "Email or Username  already registered"}), 409

    clients.append(items)
    write_into_client(clients)

    return jsonify({"message": "Client registered successfully"}), 201



# ----------------------------
# Client Signin
# ----------------------------
@app.route("/clients/signin", methods=["POST"])
def client_sign_in():
    items = request.get_json()
    email = items.get("client_email")
    username = items.get("client_username")
    password = items.get("client_password")

    for client in read_data_cli():
        if client["client_email"] == email and client["client_password"] == password or client["client_username"] == username and client["client_password"] == password :
            token_payload = {
                "client_email": client["client_email"],
                "client_id": client.get("client_id", None),
                "role": "client"
            }
            token = generate_jwt(token_payload)
            return jsonify({"message": "Login successful", "client_token": token}), 200

    return jsonify({"error": "Invalid Email(Username) and Username or Password"}), 401

 
# ----------------------------
# make organisation to client match
@app.route('/organisations/<organisation_id>/match', methods=['PUT'])
def match_and_store_request_organisation(organisation_id):
    try:
        data = request.get_json()
        request_description = data.get("request")

        if not request_description:
            return jsonify({"error": "Missing request description."}), 400

        db = read_data_org()
        target_org = next((org for org in db if org.get("organisation_id") == organisation_id), None)

        if not target_org:
            return jsonify({"error": "Organisation not found."}), 404

        services = target_org.get("orgnaisation_type")
        if not services:
            return jsonify({"error": "Organisation has no services defined."}), 400

   
        matched_clients = match_organisation_to_clients(service=services, request=request_description)
        print("🧠 Matched clients output:", matched_clients)

     
        if not matched_clients or not isinstance(matched_clients, list):
            return jsonify({"error": "Unexpected model response."}), 500

        if "error" in matched_clients[0]:
            return jsonify({"error": matched_clients[0]["error"]}), 500

 
        if "message" in matched_clients[0]:
            return jsonify({"message": matched_clients[0]["message"]}), 200

 
        request_object = {
            "request_id": str(uuid.uuid4()),
            "request_duration": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "request": request_description,
            "recommendation": matched_clients
        }

        target_org.setdefault("organisation_client_requests", []).append(request_object)

        write_into_organisation(db)

        return jsonify({"message": "Request processed and recommendation stored."}), 200

    except Exception as e:
        print(f"❌ Internal error: {e}")
        return jsonify({"error": "Internal server error"}), 500


from flask import send_from_directory
 
@app.route('/clients/<client_id>/match', methods=['PUT'])
def match_client_to_org(client_id):
    try:
        db = read_data_cli()
        client = next((c for c in db if c.get("client_id") == client_id), None)

        if not client:
            return jsonify({"error": "Client not found."}), 404

  
        description = client.get("client_description")
        age = client.get("client_age")
        status = client.get("client_profile")
        location = client.get("client_location")
        language = client.get("client_languages")

        if any(field is None for field in [description, age, status, location, language]):
            return jsonify({"error": "Some client fields are not defined."}), 400

        recommendations = match_client_to_organisation(description, age, status, language, location)

 
        new_org_ids = {rec.get('_id') for rec in recommendations if rec.get('_id')}
 
        existing_recommendations = client.get("organisation_recommendation", [])
        already_exists = False

        for match in existing_recommendations:
            existing_org_ids = {rec.get('_id') for rec in match.get("recommendation", []) if rec.get('_id')}
            if new_org_ids == existing_org_ids:
                already_exists = True
                match_id = match.get("match_id")
                break

        if recommendations and not already_exists:
            match_id = str(uuid.uuid4())
            match_obj = {
                "match_id": match_id,
                "match_duration": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
                "recommendation": recommendations
            }
            client.setdefault("organisation_recommendation", []).append(match_obj)
            write_into_client(db)

    
        if not recommendations:
            match_id = None

        return jsonify({
            "match_id": match_id,
            "recommendations": recommendations or [],
        }), 200

    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500



@app.route('/organisations/<org_id>', methods=['GET'])
def get_organisation_by_id(org_id):
    try:
        db = read_data_org()  
        organisation = next((org for org in db if org.get("organisation_id") == org_id), None)

        if not organisation:
            return jsonify({"error": "Organisation not found"}), 404

        return jsonify(organisation), 200

    except Exception as e:
        app.logger.error(f"Error fetching organisation: {e}")
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/clients/<client_id>', methods=['GET'])
def get_client_by_id(client_id):
    try:
        db = read_data_cli()
        client = next((c for c in db if c.get("client_id") == client_id), None)
        if not client:
            return jsonify({"error": "Client not found."}), 404

        return jsonify(client), 200
    except Exception as e:
        app.logger.error(f"Error fetching client: {e}")
        return jsonify({"error": "Internal server error"}), 500
    
    
   # wherever you save uploaded files

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# ORGANISATION
@app.route('/organisations/<organisation_id>/requests', methods=['GET'])
def get_org_requests(organisation_id):
    try:
        print(organisation_id)
        db = read_data_org()
        org = next((o for o in db if o.get("organisation_id") == organisation_id), None)
        if not org:
            return jsonify({"error": "Organisation not found."}), 404

        return jsonify(org.get("organisation_client_requests", [])), 200

    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500



@app.route('/clients/<client_id>/requests', methods=['GET'])
def get_client_details(client_id):
    try:
        db = read_data_cli()
        client = next((c for c in db if c.get("client_id") == client_id), None)
        if not client:
            return jsonify({"error": "Client not found."}), 404
        # Only send necessary fields
        result = {
            "client_id": client["client_id"],
            "client_profile": client["client_profile"],
            "client_name": client["client_name"],
            "client_username": client["client_username"],
            "client_gender":client["client_gender"],
            "client_profile_image": client["client_profile_image"],
            "client_languages": client.get("client_languages", ""),
            "client_location": client.get("client_location", ""),
        }
        return jsonify(result), 200

    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500



if __name__ == "__main__":
    app.run(debug=True)