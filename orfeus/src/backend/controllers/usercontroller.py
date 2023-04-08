import bcrypt, os, json
from datetime import datetime
from flask import Blueprint, jsonify, make_response, request
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, current_user, create_access_token
from models import User, SongFile, user
from orfeus_config import jwt, db, engine
from sqlalchemy import select, exc

users_bp = Blueprint('users', __name__)
@users_bp.route('/get_email', methods=['GET'])
@jwt_required()
def get_email():
    email = current_user.email
    return jsonify(email=email)

@users_bp.route('/users/<user_id_or_name>', methods=['GET'])
@cross_origin()
def user_email(user_id_or_name):
            username = user_id_or_name
            user = User.query.filter_by(username=username).first()
            user_email = user.email
            return user_email

@users_bp.route('/users/password/<user_id_or_name>', methods=['PUT'])
def change_password(user_id_or_name):
    username = user_id_or_name
    user = User.query.filter_by(username=username).first()
    if user is None:
        return make_response(jsonify({"error": "User not found"}), 404)
    password = request.json.get('password', user.password)
    user.password = bcrypt.hashpw(
        password.encode('utf8'), bcrypt.gensalt())
    db.session.commit()
    return make_response(jsonify({"message": "User updated successfully"}), 200)

@users_bp.route('/users/edit_profile/<user_id_or_name>', methods=['PUT'])
def update_name_and_email(user_id_or_name):
    username = user_id_or_name
    user = User.query.filter_by(username=username).first()
    if user is None:
        return make_response(jsonify({"error": "User not found"}), 404)
    user.email = request.json.get('email', user.email).encode('utf-8')
    user.username = request.json.get('username', user.username).encode('utf-8')
    db.session.commit()
    return make_response(jsonify({"message": "User updated successfully"}), 200)

@jwt.user_lookup_loader
def user_lookup_callback(jwt_header, jwt_data):
    identity = jwt_data['sub']
    user = User.query.filter_by(username=identity).one_or_none()
    return user

@users_bp.route('/users', methods=['GET'])
@jwt_required()
@cross_origin()
def users():
    if current_user.role == 1:
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                column.name: getattr(user, column.name)
                for column in user.__table__.columns
                if column.name != "InstanceState"
            }
            user_list.append(user_dict)
        return json.dumps(user_list, default=str)
    else:
        return make_response(jsonify({"error": "You are not authorized to access this route"}), 401)

@users_bp.route('/users/<user_id_or_name>', methods=['DELETE', 'OPTIONS'])
@cross_origin()
def delete_user(user_id_or_name):
    if request.method == 'DELETE':
        user_id = 0
        try:
            if user_id_or_name.isdigit():
                user_id = int(user_id_or_name)
                user = User.query.filter_by(id=user_id).first()
            else:
                username = user_id_or_name
                user = User.query.filter_by(username=username).first()
        # delete user by name
            if user:
                song_files = SongFile.query.filter_by(user_id=user_id).all()
                for song_file in song_files:
                    db.session.delete(song_file)
                    if os.path.isfile(song_file.filepath):
                        os.remove(song_file.filepath)   
                user_dir = os.path.join(os.getcwd(), 'song_database', user.username)
                if os.path.isdir(user_dir):
                    os.rmdir(user_dir)
                db.session.delete(user)
                db.session.commit()
                db.session.close()
                return make_response("User deleted", 200)
            else:
                return make_response("User not found", 404)
        except exc.SQLAlchemyError as e:
            print(e)
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    elif request.method == 'OPTIONS':
        # respond to the preflight request
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'DELETE')
        response.status_code = 200
        return response

@users_bp.route('/register', methods=['POST'])
def register():
    my_json = request.get_data().decode('utf8')
    data = json.loads(my_json)
    # s = json.dumps(data, indent=4, sort_keys=True)
    bytesPassword = bcrypt.hashpw(
        data[1]["value"].encode('utf8'), bcrypt.gensalt())
    stmt = (
        db.insert(user).values(username=data[0]["value"], password=bytesPassword, email=data[2]["value"],
                               role=0, privacy_level=1, profile_picture_path="fakepath", account_creation_date=datetime.now())
    )
    s = select(user.c.id).where(user.c.username == data[0]["value"])
    print(stmt.compile().params)
    conn = engine.connect()
    result = conn.execute(stmt)
    idResult = conn.execute(s)
    print(result)
    dictionaryForQueryResult = {}
    for row in idResult:
        dictionaryForQueryResult = row._mapping
    # response = app.make_response({"id":dictionaryForQueryResult["id"], "username":session["name"]})
    directory = os.path.join("song_database", data[0]["value"])
    if not os.path.exists(directory):
        os.makedirs(directory)

    access_token = create_access_token(
        identity=data[0]["value"], additional_claims={'role': "user"})
    return jsonify(access_token=access_token)


@users_bp.route('/login', methods=['POST'])
def login():
    try:
        my_json = request.get_data().decode('utf8')
        data = json.loads(my_json)
        print(data)
        s = select(user.c.password, user.c.id, user.c.role).where(
            user.c.username == data[0]["value"])
        conn = engine.connect()
        result = conn.execute(s)
        dictionaryForQueryResult = {}
        for row in result:
            dictionaryForQueryResult = row._mapping
        if bcrypt.checkpw(data[1]["value"].encode('utf8'), dictionaryForQueryResult["password"]):
            directory = os.path.join("song_database", data[0]["value"])
            if not os.path.exists(directory):
                os.makedirs(directory)
            print("authenticated")
            if dictionaryForQueryResult["role"] == 1:
                access_token = create_access_token(
                    identity=data[0]["value"], additional_claims={'role': "admin"})
            else:
                access_token = create_access_token(
                    identity=data[0]["value"], additional_claims={'role': "user"})
            return jsonify(access_token=access_token)
        else:
            return make_response("Bad credentials", 403)
    except Exception as e:
        print(f"Error: {e}")
        return make_response("Bad credentials", 403)